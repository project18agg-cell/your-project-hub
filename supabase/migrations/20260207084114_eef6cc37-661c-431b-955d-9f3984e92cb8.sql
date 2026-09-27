-- Create ticket types enum
CREATE TYPE public.ticket_type AS ENUM ('support', 'internal', 'payment');

-- Create ticket priority enum
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create ticket status enum
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_type public.ticket_type NOT NULL DEFAULT 'support',
  priority public.ticket_priority NOT NULL DEFAULT 'medium',
  status public.ticket_status NOT NULL DEFAULT 'open',
  title TEXT NOT NULL,
  description TEXT,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  assigned_partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
  due_date DATE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can view tickets" ON public.tickets FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert tickets" ON public.tickets FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update tickets" ON public.tickets FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete tickets" ON public.tickets FOR DELETE USING (is_admin());

-- Create activity_logs table for timeline
CREATE TABLE public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can view activity logs" ON public.activity_logs FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert activity logs" ON public.activity_logs FOR INSERT WITH CHECK (is_admin());

-- Add updated_at trigger for tickets
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();