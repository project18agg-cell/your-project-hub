import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { SEOHead } from '@/components/SEOHead';

const Privacy = () => (
  <div className="min-h-screen bg-white">
    <SEOHead title="Privacy Policy" description="Upcurv Technologies privacy policy — how we collect, use, and protect your information." path="/privacy" />
    <LandingNavbar />
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: February 17, 2026</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-muted-foreground">We collect information you provide directly to us, such as when you create an account, request a demo, submit a franchise application, or contact us. This may include your name, email, phone number, business name, city, and other relevant details.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-muted-foreground">We use the information we collect to provide, maintain, and improve our services, process your requests, send you communications, and for analytics purposes.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
        <p className="text-muted-foreground">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Contact Us</h2>
        <p className="text-muted-foreground">If you have questions about this Privacy Policy, please contact us at hello@upcurv.com.</p>
      </div>
    </section>
    <LandingFooter />
  </div>
);

export default Privacy;
