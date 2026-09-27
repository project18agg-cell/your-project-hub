import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { DemoRequestForm } from '@/components/landing/DemoRequestForm';
import { AnimatedSection, AnimatedCard } from '@/components/landing/AnimatedSection';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import {
  CheckCircle2, ChevronRight, Star, Shirt, Clock, Truck, BarChart3,
  Users, Bell, MapPin, Calendar, CreditCard, Shield, Zap, Package,
  ArrowRight, Smartphone, TrendingUp, ClipboardList
} from 'lucide-react';
import washHero from '@/assets/wash-hero.png';

const PRIMARY = '#0EA5E9';
const DARK = '#1E3A5F';

const features = [
  { icon: Shirt, title: 'Garment Tracking', desc: 'Track every item from pickup to delivery with barcode/tag system.' },
  { icon: Clock, title: 'Order Management', desc: 'Manage wash, iron, dry clean orders with status tracking.' },
  { icon: Truck, title: 'Pickup & Delivery', desc: 'Schedule pickups and deliveries with route optimization.' },
  { icon: Calendar, title: 'Slot Booking', desc: 'Customers book preferred time slots online.' },
  { icon: CreditCard, title: 'Billing & Payments', desc: 'Auto-invoicing, UPI, cards, wallets, and COD support.' },
  { icon: Users, title: 'Customer CRM', desc: 'Customer profiles, order history, and loyalty programs.' },
  { icon: BarChart3, title: 'Business Analytics', desc: 'Revenue, order trends, item-wise reports, and insights.' },
  { icon: Bell, title: 'WhatsApp Alerts', desc: 'Automated notifications for order status and delivery.' },
  { icon: Package, title: 'Inventory Management', desc: 'Track supplies, detergents, packaging materials.' },
  { icon: ClipboardList, title: 'Service Categories', desc: 'Wash, iron, dry clean, premium care — all configurable.' },
  { icon: Shield, title: 'Damage Protection', desc: 'Log damage claims with photo evidence and resolution.' },
  { icon: MapPin, title: 'Multi-Branch', desc: 'Manage multiple outlets from a single dashboard.' },
];

const stats = [
  { value: '50+', label: 'Laundry Partners' },
  { value: '10K+', label: 'Orders Processed' },
  { value: '₹5L+', label: 'Revenue Tracked' },
  { value: '99.9%', label: 'Uptime' },
];

const howItWorks = [
  { step: '01', title: 'Set Up Shop', desc: 'Add services, pricing, and delivery zones.' },
  { step: '02', title: 'Accept Orders', desc: 'Receive orders via app, WhatsApp, or walk-in.' },
  { step: '03', title: 'Process & Track', desc: 'Tag garments, process, and update status.' },
  { step: '04', title: 'Deliver & Earn', desc: 'Complete delivery and collect payments.' },
];

