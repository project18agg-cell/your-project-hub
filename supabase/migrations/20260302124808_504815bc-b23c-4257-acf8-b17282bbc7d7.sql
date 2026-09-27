
-- Create internship_applications table
CREATE TABLE public.internship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
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
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit applications (public form)
CREATE POLICY "Anyone can submit internship applications"
ON public.internship_applications
FOR INSERT
WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Admins can view internship applications"
ON public.internship_applications
FOR SELECT
USING (is_admin());

-- Only admins can update
CREATE POLICY "Admins can update internship applications"
ON public.internship_applications
FOR UPDATE
USING (is_admin());

-- Only admins can delete
CREATE POLICY "Admins can delete internship applications"
ON public.internship_applications
FOR DELETE
USING (is_admin());

-- Indexes
CREATE INDEX idx_internship_applications_status ON public.internship_applications (status);
CREATE INDEX idx_internship_applications_created_at ON public.internship_applications (created_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_internship_applications_updated_at
BEFORE UPDATE ON public.internship_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
