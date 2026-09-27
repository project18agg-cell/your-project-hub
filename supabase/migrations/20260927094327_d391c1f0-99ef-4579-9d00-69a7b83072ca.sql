-- ENUMS
CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TYPE public.customer_status AS ENUM ('trial', 'active', 'grace', 'suspended', 'churned');
CREATE TYPE public.business_type AS ENUM ('dealer', 'grocery', 'restaurant', 'clothing', 'other');
CREATE TYPE public.acquisition_source AS ENUM ('direct', 'partner', 'referral');
CREATE TYPE public.product_status AS ENUM ('live', 'beta', 'disabled');
CREATE TYPE public.billing_cycle AS ENUM ('monthly', 'quarterly', 'half_yearly', 'yearly');
CREATE TYPE public.subscription_status AS ENUM ('trial', 'active', 'grace_period', 'suspended', 'cancelled', 'expired');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'overdue', 'refunded');
CREATE TYPE public.partner_type AS ENUM ('sales', 'implementor', 'franchise');
CREATE TYPE public.partner_status AS ENUM ('active', 'inactive');
CREATE TYPE public.payout_status AS ENUM ('pending', 'paid');
CREATE TYPE public.expense_category AS ENUM ('server_infra', 'marketing', 'partner_payouts', 'salaries', 'office_travel', 'misc');
CREATE TYPE public.ticket_type AS ENUM ('support', 'internal', 'payment');
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- SHARED FUNCTIONS
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- USER ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'::public.app_role)
$$;

CREATE POLICY "Admins can view user roles" ON public.user_roles FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert user roles" ON public.user_roles FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update user roles" ON public.user_roles FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete user roles" ON public.user_roles FOR DELETE USING (public.is_admin());

-- PRODUCTS
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  status public.product_status NOT NULL DEFAULT 'live',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view products" ON public.products FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE USING (public.is_admin());

-- PLANS
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  billing_cycle public.billing_cycle NOT NULL DEFAULT 'monthly',
  features JSONB DEFAULT '[]'::jsonb,
  trial_days INTEGER NOT NULL DEFAULT 14,
  grace_days INTEGER NOT NULL DEFAULT 7,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.plans TO authenticated;
GRANT ALL ON public.plans TO service_role;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view plans" ON public.plans FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert plans" ON public.plans FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update plans" ON public.plans FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete plans" ON public.plans FOR DELETE USING (public.is_admin());

-- PARTNERS
CREATE TABLE public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  district TEXT,
  partner_type public.partner_type NOT NULL DEFAULT 'sales',
  revenue_share_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  status public.partner_status NOT NULL DEFAULT 'active',
  assigned_cities TEXT[] DEFAULT '{}',
  allowed_products UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view partners" ON public.partners FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert partners" ON public.partners FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update partners" ON public.partners FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete partners" ON public.partners FOR DELETE USING (public.is_admin());

-- CUSTOMERS
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  gst TEXT,
  city TEXT,
  district TEXT,
  state TEXT,
  business_type public.business_type NOT NULL DEFAULT 'other',
  status public.customer_status NOT NULL DEFAULT 'trial',
  risk_tag TEXT,
  priority_flag BOOLEAN DEFAULT false,
  notes TEXT,
  acquisition_source public.acquisition_source NOT NULL DEFAULT 'direct',
  partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view customers" ON public.customers FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert customers" ON public.customers FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update customers" ON public.customers FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete customers" ON public.customers FOR DELETE USING (public.is_admin());

-- SUBSCRIPTIONS
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT NOT NULL,
  plan_id UUID REFERENCES public.plans(id) ON DELETE RESTRICT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_status public.payment_status NOT NULL DEFAULT 'pending',
  status public.subscription_status NOT NULL DEFAULT 'trial',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view subscriptions" ON public.subscriptions FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update subscriptions" ON public.subscriptions FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete subscriptions" ON public.subscriptions FOR DELETE USING (public.is_admin());

-- PARTNER PAYOUTS
CREATE TABLE public.partner_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE NOT NULL,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  payout_date DATE,
  status public.payout_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_payouts TO authenticated;
GRANT ALL ON public.partner_payouts TO service_role;
ALTER TABLE public.partner_payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view partner payouts" ON public.partner_payouts FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert partner payouts" ON public.partner_payouts FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update partner payouts" ON public.partner_payouts FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete partner payouts" ON public.partner_payouts FOR DELETE USING (public.is_admin());

-- EXPENSES
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category public.expense_category NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.expenses TO authenticated;
GRANT ALL ON public.expenses TO service_role;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view expenses" ON public.expenses FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert expenses" ON public.expenses FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update expenses" ON public.expenses FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete expenses" ON public.expenses FOR DELETE USING (public.is_admin());

