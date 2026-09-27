import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { SEOHead } from '@/components/SEOHead';

const Refund = () => (
  <div className="min-h-screen bg-white">
    <SEOHead title="Refund Policy" description="Upcurv Technologies refund policy for SaaS subscriptions." path="/refund" />
    <LandingNavbar />
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1 className="text-3xl font-bold text-foreground mb-8">Refund Policy</h1>
        <p className="text-muted-foreground">Last updated: February 17, 2026</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Refund Eligibility</h2>
        <p className="text-muted-foreground">Refunds may be requested within 7 days of payment if you are unsatisfied with the service. After the 7-day window, refunds are processed at Upcurv's discretion.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How to Request a Refund</h2>
        <p className="text-muted-foreground">To request a refund, please contact our support team at hello@upcurv.com with your subscription details and reason for the refund.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Processing</h2>
        <p className="text-muted-foreground">Approved refunds will be processed within 5-10 business days and credited to the original payment method.</p>
      </div>
    </section>
    <LandingFooter />
  </div>
);

export default Refund;
