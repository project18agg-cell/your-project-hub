import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CandidateApp } from './CandidateCard';
import { Calendar, Clock, Video, Phone, LinkIcon } from 'lucide-react';

interface InterviewSchedulerProps {
  app: CandidateApp | null;
  open: boolean;
  onClose: () => void;
  onScheduled: () => void;
}

export const InterviewScheduler = ({ app, open, onClose, onScheduled }: InterviewSchedulerProps) => {
  const [form, setForm] = useState({
    interview_type: 'google_meet',
    interview_date: '',
    interview_time: '',
    meeting_link: 'https://meet.google.com/zsm-hzrx-kxe',
    interviewer_name: 'Admin',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!app || !form.interview_date || !form.interview_time) {
      toast.error('Please fill date and time');
      return;
    }

    setSubmitting(true);
    try {
      // Insert schedule
      const { error: schedError } = await supabase.from('interview_schedules' as any).insert({
        application_id: app.id,
        interview_type: form.interview_type,
        interview_date: form.interview_date,
        interview_time: form.interview_time,
        meeting_link: form.meeting_link,
        interviewer_name: form.interviewer_name,
      });
      if (schedError) throw schedError;

      // Update pipeline stage
      await supabase.from('internship_applications' as any)
        .update({ pipeline_stage: 'interview_scheduled' })
        .eq('id', app.id);

      // Log activity
      await supabase.from('candidate_activity_log' as any).insert({
        application_id: app.id,
        action: 'interview_scheduled',
        details: `${form.interview_type} on ${form.interview_date} at ${form.interview_time} with ${form.interviewer_name}`,
      });

      // Send invite email via edge function
      const formattedDate = new Date(form.interview_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      
      const { error: emailError } = await supabase.functions.invoke('hiring-emails', {
        body: {
          action: 'send-invite',
          candidate_name: app.full_name,
          email: app.email,
          position: app.role_applied,
          interview_date: formattedDate,
          interview_time: form.interview_time,
          interviewer_name: form.interviewer_name,
          meeting_link: form.meeting_link,
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
        toast.warning('Interview scheduled but email failed to send');
      } else {
        toast.success('Interview scheduled & invite sent!');
      }

      onScheduled();
      onClose();
      setForm({
        interview_type: 'google_meet',
        interview_date: '',
        interview_time: '',
        meeting_link: 'https://meet.google.com/zsm-hzrx-kxe',
        interviewer_name: 'Admin',
      });
    } catch (err: any) {
      toast.error('Failed to schedule: ' + (err.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!app) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <p className="text-sm text-muted-foreground">for {app.full_name}</p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground">Interview Type</Label>
            <RadioGroup value={form.interview_type} onValueChange={(v) => setForm(prev => ({ ...prev, interview_type: v }))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="google_meet" id="gm" />
                <Label htmlFor="gm" className="flex items-center gap-1 text-foreground"><Video className="h-4 w-4" /> Google Meet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="zoom" id="zm" />
                <Label htmlFor="zm" className="flex items-center gap-1 text-foreground"><Video className="h-4 w-4" /> Zoom</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="ph" />
                <Label htmlFor="ph" className="flex items-center gap-1 text-foreground"><Phone className="h-4 w-4" /> Phone Call</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-foreground">Date</Label>
              <Input type="date" value={form.interview_date} onChange={(e) => setForm(prev => ({ ...prev, interview_date: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label className="text-foreground">Time</Label>
              <Input type="time" value={form.interview_time} onChange={(e) => setForm(prev => ({ ...prev, interview_time: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-foreground">Meeting Link</Label>
            <Input
              value={form.meeting_link}
              onChange={(e) => setForm(prev => ({ ...prev, meeting_link: e.target.value }))}
              placeholder="https://meet.google.com/..."
            />
          </div>

          <div className="space-y-1">
            <Label className="text-foreground">Interviewer</Label>
            <Input
              value={form.interviewer_name}
              onChange={(e) => setForm(prev => ({ ...prev, interviewer_name: e.target.value }))}
              placeholder="Admin / HR"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Scheduling...' : 'Schedule & Send Invite'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
