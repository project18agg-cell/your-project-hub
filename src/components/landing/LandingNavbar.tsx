import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { UpcurvLogo } from './UpcurvLogo';

const navLinks = [
  { href: '/#products', label: 'Products' },
  { href: '/#custom-saas', label: 'Custom SaaS' },
  { href: '/#solutions', label: 'Solutions' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#resources', label: 'Resources' },
];

export const LandingNavbar = ({ logoColor }: { logoColor?: string }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        const el = document.querySelector(href.replace('/', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <UpcurvLogo size={36} color={logoColor} />
            <span className="text-xl font-bold text-foreground">Upcurv</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                <Link key={link.label} to={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} onClick={() => handleNavClick(link.href)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild><a href="tel:+918807858256">Talk to Us</a></Button>
            <Button asChild>
              <a href="/#custom-saas-form">Get Started <ArrowUpRight /></a>
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-5 space-y-1">
            {navLinks.map(link => (
              link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                <Link key={link.label} to={link.href} className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => handleNavClick(link.href)}>
                  {link.label}
                </a>
              )
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <Button variant="outline" asChild><a href="tel:+918807858256">Talk to Us</a></Button>
              <Button asChild><a href="/#custom-saas-form" onClick={() => setMobileOpen(false)}>Get Started</a></Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
