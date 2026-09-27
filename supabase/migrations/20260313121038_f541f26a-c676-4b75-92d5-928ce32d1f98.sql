
-- Add pipeline_stage to internship_applications
ALTER TABLE public.internship_applications ADD COLUMN IF NOT EXISTS pipeline_stage text NOT NULL DEFAULT 'new';

-- Create candidate_scores table
CREATE TABLE public.candidate_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE UNIQUE,
  resume_quality integer NOT NULL DEFAULT 0,
  communication integer NOT NULL DEFAULT 0,
  problem_solving integer NOT NULL DEFAULT 0,
  learning_ability integer NOT NULL DEFAULT 0,
  culture_fit integer NOT NULL DEFAULT 0,
  skills integer NOT NULL DEFAULT 0,
  portfolio_score integer NOT NULL DEFAULT 0,
  total_score integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create candidate_notes table
CREATE TABLE public.candidate_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE,
  note text NOT NULL,
  created_by text DEFAULT 'Admin',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create interview_schedules table
CREATE TABLE public.interview_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE,
  interview_type text NOT NULL DEFAULT 'google_meet',
  interview_date date NOT NULL,
  interview_time time NOT NULL,
  meeting_link text,
  interviewer_name text NOT NULL DEFAULT 'Admin',
  status text NOT NULL DEFAULT 'scheduled',
  email_sent boolean NOT NULL DEFAULT false,
  reminder_30_sent boolean NOT NULL DEFAULT false,
  reminder_5_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create interview_feedback table
CREATE TABLE public.interview_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid REFERENCES public.interview_schedules(id) ON DELETE CASCADE,
  application_id uuid NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE,
  communication integer NOT NULL DEFAULT 0,
  skills integer NOT NULL DEFAULT 0,
  confidence integer NOT NULL DEFAULT 0,
  learning_ability integer NOT NULL DEFAULT 0,
  notes text,
  decision text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create candidate_activity_log table
CREATE TABLE public.candidate_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE,
  action text NOT NULL,
  details text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.candidate_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for candidate_scores
CREATE POLICY "Admins can view candidate scores" ON public.candidate_scores FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert candidate scores" ON public.candidate_scores FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update candidate scores" ON public.candidate_scores FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete candidate scores" ON public.candidate_scores FOR DELETE USING (is_admin());

-- RLS Policies for candidate_notes
CREATE POLICY "Admins can view candidate notes" ON public.candidate_notes FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert candidate notes" ON public.candidate_notes FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can delete candidate notes" ON public.candidate_notes FOR DELETE USING (is_admin());

-- RLS Policies for interview_schedules
CREATE POLICY "Admins can view interview schedules" ON public.interview_schedules FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert interview schedules" ON public.interview_schedules FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update interview schedules" ON public.interview_schedules FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete interview schedules" ON public.interview_schedules FOR DELETE USING (is_admin());

-- RLS Policies for interview_feedback
CREATE POLICY "Admins can view interview feedback" ON public.interview_feedback FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert interview feedback" ON public.interview_feedback FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update interview feedback" ON public.interview_feedback FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete interview feedback" ON public.interview_feedback FOR DELETE USING (is_admin());

-- RLS Policies for candidate_activity_log
CREATE POLICY "Admins can view candidate activity" ON public.candidate_activity_log FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert candidate activity" ON public.candidate_activity_log FOR INSERT WITH CHECK (is_admin());

-- Triggers for updated_at
CREATE TRIGGER update_candidate_scores_updated_at BEFORE UPDATE ON public.candidate_scores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_interview_schedules_updated_at BEFORE UPDATE ON public.interview_schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_interview_feedback_updated_at BEFORE UPDATE ON public.interview_feedback FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-calculate total_score trigger
CREATE OR REPLACE FUNCTION public.calculate_total_score()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.total_score := ROUND((NEW.resume_quality + NEW.communication + NEW.problem_solving + NEW.learning_ability + NEW.culture_fit + NEW.skills + NEW.portfolio_score) * 100.0 / 70)::integer;
  RETURN NEW;
END;
$$;

CREATE TRIGGER calculate_score_trigger BEFORE INSERT OR UPDATE ON public.candidate_scores FOR EACH ROW EXECUTE FUNCTION public.calculate_total_score();

-- Auto log pipeline stage changes
CREATE OR REPLACE FUNCTION public.log_pipeline_change()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF OLD.pipeline_stage IS DISTINCT FROM NEW.pipeline_stage THEN
    INSERT INTO public.candidate_activity_log (application_id, action, details)
    VALUES (NEW.id, 'stage_changed', 'Moved from ' || COALESCE(OLD.pipeline_stage, 'none') || ' to ' || NEW.pipeline_stage);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER log_pipeline_change_trigger AFTER UPDATE ON public.internship_applications FOR EACH ROW EXECUTE FUNCTION public.log_pipeline_change();
