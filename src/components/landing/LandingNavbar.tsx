import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { UpcurvLogo } from './UpcurvLogo';

const navLinks = [
  { href: '/#products', label: 'Products' },
  { href: '/franchise', label: 'Franchise' },
  { href: '/#why-upcurv', label: 'Why Upcurv' },
  { href: '/about', label: 'About Us' },
  { href: '/#contact', label: 'Contact' },
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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <UpcurvLogo size={36} color={logoColor} />
            <span className="text-xl font-bold text-foreground">Upcurv</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
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

          <div className="hidden md:flex items-center gap-3">
            <Button className="bg-[#F9423A] hover:bg-[#e03830] text-white" asChild>
              <a href="/#products">Explore Products</a>
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
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
          </div>
        )}
      </div>
    </nav>
  );
};
