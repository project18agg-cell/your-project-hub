import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface DemoRequestFormProps {
  product: string;
  accentColor: string;
}

export const DemoRequestForm = ({ product, accentColor }: DemoRequestFormProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    business_name: '',
    city: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Name and phone are required');
      return;
    }
    if (form.name.length > 100 || form.phone.length > 20 || form.email.length > 255) {
      toast.error('Input too long');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('demo_requests' as any).insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      business_name: form.business_name.trim() || null,
      city: form.city.trim() || null,
      product,
      request_type: 'demo',
      message: form.message.trim() || null,
    });

    setLoading(false);
    if (error) {
      toast.error('Failed to submit. Please try again.');
    } else {
      toast.success('Demo request submitted! We\'ll contact you soon.');
      setForm({ name: '', phone: '', email: '', business_name: '', city: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Name *</Label>
          <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" required maxLength={100} />
        </div>
        <div>
          <Label>Phone *</Label>
          <Input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" required maxLength={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@company.com" maxLength={255} />
        </div>
        <div>
          <Label>Business Name</Label>
          <Input value={form.business_name} onChange={e => setForm(p => ({ ...p, business_name: e.target.value }))} placeholder="Your business" maxLength={100} />
        </div>
      </div>
      <div>
        <Label>City</Label>
        <Input value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} placeholder="Your city" maxLength={100} />
      </div>
      <div>
        <Label>Message</Label>
        <Textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your needs..." rows={3} maxLength={1000} />
      </div>
      <Button type="submit" disabled={loading} className="w-full text-white" style={{ backgroundColor: accentColor }}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Request Demo
      </Button>
    </form>
  );
};