const UpcurvWash = () => (
  <div className="min-h-screen bg-white">
    <SEOHead
      title="Upcurv Wash - Laundry & Ironing Shop Management System"
      description="Complete laundry and ironing business management — order tracking, pickup scheduling, billing, and customer management."
      path="/upcurv-wash"
    />
    <PageViewTracker title="Upcurv Wash" />
    <LandingNavbar logoColor="#0EA5E9" />

    {/* HERO */}
    <section className="py-20 sm:py-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${PRIMARY}08, #EFF6FF, ${PRIMARY}05)` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border" style={{ color: PRIMARY, borderColor: `${PRIMARY}40`, backgroundColor: `${PRIMARY}08` }}>
              <Shirt className="h-4 w-4" /> Laundry & Ironing Management
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight" style={{ color: DARK }}>
              Run Your Laundry<br />
              <span style={{ color: PRIMARY }}>Smarter & Faster</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: '#555' }}>
              Complete management system for laundry and ironing shops — from order intake to delivery, all in one platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#demo" className="inline-flex items-center gap-2 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl" style={{ backgroundColor: PRIMARY }}>
                Start Free Trial <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#features" className="inline-flex items-center gap-2 border px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors hover:bg-blue-50" style={{ borderColor: `${PRIMARY}40`, color: PRIMARY }}>
                See Features
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-sm" style={{ color: '#888' }}>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" style={{ color: '#22C55E' }} /> Free Setup</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" style={{ color: '#22C55E' }} /> 14-day Trial</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" style={{ color: '#22C55E' }} /> No Code Needed</div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: `${PRIMARY}20` }}>
              <img src={washHero} alt="Upcurv Wash Dashboard" className="w-full" />
            </div>
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white rounded-xl border shadow-lg p-2.5 sm:p-3 flex items-center gap-2" style={{ borderColor: '#eee' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${PRIMARY}15` }}><TrendingUp className="h-4 w-4" style={{ color: PRIMARY }} /></div>
              <div><p className="text-[10px]" style={{ color: '#888' }}>Today</p><p className="text-[10px] font-bold" style={{ color: DARK }}>24 orders</p></div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* STATS */}
    <section className="py-12 sm:py-14 border-y bg-white" style={{ borderColor: '#f0f0f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-3xl sm:text-4xl font-black" style={{ color: PRIMARY }}>{s.value}</div>
              <div className="text-xs sm:text-sm mt-1 font-medium" style={{ color: '#888' }}>{s.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: PRIMARY }}>Simple 4-Step Process</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2" style={{ color: DARK }}>Get Started in Minutes</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {howItWorks.map((step, i) => (
            <AnimatedCard key={step.step} delay={i * 0.1}>
              <div className="bg-white rounded-xl border p-4 sm:p-6 relative overflow-hidden h-full" style={{ borderColor: '#eee' }}>
                <div className="text-4xl sm:text-6xl font-black absolute top-1 sm:top-2 right-2 sm:right-3" style={{ color: `${PRIMARY}10` }}>{step.step}</div>
                <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2 mt-1 sm:mt-2" style={{ color: DARK }}>{step.title}</h3>
                <p className="text-[10px] sm:text-sm leading-relaxed" style={{ color: '#888' }}>{step.desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: PRIMARY }}>Full Feature Set</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2" style={{ color: DARK }}>Everything to Manage Your Laundry Business</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <AnimatedCard key={title} delay={i * 0.04}>
              <div className="bg-white rounded-xl border p-3 sm:p-6 md:hover:shadow-lg transition-all duration-300 h-full group" style={{ borderColor: '#eee' }}>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-4 transition-colors duration-300" style={{ backgroundColor: `${PRIMARY}10` }}>
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6" style={{ color: PRIMARY }} />
                </div>
                <h3 className="font-bold text-xs sm:text-base mb-1 sm:mb-2" style={{ color: DARK }}>{title}</h3>
                <p className="text-[10px] sm:text-sm leading-relaxed hidden sm:block" style={{ color: '#888' }}>{desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-12 sm:py-16" style={{ backgroundColor: PRIMARY }}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Ready to Digitize Your Laundry Business?</h2>
          <p className="text-white/80 text-sm sm:text-lg mb-6 sm:mb-8">Join laundry owners already growing with Upcurv Wash.</p>
          <a href="#demo" className="inline-flex items-center gap-2 bg-white font-bold px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors" style={{ color: PRIMARY }}>
            Get Free Demo <ChevronRight className="h-4 w-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>

    {/* PRICING */}
    <section className="py-16 sm:py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: PRIMARY }}>Simple Pricing</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2" style={{ color: DARK }}>One Plan. Everything Included.</h2>
        </AnimatedSection>
        <AnimatedSection className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border-2 p-6 sm:p-8 shadow-xl relative" style={{ borderColor: PRIMARY }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full" style={{ backgroundColor: PRIMARY }}>BEST VALUE</div>
            <h3 className="text-xl sm:text-2xl font-bold text-center" style={{ color: DARK }}>Upcurv Wash Pro</h3>
            <div className="text-center mt-4"><span className="text-4xl sm:text-5xl font-black" style={{ color: PRIMARY }}>₹899</span><span style={{ color: '#888' }}>/month</span></div>
            <p className="text-sm text-center mt-2" style={{ color: '#888' }}>Per outlet • Billed monthly</p>
            <ul className="mt-6 space-y-2 sm:space-y-3">
              {['Garment Tracking System', 'Order Management', 'Pickup & Delivery Scheduling', 'Customer CRM', 'Billing & Invoicing', 'WhatsApp Notifications', 'Business Analytics', 'Multi-Branch Support', 'Damage Claims', 'Priority Support'].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: DARK }}><CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: PRIMARY }} />{f}</li>
              ))}
            </ul>
            <a href="#demo" className="mt-6 sm:mt-8 block w-full text-center text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: PRIMARY }}>Start Free Trial</a>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* DEMO */}
    <section id="demo" className="py-16 sm:py-24" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: DARK }}>Get Started Today</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: '#888' }}>Request a free personalized demo of Upcurv Wash</p>
        </AnimatedSection>
        <div className="rounded-2xl shadow-sm border p-6 sm:p-8 max-w-xl mx-auto bg-white" style={{ borderColor: '#eee' }}>
          <DemoRequestForm product="upcurv_wash" accentColor={PRIMARY} />
        </div>
      </div>
    </section>

    <LandingFooter />
    <ChatBot />
  </div>
);

export default UpcurvWash;
