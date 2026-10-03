import { Link } from 'react-router-dom';
import { UpcurvLogo } from './UpcurvLogo';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { externalDestinations } from '@/lib/publicSolutions';

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);

export const LandingFooter = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <UpcurvLogo size={36} />
              <span className="text-xl font-bold">Upcurv</span>
            </div>
             <p className="text-sm text-primary-foreground/60 mb-4 max-w-sm">
               Digital products and custom business software built around how your business actually works.
            </p>
             <div className="space-y-2 text-sm text-primary-foreground/60">
              <div className="flex items-start gap-2">
                 <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>Upcurv Innovations Pvt. Ltd.<br />Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                 <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+91 8807858256</span>
              </div>
              <div className="flex items-center gap-2">
                 <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>upcurvinnovations@gmail.com</span>
              </div>
            </div>
            <a href="https://www.instagram.com/upcurv" target="_blank" rel="noopener noreferrer" aria-label="Upcurv on Instagram" className="mt-5 inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground"><InstagramIcon /> @upcurv</a>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
             <ul className="space-y-2 text-sm text-primary-foreground/60">
               <li><a href={externalDestinations.trade} className="hover:text-primary-foreground transition-colors inline-flex gap-1">Upcurv Trade <ArrowUpRight className="h-3 w-3" /></a></li>
               <li><a href={externalDestinations.prints} className="hover:text-primary-foreground transition-colors inline-flex gap-1">Upcurv Prints <ArrowUpRight className="h-3 w-3" /></a></li>
               <li><a href={externalDestinations.hub} className="hover:text-primary-foreground transition-colors inline-flex gap-1">UpcurvHub <ArrowUpRight className="h-3 w-3" /></a></li>
               <li><Link to="/custom-saas" className="hover:text-primary-foreground transition-colors">Custom SaaS</Link></li>
               <li><Link to="/upcurv-halls" className="hover:text-primary-foreground transition-colors">Upcurv Halls</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
             <ul className="space-y-2 text-sm text-primary-foreground/60">
               <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link></li>
               <li><Link to="/careers" className="hover:text-primary-foreground transition-colors">Careers</Link></li>
               <li><Link to="/pricing" className="hover:text-primary-foreground transition-colors">Pricing</Link></li>
               <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
               <li><a href="tel:+918807858256" className="hover:text-primary-foreground transition-colors">Talk to Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
             <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund" className="hover:text-primary-foreground transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

         <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} Upcurv Innovations Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
