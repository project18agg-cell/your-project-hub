import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { UpcurvLogo } from '@/components/landing/UpcurvLogo';

const BRAND = '#F9423A';

const PrimeDataDeletion = () => (
  <div className="min-h-screen bg-white">
    <SEOHead title="Data Deletion - Upcurv" description="Instructions to request deletion of your data from Upcurv." path="/upcurv-prime/data-deletion" />
    <LandingNavbar logoColor={BRAND} />
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm">
        <h1 className="text-3xl font-bold text-foreground mb-8">Upcurv Data Deletion Instructions</h1>

        <p className="text-muted-foreground">If you wish to delete your data associated with Upcurv, you can request deletion by contacting us.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Steps:</h2>
        <ol className="text-muted-foreground list-decimal pl-5 space-y-2">
          <li>Send an email to <strong>upcurvinnovations@gmail.com</strong></li>
          <li>Use subject: <strong>"Data Deletion Request"</strong></li>
          <li>Include your registered phone number or business details</li>
        </ol>

        <p className="text-muted-foreground mt-6">We will process your request within <strong>7 working days</strong>.</p>
        <p className="text-muted-foreground">All associated personal and business data will be deleted from our systems unless retention is required for legal purposes.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Need Help?</h2>
        <p className="text-muted-foreground">For further assistance, contact:<br /><strong>upcurvinnovations@gmail.com</strong></p>
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

export default PrimeDataDeletion;
