import { FormEvent, useState } from 'react';
import { Loader2, MoveRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const businessTypes = ['Retail', 'Manufacturing', 'Services', 'Real Estate', 'Automotive', 'Education', 'Other'];
const currentTools = ['WhatsApp', 'Excel', 'Paper', 'Multiple software', 'Other'];
const workflows = ['CRM', 'Inventory', 'Orders', 'Employees', 'Customers', 'Other'];
const teamSizes = ['1–5', '6–20', '21–50', '50+'];

const initialForm = {
  businessType: '',
  currentTool: '',
  workflow: '',
  teamSize: '',
  name: '',
  phone: '',
};

export const CustomSaasForm = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.businessType || !form.currentTool || !form.workflow || !form.teamSize || !form.name.trim() || !form.phone.trim()) {
      toast.error('Please complete every field');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('demo_requests').insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      product: 'custom_saas',
      request_type: 'custom_saas_discussion',
      business_name: form.businessType,
      message: [
        `Business type: ${form.businessType}`,
        `Currently using: ${form.currentTool}`,
        `Wants to manage: ${form.workflow}`,
        `Team size: ${form.teamSize}`,
      ].join('\n'),
    });
    setLoading(false);

    if (error) {
      toast.error('We could not send your request. Please try again.');
      return;
    }

    toast.success("Thanks — we'll contact you for a software discussion.");
    setForm(initialForm);
  };

  return (
    <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
      <div className="space-y-2">
        <Label>What type of business do you operate?</Label>
        <Select value={form.businessType} onValueChange={(value) => setForm((current) => ({ ...current, businessType: value }))}>
          <SelectTrigger><SelectValue placeholder="Choose your business type" /></SelectTrigger>
          <SelectContent>{businessTypes.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>What are you currently using?</Label>
        <Select value={form.currentTool} onValueChange={(value) => setForm((current) => ({ ...current, currentTool: value }))}>
          <SelectTrigger><SelectValue placeholder="Choose your current setup" /></SelectTrigger>
          <SelectContent>{currentTools.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>What do you want to manage?</Label>
        <Select value={form.workflow} onValueChange={(value) => setForm((current) => ({ ...current, workflow: value }))}>
          <SelectTrigger><SelectValue placeholder="Choose the main workflow" /></SelectTrigger>
          <SelectContent>{workflows.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Approximate team size</Label>
        <Select value={form.teamSize} onValueChange={(value) => setForm((current) => ({ ...current, teamSize: value }))}>
          <SelectTrigger><SelectValue placeholder="Choose your team size" /></SelectTrigger>
          <SelectContent>{teamSizes.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="custom-saas-name">Your name</Label>
        <Input id="custom-saas-name" value={form.name} maxLength={100} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="custom-saas-phone">Phone / WhatsApp</Label>
        <Input id="custom-saas-phone" value={form.phone} maxLength={20} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Your WhatsApp number" />
      </div>
      <Button type="submit" size="lg" disabled={loading} className="md:col-span-2 md:justify-self-start">
        {loading ? <Loader2 className="animate-spin" /> : null}
        Get a custom software discussion <MoveRight />
      </Button>
    </form>
  );
};