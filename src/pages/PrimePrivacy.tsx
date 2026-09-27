import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { UpcurvLogo } from '@/components/landing/UpcurvLogo';

const BRAND = '#F9423A';

const PrimePrivacy = () => (
  <div className="min-h-screen bg-white">
    <SEOHead title="Privacy Policy - Upcurv" description="Upcurv Privacy Policy — how we collect, use, and protect your information." path="/upcurv-prime/privacy" />
    <LandingNavbar logoColor={BRAND} />
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1 className="text-3xl font-bold text-foreground mb-8">Upcurv Privacy Policy</h1>
        <p className="text-muted-foreground">Effective Date: April 6, 2026</p>

        <p className="text-muted-foreground mt-4">Upcurv ("we", "our", "us") operates a SaaS platform that helps businesses manage customer communication, orders, and engagement through WhatsApp and other digital channels.</p>
        <p className="text-muted-foreground">This Privacy Policy explains how we collect, use, and protect your information.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-muted-foreground">We may collect the following data:</p>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Business information (store name, phone number, address)</li>
          <li>Customer contact details (phone numbers)</li>
          <li>Order and transaction data</li>
          <li>Communication data (messages sent via our platform)</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Information</h2>
        <p className="text-muted-foreground">We use collected data to:</p>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Send order updates and notifications via WhatsApp</li>
          <li>Improve customer engagement for businesses</li>
          <li>Provide analytics and insights to vendors</li>
          <li>Maintain and improve our services</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Sharing</h2>
        <p className="text-muted-foreground">We do not sell or rent user data. We may share data only:</p>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>With WhatsApp (Meta) for message delivery</li>
          <li>With service providers for system operations</li>
          <li>If required by law</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Data Storage & Security</h2>
        <p className="text-muted-foreground">We implement appropriate technical and organizational measures to protect your data from unauthorized access, loss, or misuse.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. User Rights</h2>
        <p className="text-muted-foreground">Users can request:</p>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Access to their data</li>
          <li>Correction of inaccurate data</li>
          <li>Deletion of their data</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Data Retention</h2>
        <p className="text-muted-foreground">We retain data only as long as necessary to provide our services or comply with legal obligations.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Third-Party Services</h2>
        <p className="text-muted-foreground">Our platform integrates with WhatsApp Business API provided by Meta. Their privacy policies may also apply.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Changes to This Policy</h2>
        <p className="text-muted-foreground">We may update this policy from time to time. Updates will be posted on this page.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Contact Us</h2>
        <p className="text-muted-foreground">For any questions or concerns:<br />Email: upcurvinnovations@gmail.com</p>
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

export default PrimePrivacy;
