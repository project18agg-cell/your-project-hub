import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { DemoRequestForm } from '@/components/landing/DemoRequestForm';
import { AnimatedSection, AnimatedCard } from '@/components/landing/AnimatedSection';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import {
  Store, Receipt, Package, Monitor, Users, Star, RotateCcw, BarChart3,
  Shield, Smartphone, Clock, Zap, Globe, CheckCircle2, ChevronRight,
  TrendingUp, CreditCard, Bell, RefreshCw, Tag, Layers
} from 'lucide-react';
import retailHero from '@/assets/retail-hero.png';

const features = [
  { icon: Receipt, title: 'Lightning Billing', desc: 'GST-compliant bills in under 2 seconds.' },
  { icon: Package, title: 'Real-Time Inventory', desc: 'Live stock with alerts and barcode scanning.' },
  { icon: Monitor, title: 'Multi-Counter POS', desc: 'Multiple billing counters simultaneously.' },
  { icon: Users, title: 'Staff Management', desc: 'Role-based access and shift reports.' },
  { icon: Star, title: 'Loyalty Program', desc: 'Built-in points system for customer retention.' },
  { icon: RotateCcw, title: 'Returns & Exchange', desc: 'Seamless returns with auto inventory restore.' },
  { icon: BarChart3, title: 'Analytics', desc: 'Sales reports, peak hours, staff metrics.' },
  { icon: Store, title: 'Multi-Store', desc: 'Manage branches from a single dashboard.' },
  { icon: CreditCard, title: 'Flexible Payments', desc: 'Cash, UPI, cards, store credit, split pay.' },
  { icon: Tag, title: 'Offers & Pricing', desc: 'Date-based discounts and bundle offers.' },
  { icon: Bell, title: 'Smart Alerts', desc: 'Low stock and reconciliation reminders.' },
  { icon: Layers, title: 'Product Catalog', desc: 'Categories, brands, variants, composites.' },
];

const stats = [
  { value: '10+', label: 'Retail Stores' },
  { value: '20K+', label: 'Bills Generated' },
  { value: '2+', label: 'Cities Active' },
  { value: '<3s', label: 'Billing Speed' },
];

const industries = [
  { name: 'Grocery', icon: '🛒', desc: 'Barcode, weight-based billing.' },
  { name: 'Clothing', icon: '👗', desc: 'Size/color variants, offers.' },
  { name: 'Electronics', icon: '📱', desc: 'IMEI tracking, warranty.' },
  { name: 'Pharmacy', icon: '💊', desc: 'Expiry alerts, batches.' },
  { name: 'Hardware', icon: '🔧', desc: 'Bulk billing, credit accounts.' },
  { name: 'Jewellery', icon: '💍', desc: 'Weight pricing, hallmark.' },
];

const testimonials = [
  { name: 'Suresh Pillai', role: 'Owner, FreshMart, Thrissur', quote: 'Switched from manual billing in a weekend. Staff adapted in 2 days.', rating: 5 },
  { name: 'Kavya Thomas', role: 'Manager, Style Avenue, Coimbatore', quote: 'Multi-counter support is a lifesaver during festivals.', rating: 5 },
  { name: 'Mohammed Riyaz', role: 'Director, GadgetHub Stores', quote: 'Managing 4 stores from my phone. Reports are excellent.', rating: 5 },
];

