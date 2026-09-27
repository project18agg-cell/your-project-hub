import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { CandidateApp } from './CandidateCard';
import { Mail, Phone, Building2, GraduationCap, Calendar, Link, Star, MessageSquare, Clock, Send } from 'lucide-react';

interface CandidateProfileProps {
  app: CandidateApp | null;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

type Score = {
  id?: string;
  resume_quality: number;
  communication: number;
  problem_solving: number;
  learning_ability: number;
  culture_fit: number;
  skills: number;
  portfolio_score: number;
  total_score: number;
};

type Note = { id: string; note: string; created_by: string; created_at: string };
type Activity = { id: string; action: string; details: string | null; created_at: string };
type Feedback = {
  id: string;
  communication: number;
  skills: number;
  confidence: number;
  learning_ability: number;
  notes: string | null;
  decision: string;
  created_at: string;
};

const defaultScore: Score = {
  resume_quality: 0, communication: 0, problem_solving: 0,
  learning_ability: 0, culture_fit: 0, skills: 0, portfolio_score: 0, total_score: 0,
};

export const CandidateProfile = ({ app, open, onClose, onUpdate }: CandidateProfileProps) => {
  const [scores, setScores] = useState<Score>(defaultScore);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [savingScore, setSavingScore] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({ communication: 5, skills: 5, confidence: 5, learning_ability: 5, notes: '', decision: 'pending' });

  useEffect(() => {
    if (app && open) {
      loadData();
    }
  }, [app, open]);

  const loadData = async () => {
    if (!app) return;
    const [scoresRes, notesRes, activityRes, feedbackRes] = await Promise.all([
      supabase.from('candidate_scores' as any).select('*').eq('application_id', app.id).maybeSingle(),
      supabase.from('candidate_notes' as any).select('*').eq('application_id', app.id).order('created_at', { ascending: false }),
      supabase.from('candidate_activity_log' as any).select('*').eq('application_id', app.id).order('created_at', { ascending: false }),
      supabase.from('interview_feedback' as any).select('*').eq('application_id', app.id).order('created_at', { ascending: false }),
    ]);
    if (scoresRes.data) setScores(scoresRes.data as any);
    else setScores(defaultScore);
    setNotes((notesRes.data as any) || []);
    setActivities((activityRes.data as any) || []);
    setFeedbacks((feedbackRes.data as any) || []);
  };

  const saveScores = async () => {
    if (!app) return;
    setSavingScore(true);
    const payload = { ...scores, application_id: app.id };
    delete (payload as any).id;
    delete (payload as any).total_score;

    if (scores.id) {
      const { error } = await supabase.from('candidate_scores' as any).update(payload).eq('id', scores.id);
      if (error) toast.error('Failed to save scores');
      else { toast.success('Scores updated'); onUpdate(); }
    } else {
      const { error } = await supabase.from('candidate_scores' as any).insert(payload);
      if (error) toast.error('Failed to save scores');
      else { toast.success('Scores saved'); onUpdate(); }
    }
    setSavingScore(false);
    loadData();
  };

  const addNote = async () => {
    if (!app || !newNote.trim()) return;
    const { error } = await supabase.from('candidate_notes' as any).insert({ application_id: app.id, note: newNote.trim() });
    if (error) toast.error('Failed to add note');
    else { toast.success('Note added'); setNewNote(''); loadData(); }
  };

  const submitFeedback = async () => {
    if (!app) return;
    const { error } = await supabase.from('interview_feedback' as any).insert({
      application_id: app.id,
      ...feedbackForm,
    });
    if (error) toast.error('Failed to submit feedback');
    else {
      toast.success('Feedback submitted');
      setFeedbackForm({ communication: 5, skills: 5, confidence: 5, learning_ability: 5, notes: '', decision: 'pending' });
      loadData();
    }
  };

  if (!app) return null;

  const scoreFields: { key: keyof Score; label: string }[] = [
    { key: 'resume_quality', label: 'Resume Quality' },
    { key: 'communication', label: 'Communication' },
    { key: 'problem_solving', label: 'Problem Solving' },
    { key: 'learning_ability', label: 'Learning Ability' },
    { key: 'culture_fit', label: 'Culture Fit' },
    { key: 'skills', label: 'Skills' },
    { key: 'portfolio_score', label: 'Portfolio' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{app.full_name}</DialogTitle>
          <p className="text-sm text-muted-foreground">{app.role_applied}</p>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-2">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
            <TabsTrigger value="scores" className="text-xs">Scores</TabsTrigger>
            <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
            <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
            <TabsTrigger value="feedback" className="text-xs">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{app.email}</span></div>
                <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{app.phone}</span></div>
                <div className="flex items-center gap-2 text-sm"><Building2 className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{app.college}</span></div>
                <div className="flex items-center gap-2 text-sm"><GraduationCap className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">{app.degree} · {app.graduation_year}</span></div>
                <div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-muted-foreground" /><span className="text-foreground">Applied {format(new Date(app.created_at), 'dd MMM yyyy')}</span></div>
                {app.portfolio_url && (
                  <div className="flex items-center gap-2 text-sm"><Link className="h-4 w-4 text-muted-foreground" /><a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Portfolio</a></div>
                )}
              </div>
              <div>
                {scores.total_score > 0 && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-foreground">{scores.total_score}</div>
                      <div className="text-xs text-muted-foreground">/ 100</div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-foreground">Overall Score</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            {app.message && (
              <div>
                <Label className="text-xs text-muted-foreground">Cover Message</Label>
                <p className="text-sm mt-1 text-foreground">{app.message}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="scores" className="space-y-4 mt-4">
            <div className="space-y-4">
              {scoreFields.map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between">
                    <Label className="text-sm text-foreground">{label}</Label>
                    <span className="text-sm font-medium text-foreground">{scores[key]}/10</span>
                  </div>
                  <Slider
                    value={[scores[key] as number]}
                    onValueChange={([v]) => setScores(prev => ({ ...prev, [key]: v }))}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            <Button onClick={saveScores} disabled={savingScore} className="w-full">
              {savingScore ? 'Saving...' : scores.id ? 'Update Scores' : 'Save Scores'}
            </Button>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4 mt-4">
            <div className="flex gap-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="min-h-[60px]"
              />
              <Button onClick={addNote} disabled={!newNote.trim()} size="sm" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {notes.map(n => (
                <Card key={n.id}>
                  <CardContent className="p-3">
                    <p className="text-sm text-foreground">{n.note}</p>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{n.created_by}</span>
                      <span>{format(new Date(n.created_at), 'dd MMM yyyy HH:mm')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {notes.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No notes yet</p>}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-2 mt-4">
            {activities.map(a => (
              <div key={a.id} className="flex gap-3 items-start">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium capitalize text-foreground">{a.action.replace(/_/g, ' ')}</p>
                  {a.details && <p className="text-xs text-muted-foreground">{a.details}</p>}
                  <p className="text-xs text-muted-foreground">{format(new Date(a.created_at), 'dd MMM yyyy HH:mm')}</p>
                </div>
              </div>
            ))}
            {activities.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No activity yet</p>}
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4 mt-4">
            <Card>
              <CardHeader><CardTitle className="text-sm">Submit Interview Feedback</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {(['communication', 'skills', 'confidence', 'learning_ability'] as const).map(key => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between">
                      <Label className="text-sm capitalize text-foreground">{key.replace('_', ' ')}</Label>
                      <span className="text-sm font-medium text-foreground">{feedbackForm[key]}/10</span>
                    </div>
                    <Slider
                      value={[feedbackForm[key]]}
                      onValueChange={([v]) => setFeedbackForm(prev => ({ ...prev, [key]: v }))}
                      max={10} step={1}
                    />
                  </div>
                ))}
                <Textarea
                  value={feedbackForm.notes}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Interview notes..."
                  className="min-h-[60px]"
                />
                <Select value={feedbackForm.decision} onValueChange={(v) => setFeedbackForm(prev => ({ ...prev, decision: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="hire">Hire</SelectItem>
                    <SelectItem value="second_round">Second Round</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={submitFeedback} className="w-full">Submit Feedback</Button>
              </CardContent>
            </Card>

            {feedbacks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Previous Feedback</h4>
                {feedbacks.map(f => (
                  <Card key={f.id}>
                    <CardContent className="p-3 space-y-1">
                      <div className="flex gap-4 text-xs text-foreground">
                        <span>Comm: {f.communication}/10</span>
                        <span>Skills: {f.skills}/10</span>
                        <span>Conf: {f.confidence}/10</span>
                        <span>Learn: {f.learning_ability}/10</span>
                      </div>
                      {f.notes && <p className="text-sm text-foreground">{f.notes}</p>}
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <Badge variant="outline" className="capitalize">{f.decision.replace('_', ' ')}</Badge>
                        <span>{format(new Date(f.created_at), 'dd MMM HH:mm')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
