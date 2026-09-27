import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { SEOHead } from '@/components/SEOHead';
import { ChatBot } from '@/components/landing/ChatBot';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Briefcase, GraduationCap, Loader2, Check } from 'lucide-react';

const ROLES = [
  { title: 'Product Management Intern', icon: Briefcase, description: 'End-to-end product ownership — research, workflow drafting, analysis, testing & product strategy. No coding required. 2–3 month internship.' },
];

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  graduation_year: string;
  role_applied: string;
  portfolio_url: string;
  message: string;
};

const emptyForm = (): FormState => ({
  full_name: '', email: '', phone: '', college: '', degree: '',
  graduation_year: '', role_applied: '', portfolio_url: '', message: '',
});

const SuccessAnimation = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="flex flex-col items-center justify-center py-12 gap-4"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center"
    >
      <motion.div
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Check className="h-10 w-10 text-white" strokeWidth={3} />
      </motion.div>
    </motion.div>
    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="text-xl font-bold text-green-600"
    >
      Application Submitted!
    </motion.h3>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="text-muted-foreground text-center max-w-sm"
    >
      Thank you for applying. Our team will review your application and get back to you within 5–7 working days.
    </motion.p>
  </motion.div>
);

const Careers = () => {
  const [form, setForm] = useState<FormState>(emptyForm());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.college || !form.degree || !form.graduation_year || !form.role_applied) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('internship_applications' as any).insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      college: form.college.trim(),
      degree: form.degree.trim(),
      graduation_year: parseInt(form.graduation_year),
      role_applied: form.role_applied,
      portfolio_url: form.portfolio_url.trim() || null,
      message: form.message.trim() || null,
    });
    setLoading(false);
    if (error) { toast.error('Submission failed. Please try again.'); return; }
    setSubmitted(true);
  };

  const inputClass = "w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#F9423A]/40 transition-all";

  return (
    <>
      <SEOHead title="Careers & Internships | Upcurv" description="Join Upcurv as a student intern. Explore openings in development, design, marketing & business development." />
      <PageViewTracker title="Careers" />
      <LandingNavbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#FFF8F0] to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-[#F9423A]/10 text-[#F9423A] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" /> Exclusively for Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Launch Your Career with <span className="text-[#F9423A]">Upcurv</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're looking for passionate students who want real-world experience building SaaS products used by thousands of businesses across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Intern */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Why Intern at Upcurv?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🚀', title: 'Real Projects', desc: 'Work on live products' },
              { emoji: '🎓', title: 'Certificate', desc: 'Get an official internship certificate' },
              { emoji: '💡', title: 'Mentorship', desc: 'Learn directly from founders & senior devs' },
              { emoji: '💰', title: 'Stipend', desc: 'Performance-based stipend for top interns' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#FFF8F0] rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Open Internship Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROLES.map((role, i) => {
              const Icon = role.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-border md:hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-[#F9423A]/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[#F9423A]" />
                  </div>
                  <h3 className="font-semibold mb-2">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Apply Now</h2>
          <p className="text-center text-muted-foreground mb-8">Fill in the form below and we'll get back to you shortly.</p>

          <div className="bg-[#FFF8F0] rounded-2xl p-6 sm:p-8 border border-border">
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessAnimation key="success" />
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input className={inputClass} placeholder="Full Name *" value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))} />
                    <input className={inputClass} placeholder="Email *" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                    <input className={inputClass} placeholder="Phone *" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                    <input className={inputClass} placeholder="College / University *" value={form.college} onChange={e => setForm(p => ({ ...p, college: e.target.value }))} />
                    <input className={inputClass} placeholder="Degree (e.g. B.Tech CS) *" value={form.degree} onChange={e => setForm(p => ({ ...p, degree: e.target.value }))} />
                    <input className={inputClass} placeholder="Graduation Year *" type="number" min="2024" max="2030" value={form.graduation_year} onChange={e => setForm(p => ({ ...p, graduation_year: e.target.value }))} />
                  </div>
                  <select className={inputClass} value={form.role_applied} onChange={e => setForm(p => ({ ...p, role_applied: e.target.value }))}>
                    <option value="">Select Role *</option>
                    {ROLES.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                  </select>
                  <input className={inputClass} placeholder="Portfolio / LinkedIn URL (optional)" value={form.portfolio_url} onChange={e => setForm(p => ({ ...p, portfolio_url: e.target.value }))} />
                  <textarea className={`${inputClass} resize-none`} placeholder="Why do you want to intern at Upcurv? (optional)" rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                  <button type="submit" disabled={loading}
                    className="w-full bg-[#F9423A] text-white rounded-xl py-3 font-semibold hover:bg-[#e03830] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <LandingFooter />
      <ChatBot />
    </>
  );
};

export default Careers;
