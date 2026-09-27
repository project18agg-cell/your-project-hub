import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function getTransporter() {
  const SMTP_HOST = Deno.env.get('SMTP_HOST');
  const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587');
  const SMTP_USER = Deno.env.get('SMTP_USER');
  const SMTP_PASS = Deno.env.get('SMTP_PASS');

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP credentials not configured');
  }

  return { transporter: nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  }), fromEmail: SMTP_USER };
}

function inviteHtml(d: any) {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1a1a1a;">Interview Scheduled – ${d.position} at Upcurv Innovations</h2>
  <p>Hi ${d.candidate_name},</p>
  <p>Thank you for applying for the <strong>${d.position}</strong> role at Upcurv Innovations.</p>
  <p>We are pleased to invite you for an interview. Please find the interview details below:</p>
  <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
    <h3 style="margin-top:0;">Interview Details</h3>
    <p><strong>Position:</strong> ${d.position}</p>
    <p><strong>Date:</strong> ${d.interview_date}</p>
    <p><strong>Time:</strong> ${d.interview_time}</p>
    <p><strong>Interviewer:</strong> ${d.interviewer_name}</p>
  </div>
  <p><strong>Meeting Link:</strong><br/>
    <a href="${d.meeting_link}" style="color: #2563eb;">${d.meeting_link}</a>
  </p>
  <p>Please try to join the meeting 5 minutes before the scheduled time.</p>
  <p>If you face any issues joining the meeting or need to reschedule, please contact us at:<br/>
    <a href="mailto:upcurvinnovations@gmail.com">upcurvinnovations@gmail.com</a>
  </p>
  <p>We look forward to speaking with you.</p>
  <p>Best regards,<br/><strong>Hiring Team</strong><br/>Upcurv Innovations</p>
</div>`;
}

function reminder30Html(d: any) {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1a1a1a;">Reminder: Your Interview in 30 Minutes – Upcurv Innovations</h2>
  <p>Hi ${d.candidate_name},</p>
  <p>This is a quick reminder that your interview for the <strong>${d.position}</strong> role at Upcurv Innovations will begin in <strong>30 minutes</strong>.</p>
  <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
    <h3 style="margin-top:0;">Interview Details</h3>
    <p><strong>Date:</strong> ${d.interview_date}</p>
    <p><strong>Time:</strong> ${d.interview_time}</p>
  </div>
  <p><strong>Join Meeting:</strong><br/>
    <a href="${d.meeting_link}" style="color: #2563eb;">${d.meeting_link}</a>
  </p>
  <p>Please ensure your internet connection and microphone are ready before joining.</p>
  <p>We look forward to speaking with you shortly.</p>
  <p>Best regards,<br/><strong>Hiring Team</strong><br/>Upcurv Innovations</p>
</div>`;
}

function reminder5Html(d: any) {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1a1a1a;">Your Interview Starts in 5 Minutes – Upcurv Innovations</h2>
  <p>Hi ${d.candidate_name},</p>
  <p>Your interview for the <strong>${d.position}</strong> role at Upcurv Innovations will begin in <strong>5 minutes</strong>.</p>
  <p>Please join the meeting using the link below:</p>
  <p><a href="${d.meeting_link}" style="color: #2563eb; font-size: 16px;">${d.meeting_link}</a></p>
  <p>If you face any issue joining the meeting, please contact us at:<br/>
    <a href="mailto:upcurvinnovations@gmail.com">upcurvinnovations@gmail.com</a>
  </p>
  <p>Best regards,<br/><strong>Hiring Team</strong><br/>Upcurv Innovations</p>
</div>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...data } = await req.json();
    const { transporter, fromEmail } = getTransporter();

    if (action === 'send-invite') {
      const { candidate_name, email, position, interview_date, interview_time, interviewer_name, meeting_link } = data;

      await transporter.sendMail({
        from: `"Upcurv Innovations" <${fromEmail}>`,
        to: email,
        subject: `Interview Scheduled – ${position} at Upcurv Innovations`,
        html: inviteHtml({ candidate_name, position, interview_date, interview_time, interviewer_name, meeting_link }),
      });

      return new Response(JSON.stringify({ success: true, message: 'Interview invite sent' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'check-reminders') {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const now = new Date();
      const { data: interviews, error } = await supabase
        .from('interview_schedules')
        .select('*, internship_applications!inner(full_name, email, role_applied)')
        .eq('status', 'scheduled')
        .or('reminder_30_sent.eq.false,reminder_5_sent.eq.false');

      if (error) throw new Error(`DB error: ${error.message}`);

      let sent30 = 0, sent5 = 0;

      for (const interview of (interviews || [])) {
        const interviewDateTime = new Date(`${interview.interview_date}T${interview.interview_time}`);
        const diffMs = interviewDateTime.getTime() - now.getTime();
        const diffMin = diffMs / 60000;

        const app = interview.internship_applications;
        const emailData = {
          candidate_name: app.full_name,
          position: app.role_applied,
          interview_date: interview.interview_date,
          interview_time: interview.interview_time,
          meeting_link: interview.meeting_link || 'https://meet.google.com/zsm-hzrx-kxe',
        };

        // 30 min reminder (between 25-35 min before)
        if (!interview.reminder_30_sent && diffMin > 25 && diffMin <= 35) {
          await transporter.sendMail({
            from: `"Upcurv Innovations" <${fromEmail}>`,
            to: app.email,
            subject: `Reminder: Your Interview in 30 Minutes – Upcurv Innovations`,
            html: reminder30Html(emailData),
          });
          await supabase.from('interview_schedules').update({ reminder_30_sent: true }).eq('id', interview.id);
          sent30++;
        }

        // 5 min reminder (between 2-8 min before)
        if (!interview.reminder_5_sent && diffMin > 2 && diffMin <= 8) {
          await transporter.sendMail({
            from: `"Upcurv Innovations" <${fromEmail}>`,
            to: app.email,
            subject: `Your Interview Starts in 5 Minutes – Upcurv Innovations`,
            html: reminder5Html(emailData),
          });
          await supabase.from('interview_schedules').update({ reminder_5_sent: true }).eq('id', interview.id);
          sent5++;
        }
      }

      return new Response(JSON.stringify({ success: true, sent30, sent5 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
