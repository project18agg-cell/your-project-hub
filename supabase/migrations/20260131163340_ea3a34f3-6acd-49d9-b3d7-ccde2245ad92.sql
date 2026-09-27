-- =============================================
-- INTERNAL SUBSCRIPTION & BUSINESS MANAGEMENT SYSTEM
-- ADMIN-ONLY ARCHITECTURE
-- =============================================

-- 1. CREATE ENUMS
-- =============================================

-- Admin role enum (single role)
CREATE TYPE public.app_role AS ENUM ('admin');

-- Customer status enum
CREATE TYPE public.customer_status AS ENUM ('trial', 'active', 'grace', 'suspended', 'churned');

-- Business type enum
CREATE TYPE public.business_type AS ENUM ('dealer', 'grocery', 'restaurant', 'clothing', 'other');

-- Acquisition source enum
CREATE TYPE public.acquisition_source AS ENUM ('direct', 'partner', 'referral');

-- Product status enum
CREATE TYPE public.product_status AS ENUM ('live', 'beta', 'disabled');

-- Billing cycle enum
CREATE TYPE public.billing_cycle AS ENUM ('monthly', 'quarterly', 'half_yearly', 'yearly');

-- Subscription status enum
CREATE TYPE public.subscription_status AS ENUM ('trial', 'active', 'grace_period', 'suspended', 'cancelled', 'expired');

-- Payment status enum
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'overdue', 'refunded');

-- Partner type enum
CREATE TYPE public.partner_type AS ENUM ('sales', 'implementor', 'franchise');

-- Partner status enum
CREATE TYPE public.partner_status AS ENUM ('active', 'inactive');

-- Payout status enum
CREATE TYPE public.payout_status AS ENUM ('pending', 'paid');

-- Expense category enum
CREATE TYPE public.expense_category AS ENUM ('server_infra', 'marketing', 'partner_payouts', 'salaries', 'office_travel', 'misc');

-- 2. CREATE USER ROLES TABLE
-- =============================================
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. CREATE HELPER FUNCTION (is_admin)
-- =============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::public.app_role
  )
$$;

-- 4. CREATE PRODUCTS TABLE
-- =============================================
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT,
    status public.product_status NOT NULL DEFAULT 'live',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 5. CREATE PLANS TABLE
-- =============================================
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

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- 6. CREATE PARTNERS TABLE
-- =============================================
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

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- 7. CREATE CUSTOMERS TABLE
-- =============================================
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

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- 8. CREATE SUBSCRIPTIONS TABLE
-- =============================================
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

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- 9. CREATE PARTNER PAYOUTS TABLE
-- =============================================
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

ALTER TABLE public.partner_payouts ENABLE ROW LEVEL SECURITY;

-- 10. CREATE EXPENSES TABLE
-- =============================================
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

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- 11. CREATE SYSTEM LOGS TABLE
-- =============================================
CREATE TABLE public.system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- 12. CREATE RLS POLICIES
-- =============================================

-- User Roles Policies
CREATE POLICY "Admins can view user roles" ON public.user_roles
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert user roles" ON public.user_roles
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update user roles" ON public.user_roles
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete user roles" ON public.user_roles
    FOR DELETE USING (public.is_admin());

-- Products Policies
CREATE POLICY "Admins can view products" ON public.products
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert products" ON public.products
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update products" ON public.products
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete products" ON public.products
    FOR DELETE USING (public.is_admin());

-- Plans Policies
CREATE POLICY "Admins can view plans" ON public.plans
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert plans" ON public.plans
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update plans" ON public.plans
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete plans" ON public.plans
    FOR DELETE USING (public.is_admin());

-- Partners Policies
CREATE POLICY "Admins can view partners" ON public.partners
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert partners" ON public.partners
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update partners" ON public.partners
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete partners" ON public.partners
    FOR DELETE USING (public.is_admin());

-- Customers Policies
CREATE POLICY "Admins can view customers" ON public.customers
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert customers" ON public.customers
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update customers" ON public.customers
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete customers" ON public.customers
    FOR DELETE USING (public.is_admin());

-- Subscriptions Policies
CREATE POLICY "Admins can view subscriptions" ON public.subscriptions
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert subscriptions" ON public.subscriptions
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update subscriptions" ON public.subscriptions
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete subscriptions" ON public.subscriptions
    FOR DELETE USING (public.is_admin());

-- Partner Payouts Policies
CREATE POLICY "Admins can view partner payouts" ON public.partner_payouts
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert partner payouts" ON public.partner_payouts
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update partner payouts" ON public.partner_payouts
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete partner payouts" ON public.partner_payouts
    FOR DELETE USING (public.is_admin());

-- Expenses Policies
CREATE POLICY "Admins can view expenses" ON public.expenses
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert expenses" ON public.expenses
    FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update expenses" ON public.expenses
    FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete expenses" ON public.expenses
    FOR DELETE USING (public.is_admin());

-- System Logs Policies
CREATE POLICY "Admins can view system logs" ON public.system_logs
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert system logs" ON public.system_logs
    FOR INSERT WITH CHECK (public.is_admin());

-- 13. CREATE UPDATED_AT TRIGGER FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 14. CREATE TRIGGERS FOR UPDATED_AT
-- =============================================
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON public.plans
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partner_payouts_updated_at BEFORE UPDATE ON public.partner_payouts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON public.expenses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 15. CREATE INDEXES FOR PERFORMANCE
-- =============================================
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