const UpcurvRetail = () => (
  <div className="min-h-screen bg-white">
    <SEOHead
      title="Upcurv Retail - Complete Retail Business Management"
      description="Modern POS and retail management system for Indian businesses — lightning billing, smart inventory, multi-store support, and powerful analytics."
      path="/upcurv-retail"
    />
    <PageViewTracker title="Upcurv Retail" />
    <LandingNavbar logoColor="#0EA5E9" />

    {/* HERO */}
    <section className="bg-gradient-to-br from-sky-50 via-white to-sky-50/20 py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-700 border border-sky-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Store className="h-4 w-4" /> Retail Management System
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Complete Retail<br />
              <span className="text-sky-500">Business Management</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
              The modern POS and retail management system for Indian businesses — from a single store to a chain of 50+ outlets.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#demo" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Free Demo <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#features" className="inline-flex items-center gap-2 border border-sky-200 hover:bg-sky-50 text-sky-700 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors">
                See All Features
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Works Offline</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> GST Compliant</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Free Migration</div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img src={retailHero} alt="Upcurv Retail Dashboard" className="w-full" />
            </div>
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white rounded-xl border border-border shadow-lg p-2.5 sm:p-3 flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-100 flex items-center justify-center"><Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-600" /></div>
              <div><p className="text-[10px] sm:text-xs text-muted-foreground">Billing speed</p><p className="text-[10px] sm:text-xs font-bold text-foreground">&lt; 2 seconds</p></div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* STATS */}
    <section className="py-12 sm:py-14 border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-sky-500">{s.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">{s.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* INDUSTRIES - 2 col mobile */}
    <section className="py-14 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Built for Every Retail Vertical</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {industries.map((ind, i) => (
            <AnimatedCard key={ind.name} delay={i * 0.06}>
              <div className="bg-white rounded-xl border border-border p-3 sm:p-4 text-center md:hover:shadow-md transition-all h-full">
                <div className="text-2xl sm:text-3xl mb-2">{ind.icon}</div>
                <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-0.5 sm:mb-1">{ind.name}</h3>
                <p className="text-[9px] sm:text-xs text-muted-foreground">{ind.desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURES - 2 col mobile */}
    <section id="features" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <span className="text-sky-600 text-sm font-semibold uppercase tracking-wide">Full Feature Set</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2">Built for Speed, Accuracy, and Scale</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <AnimatedCard key={title} delay={i * 0.04}>
              <div className="bg-white rounded-xl border border-border p-3 sm:p-6 md:hover:shadow-lg md:hover:border-sky-200 transition-all duration-300 h-full group">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-sky-500/10 md:group-hover:bg-sky-500 flex items-center justify-center mb-2 sm:mb-4 transition-colors duration-300">
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-sky-500 md:group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-foreground text-xs sm:text-base mb-1 sm:mb-2">{title}</h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed hidden sm:block">{desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* WHY CHOOSE */}
    <section className="bg-sky-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Why Stores Trust Upcurv Retail</h2>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {[
                { icon: Clock, title: 'Lightning Fast Billing', desc: 'GST bills in under 3 seconds.' },
                { icon: RefreshCw, title: 'Works Offline', desc: 'Continue billing during outages.' },
                { icon: TrendingUp, title: 'Grow with You', desc: 'From 1 counter to 10 stores.' },
                { icon: Smartphone, title: 'Works on Any Device', desc: 'Touch-optimized for tablets.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">{title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="space-y-3 sm:space-y-4">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-xl border border-border p-4 sm:p-6 shadow-sm">
                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground italic">"{t.quote}"</p>
                  <div className="mt-2 sm:mt-3"><p className="text-xs sm:text-sm font-semibold text-foreground">{t.name}</p><p className="text-[10px] sm:text-xs text-muted-foreground">{t.role}</p></div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-12 sm:py-16 bg-sky-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Transform Your Retail Operations</h2>
          <a href="#demo" className="inline-flex items-center gap-2 bg-white text-sky-600 font-bold px-6 sm:px-8 py-3 rounded-lg hover:bg-sky-50 transition-colors">
            Get Free Demo <ChevronRight className="h-4 w-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>

    {/* PRICING */}
    <section className="py-16 sm:py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <span className="text-sky-600 text-sm font-semibold uppercase tracking-wide">Simple Pricing</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2">One Plan. Everything Included.</h2>
        </AnimatedSection>
        <AnimatedSection className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border-2 border-sky-500 p-6 sm:p-8 shadow-xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs font-bold px-4 py-1 rounded-full">MOST AFFORDABLE</div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground text-center">Upcurv Retail Pro</h3>
            <div className="text-center mt-4"><span className="text-4xl sm:text-5xl font-black text-sky-600">₹800</span><span className="text-muted-foreground">/month</span></div>
            <p className="text-sm text-muted-foreground text-center mt-2">Per store • Billed monthly</p>
            <ul className="mt-6 space-y-2 sm:space-y-3">
              {['Lightning Billing (<2s)', 'Thermal + A4 Printing', 'Real-Time Inventory', 'Multi-Counter POS', 'Staff Management', 'Loyalty Program', 'Returns & Exchange', 'Advanced Analytics', 'Multi-Store Support', 'Priority Support'].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs sm:text-sm text-foreground"><CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0" />{f}</li>
              ))}
            </ul>
            <a href="#demo" className="mt-6 sm:mt-8 block w-full text-center bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold transition-colors">Get Free Demo</a>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* DEMO */}
    <section id="demo" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Request a Free Demo</h2>
        </AnimatedSection>
        <div className="bg-gradient-to-br from-sky-50 to-white rounded-2xl shadow-sm border border-border p-6 sm:p-8 max-w-xl mx-auto">
          <DemoRequestForm product="upcurv_retail" accentColor="#0EA5E9" />
        </div>
      </div>
    </section>

    <LandingFooter />
    <ChatBot />
  </div>
);

export default UpcurvRetail;
