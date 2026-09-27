import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const FranchiseForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    state: '',
    experience: '',
    investment_ready: false,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.city.trim()) {
      toast.error('Name, phone and city are required');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('franchise_applications' as any).insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      city: form.city.trim(),
      district: form.district.trim() || null,
      state: form.state.trim() || null,
      experience: form.experience.trim() || null,
      investment_ready: form.investment_ready,
      message: form.message.trim() || null,
    });

    setLoading(false);
    if (error) {
      toast.error('Failed to submit. Please try again.');
    } else {
      toast.success('Application submitted! We\'ll reach out soon.');
      setForm({ name: '', phone: '', email: '', city: '', district: '', state: '', experience: '', investment_ready: false, message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-white/80">Name *</Label>
          <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required maxLength={100} className="bg-white text-foreground" />
        </div>
        <div>
          <Label className="text-white/80">Phone *</Label>
          <Input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required maxLength={20} className="bg-white text-foreground" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-white/80">City *</Label>
          <Input value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} required maxLength={100} className="bg-white text-foreground" />
        </div>
        <div>
          <Label className="text-white/80">District</Label>
          <Input value={form.district} onChange={e => setForm(p => ({ ...p, district: e.target.value }))} maxLength={100} className="bg-white text-foreground" />
        </div>
        <div>
          <Label className="text-white/80">State</Label>
          <Input value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} maxLength={100} className="bg-white text-foreground" />
        </div>
      </div>
      <div>
        <Label className="text-white/80">Email</Label>
        <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} maxLength={255} className="bg-white text-foreground" />
      </div>
      <div>
        <Label className="text-white/80">Prior Business Experience</Label>
        <Input value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} placeholder="e.g., 3 years in retail" maxLength={200} className="bg-white text-foreground" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked={form.investment_ready} onCheckedChange={(c) => setForm(p => ({ ...p, investment_ready: !!c }))} />
        <Label className="cursor-pointer text-white/80">I am ready to invest in a city franchise</Label>
      </div>
      <div>
        <Label className="text-white/80">Additional Message</Label>
        <Textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={3} maxLength={1000} className="bg-white text-foreground" />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-[#F9423A] hover:bg-[#e03830] text-white">
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Apply for City Partnership
      </Button>
    </form>
  );
};
