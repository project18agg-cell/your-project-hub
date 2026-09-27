
-- Table for product demo requests and contact form submissions
CREATE TABLE public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  business_name TEXT,
  city TEXT,
  product TEXT NOT NULL,
  request_type TEXT NOT NULL DEFAULT 'demo',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form submissions)
CREATE POLICY "Anyone can submit demo requests"
ON public.demo_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view/manage
CREATE POLICY "Admins can view demo requests"
ON public.demo_requests
FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can update demo requests"
ON public.demo_requests
FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete demo requests"
ON public.demo_requests
FOR DELETE
USING (is_admin());

-- Franchise/partner applications
CREATE TABLE public.franchise_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
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
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.franchise_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit franchise applications"
ON public.franchise_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view franchise applications"
ON public.franchise_applications
FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can update franchise applications"
ON public.franchise_applications
FOR UPDATE
USING (is_admin());

CREATE POLICY "Admins can delete franchise applications"
ON public.franchise_applications
FOR DELETE
USING (is_admin());
