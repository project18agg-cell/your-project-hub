
-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Schedule reminder check every 2 minutes
SELECT cron.schedule(
  'check-interview-reminders',
  '*/2 * * * *',
  $$
  SELECT
    net.http_post(
      url:='https://vjsugiuabyecemeaccku.supabase.co/functions/v1/hiring-emails',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqc3VnaXVhYnllY2VtZWFjY2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NzMyMTEsImV4cCI6MjA4NTQ0OTIxMX0.9hARr9YjKj1zvomR4i4pU69OVv9QY0V21PJBUFBcu8U"}'::jsonb,
      body:='{"action": "check-reminders"}'::jsonb
    ) AS request_id;
  $$
);