-- SYSTEM LOGS
CREATE TABLE public.system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.system_logs TO authenticated;
GRANT ALL ON public.system_logs TO service_role;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view system logs" ON public.system_logs FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert system logs" ON public.system_logs FOR INSERT WITH CHECK (public.is_admin());

-- TICKETS
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_type public.ticket_type NOT NULL DEFAULT 'support',
  priority public.ticket_priority NOT NULL DEFAULT 'medium',
  status public.ticket_status NOT NULL DEFAULT 'open',
  title TEXT NOT NULL,
  description TEXT,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  assigned_partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
  due_date DATE,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tickets TO authenticated;
GRANT ALL ON public.tickets TO service_role;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view tickets" ON public.tickets FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert tickets" ON public.tickets FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update tickets" ON public.tickets FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete tickets" ON public.tickets FOR DELETE USING (public.is_admin());

-- ACTIVITY LOGS
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view activity logs" ON public.activity_logs FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert activity logs" ON public.activity_logs FOR INSERT WITH CHECK (public.is_admin());

-- DEMO REQUESTS
CREATE TABLE public.demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  business_name TEXT,
  city TEXT,
  product TEXT NOT NULL,
  request_type TEXT NOT NULL DEFAULT 'demo',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.demo_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.demo_requests TO authenticated;
GRANT ALL ON public.demo_requests TO service_role;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit demo requests" ON public.demo_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view demo requests" ON public.demo_requests FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update demo requests" ON public.demo_requests FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete demo requests" ON public.demo_requests FOR DELETE USING (public.is_admin());

-- FRANCHISE APPLICATIONS
CREATE TABLE public.franchise_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  district TEXT,
  state TEXT,
  experience TEXT,
  investment_ready BOOLEAN DEFAULT false,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.franchise_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.franchise_applications TO authenticated;
GRANT ALL ON public.franchise_applications TO service_role;
ALTER TABLE public.franchise_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit franchise applications" ON public.franchise_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view franchise applications" ON public.franchise_applications FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update franchise applications" ON public.franchise_applications FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete franchise applications" ON public.franchise_applications FOR DELETE USING (public.is_admin());

-- PAGE VIEWS
CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  language TEXT,
  city TEXT,
  country TEXT,
  session_id TEXT,
  visitor_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.page_views TO anon;
GRANT SELECT, INSERT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view page views" ON public.page_views FOR SELECT USING (public.is_admin());

-- INTERNSHIP APPLICATIONS
CREATE TABLE public.internship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  degree TEXT NOT NULL,
  graduation_year INTEGER NOT NULL,
  role_applied TEXT NOT NULL,
  portfolio_url TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  pipeline_stage TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.internship_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.internship_applications TO authenticated;
GRANT ALL ON public.internship_applications TO service_role;
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit internship applications" ON public.internship_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view internship applications" ON public.internship_applications FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update internship applications" ON public.internship_applications FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete internship applications" ON public.internship_applications FOR DELETE USING (public.is_admin());

-- CANDIDATE SCORES
CREATE TABLE public.candidate_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE UNIQUE,
  resume_quality INTEGER NOT NULL DEFAULT 0,
  communication INTEGER NOT NULL DEFAULT 0,
  problem_solving INTEGER NOT NULL DEFAULT 0,
  learning_ability INTEGER NOT NULL DEFAULT 0,
  culture_fit INTEGER NOT NULL DEFAULT 0,
  skills INTEGER NOT NULL DEFAULT 0,
  portfolio_score INTEGER NOT NULL DEFAULT 0,
  total_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.candidate_scores TO authenticated;
GRANT ALL ON public.candidate_scores TO service_role;
ALTER TABLE public.candidate_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view candidate scores" ON public.candidate_scores FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert candidate scores" ON public.candidate_scores FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update candidate scores" ON public.candidate_scores FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete candidate scores" ON public.candidate_scores FOR DELETE USING (public.is_admin());

-- CANDIDATE NOTES
CREATE TABLE public.candidate_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_by TEXT DEFAULT 'Admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.candidate_notes TO authenticated;
GRANT ALL ON public.candidate_notes TO service_role;
ALTER TABLE public.candidate_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view candidate notes" ON public.candidate_notes FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert candidate notes" ON public.candidate_notes FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete candidate notes" ON public.candidate_notes FOR DELETE USING (public.is_admin());

-- INTERVIEW SCHEDULES
CREATE TABLE public.interview_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE,
  interview_type TEXT NOT NULL DEFAULT 'google_meet',
  interview_date DATE NOT NULL,
  interview_time TIME NOT NULL,
  meeting_link TEXT,
  interviewer_name TEXT NOT NULL DEFAULT 'Admin',
  status TEXT NOT NULL DEFAULT 'scheduled',
  email_sent BOOLEAN NOT NULL DEFAULT false,
  reminder_30_sent BOOLEAN NOT NULL DEFAULT false,
  reminder_5_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.interview_schedules TO authenticated;
