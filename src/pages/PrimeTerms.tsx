import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { UpcurvLogo } from '@/components/landing/UpcurvLogo';

const BRAND = '#F9423A';

const PrimeTerms = () => (
  <div className="min-h-screen bg-white">
    <SEOHead title="Terms of Service - Upcurv" description="Upcurv Terms of Service for SaaS products and services." path="/upcurv-prime/terms" />
    <LandingNavbar logoColor={BRAND} />
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1 className="text-3xl font-bold text-foreground mb-8">Upcurv Terms of Service</h1>
        <p className="text-muted-foreground">Effective Date: April 6, 2026</p>
        <p className="text-muted-foreground mt-4">Welcome to Upcurv. By using our platform, you agree to the following terms:</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Service Description</h2>
        <p className="text-muted-foreground">Upcurv provides tools for businesses to manage customer communication, orders, and engagement through WhatsApp and other channels.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. User Responsibilities</h2>
        <p className="text-muted-foreground">You agree to:</p>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Provide accurate information</li>
          <li>Use the platform only for lawful purposes</li>
          <li>Not misuse or abuse the service</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Messaging Compliance</h2>
        <p className="text-muted-foreground">Users must comply with WhatsApp (Meta) policies:</p>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Obtain customer consent before messaging</li>
          <li>Avoid spam or unsolicited messages</li>
          <li>Use approved message templates where required</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Payments</h2>
        <p className="text-muted-foreground">Any paid features or subscriptions will be clearly communicated. Fees are non-refundable unless stated otherwise.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Data Usage</h2>
        <p className="text-muted-foreground">We handle data as described in our <Link to="/upcurv-prime/privacy" className="underline" style={{ color: BRAND }}>Privacy Policy</Link>.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Service Availability</h2>
        <p className="text-muted-foreground">We strive for high availability but do not guarantee uninterrupted service.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Termination</h2>
        <p className="text-muted-foreground">We may suspend or terminate access if:</p>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Terms are violated</li>
          <li>Misuse is detected</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Limitation of Liability</h2>
        <p className="text-muted-foreground">Upcurv is not liable for:</p>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Business losses</li>
          <li>Message delivery failures due to third-party services</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Changes to Terms</h2>
        <p className="text-muted-foreground">We may update these terms. Continued use means acceptance of updated terms.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. Contact</h2>
        <p className="text-muted-foreground">Email: upcurvinnovations@gmail.com</p>
      </div>
    </section>

    <footer className="bg-foreground text-white py-8">
      <div className="max-w-3xl mx-auto px-4 text-center text-sm text-white/50">
        <div className="flex items-center justify-center gap-2 mb-4">
          <UpcurvLogo size={28} color={BRAND} />
          <span className="font-bold">Upcurv</span>
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/upcurv-prime/privacy" className="text-white/70 hover:text-white">Privacy</Link>
          <Link to="/upcurv-prime/terms" className="text-white/70 hover:text-white">Terms</Link>
          <Link to="/upcurv-prime/data-deletion" className="text-white/70 hover:text-white">Data Deletion</Link>
        </div>
        © {new Date().getFullYear()} Upcurv Innovations Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  </div>
);

export default PrimeTerms;
