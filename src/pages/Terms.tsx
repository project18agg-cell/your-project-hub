import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { SEOHead } from '@/components/SEOHead';

const Terms = () => (
  <div className="min-h-screen bg-white">
    <SEOHead title="Terms of Service" description="Terms of service for Upcurv Technologies SaaS products and services." path="/terms" />
    <LandingNavbar />
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: February 17, 2026</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground">By accessing or using Upcurv's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Use of Services</h2>
        <p className="text-muted-foreground">Our services are provided on a subscription basis. You agree to use them only for lawful purposes and in accordance with these terms.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Subscriptions & Payments</h2>
        <p className="text-muted-foreground">Subscription fees are billed in advance on a recurring basis. You can cancel your subscription at any time, but fees already paid are non-refundable unless covered by our refund policy.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Contact</h2>
        <p className="text-muted-foreground">For questions regarding these terms, contact us at hello@upcurv.com.</p>
      </div>
    </section>
    <LandingFooter />
  </div>
);

export default Terms;