GRANT ALL ON public.interview_schedules TO service_role;
ALTER TABLE public.interview_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view interview schedules" ON public.interview_schedules FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert interview schedules" ON public.interview_schedules FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update interview schedules" ON public.interview_schedules FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete interview schedules" ON public.interview_schedules FOR DELETE USING (public.is_admin());

-- INTERVIEW FEEDBACK
CREATE TABLE public.interview_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id UUID REFERENCES public.interview_schedules(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE,
  communication INTEGER NOT NULL DEFAULT 0,
  skills INTEGER NOT NULL DEFAULT 0,
  confidence INTEGER NOT NULL DEFAULT 0,
  learning_ability INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  decision TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.interview_feedback TO authenticated;
GRANT ALL ON public.interview_feedback TO service_role;
ALTER TABLE public.interview_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view interview feedback" ON public.interview_feedback FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert interview feedback" ON public.interview_feedback FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update interview feedback" ON public.interview_feedback FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete interview feedback" ON public.interview_feedback FOR DELETE USING (public.is_admin());

-- CANDIDATE ACTIVITY LOG
CREATE TABLE public.candidate_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.candidate_activity_log TO authenticated;
GRANT ALL ON public.candidate_activity_log TO service_role;
ALTER TABLE public.candidate_activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view candidate activity" ON public.candidate_activity_log FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert candidate activity" ON public.candidate_activity_log FOR INSERT WITH CHECK (public.is_admin());

-- TRIGGERS
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON public.plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_partner_payouts_updated_at BEFORE UPDATE ON public.partner_payouts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON public.expenses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_internship_applications_updated_at BEFORE UPDATE ON public.internship_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_candidate_scores_updated_at BEFORE UPDATE ON public.candidate_scores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_interview_schedules_updated_at BEFORE UPDATE ON public.interview_schedules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_interview_feedback_updated_at BEFORE UPDATE ON public.interview_feedback FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.calculate_total_score()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  NEW.total_score := ROUND((NEW.resume_quality + NEW.communication + NEW.problem_solving + NEW.learning_ability + NEW.culture_fit + NEW.skills + NEW.portfolio_score) * 100.0 / 70)::integer;
  RETURN NEW;
END; $$;
CREATE TRIGGER calculate_score_trigger BEFORE INSERT OR UPDATE ON public.candidate_scores FOR EACH ROW EXECUTE FUNCTION public.calculate_total_score();

CREATE OR REPLACE FUNCTION public.log_pipeline_change()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  IF OLD.pipeline_stage IS DISTINCT FROM NEW.pipeline_stage THEN
    INSERT INTO public.candidate_activity_log (application_id, action, details)
    VALUES (NEW.id, 'stage_changed', 'Moved from ' || COALESCE(OLD.pipeline_stage, 'none') || ' to ' || NEW.pipeline_stage);
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER log_pipeline_change_trigger AFTER UPDATE ON public.internship_applications FOR EACH ROW EXECUTE FUNCTION public.log_pipeline_change();

-- INDEXES
CREATE INDEX idx_customers_status ON public.customers(status);
CREATE INDEX idx_customers_business_type ON public.customers(business_type);
CREATE INDEX idx_customers_city ON public.customers(city);
CREATE INDEX idx_customers_partner_id ON public.customers(partner_id);
CREATE INDEX idx_subscriptions_customer_id ON public.subscriptions(customer_id);
CREATE INDEX idx_subscriptions_product_id ON public.subscriptions(product_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_end_date ON public.subscriptions(end_date);
CREATE INDEX idx_plans_product_id ON public.plans(product_id);
CREATE INDEX idx_partner_payouts_partner_id ON public.partner_payouts(partner_id);
CREATE INDEX idx_partner_payouts_status ON public.partner_payouts(status);
CREATE INDEX idx_expenses_category ON public.expenses(category);
CREATE INDEX idx_expenses_date ON public.expenses(date);
CREATE INDEX idx_expenses_product_id ON public.expenses(product_id);
CREATE INDEX idx_system_logs_entity_type ON public.system_logs(entity_type);
CREATE INDEX idx_system_logs_created_at ON public.system_logs(created_at);
CREATE INDEX idx_page_views_created_at ON public.page_views (created_at DESC);
CREATE INDEX idx_page_views_page_path ON public.page_views (page_path);
CREATE INDEX idx_page_views_session_id ON public.page_views (session_id);
CREATE INDEX idx_page_views_visitor_id ON public.page_views (visitor_id);
CREATE INDEX idx_internship_applications_status ON public.internship_applications (status);
CREATE INDEX idx_internship_applications_created_at ON public.internship_applications (created_at DESC);