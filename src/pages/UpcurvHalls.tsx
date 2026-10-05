import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { DemoRequestForm } from '@/components/landing/DemoRequestForm';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { Button } from '@/components/ui/button';
import {
  BarChart3, Bell, Building, Calendar, Camera, CheckCircle2,
  ClipboardList, CreditCard, MapPin, Music, Shield, Users, Utensils,
} from 'lucide-react';
import hallsHero from '@/assets/halls-hero.png';
import { publicPricing } from '@/lib/publicSolutions';

const features = [
  { icon: Calendar, title: 'Booking Calendar', desc: 'Visual calendar with date blocking, availability checks and slot management.' },
  { icon: Building, title: 'Hall Management', desc: 'Manage multiple halls, seating capacity and amenities.' },
  { icon: Utensils, title: 'Catering Packages', desc: 'Configurable food menus with options and pricing.' },
  { icon: Music, title: 'Event Add-ons', desc: 'Coordinate decoration, photography and other services.' },
  { icon: CreditCard, title: 'Payment Tracking', desc: 'Track advances, instalments and final payments with receipts.' },
  { icon: Users, title: 'Guest Management', desc: 'Keep guest counts, invitations and responses together.' },
  { icon: Camera, title: 'Gallery & Portfolio', desc: 'Showcase past events with organised photo galleries.' },
  { icon: Bell, title: 'WhatsApp Reminders', desc: 'Send booking confirmations and event reminders.' },
  { icon: BarChart3, title: 'Revenue Analytics', desc: 'Review bookings, revenue, seasonal trends and occupancy.' },
  { icon: ClipboardList, title: 'Checklist System', desc: 'Coordinate staff with pre-event and post-event checklists.' },
  { icon: Shield, title: 'Damage Deposits', desc: 'Manage security deposits, deductions and refunds.' },
  { icon: MapPin, title: 'Multi-Venue', desc: 'Manage multiple venues and branches from one dashboard.' },
];

const howItWorks = [
  ['01', 'Add your halls', 'Set up halls, capacity, pricing and availability.'],
  ['02', 'Receive bookings', 'Handle enquiries from links, WhatsApp or walk-ins.'],
  ['03', 'Manage events', 'Coordinate catering, decoration and logistics.'],
  ['04', 'Collect and grow', 'Track payments, reviews and venue performance.'],
];

const planFeatures = ['Booking Calendar & Management', 'Multiple Hall Support', 'Catering Package Builder', 'Event Add-on Services', 'Payment & Deposit Tracking', 'Guest Management', 'WhatsApp Notifications', 'Revenue Analytics', 'Photo Gallery', 'Priority Support'];

const UpcurvHalls = () => (
  <div className="public-site min-h-screen bg-background text-foreground">
    <SEOHead title="Upcurv Halls - Wedding & Event Hall Management System" description="Complete wedding hall and event venue management — bookings, catering, payments, guest management, and analytics." path="/upcurv-halls" />
    <PageViewTracker title="Upcurv Halls" />
    <LandingNavbar />
    <main>
      <section className="border-b border-border py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase text-primary"><Building className="h-4 w-4" /> Wedding &amp; event hall management</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">Run every booking with <span className="text-primary">fewer gaps.</span></h1>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">Bring enquiries, bookings, catering, payments and guest coordination into one practical venue system.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="lg" asChild><a href="#demo">Request a demo</a></Button><Button size="lg" variant="outline" asChild><a href="#features">See features</a></Button></div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">{['Free setup', '14-day trial', 'No code needed'].map((item) => <span key={item} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" />{item}</span>)}</div>
          </div>
          <div className="relative border border-border bg-card p-3 shadow-lg sm:p-5"><img src={hallsHero} alt="Upcurv Halls booking dashboard" className="w-full border border-border" /><div className="absolute -bottom-4 left-6 border border-border bg-card px-4 py-3 shadow-md"><p className="text-xs text-muted-foreground">One live view</p><p className="text-sm font-bold">Bookings, dues and events</p></div></div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="text-sm font-bold uppercase text-primary">A clear operating flow</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">From first enquiry to completed event.</h2><div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{howItWorks.map(([step, title, desc]) => <article key={step} className="bg-card p-5 sm:p-6"><p className="font-display text-3xl font-bold text-primary">{step}</p><h3 className="mt-5 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p></article>)}</div></div>
      </section>

      <section id="features" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><p className="text-sm font-bold uppercase text-primary">Full feature set</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Everything your venue team needs in one place.</h2></div><div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{features.map(({ icon: Icon, title, desc }) => <article key={title} className="bg-card p-5 sm:p-6"><span className="flex h-10 w-10 items-center justify-center border border-primary/20 bg-accent text-primary"><Icon className="h-5 w-5" /></span><h3 className="mt-5 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p></article>)}</div></div>
      </section>

      <section id="pricing" className="border-y border-border bg-secondary py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="text-sm font-bold uppercase text-primary">Simple pricing</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">One plan. Everything included.</h2><p className="mt-4 text-muted-foreground">A complete venue operations system with support included.</p></div><article className="border-2 border-primary bg-card p-6 shadow-sm sm:p-8"><p className="text-xs font-bold uppercase text-primary">Upcurv Halls Pro</p><div className="mt-4 flex flex-wrap items-baseline gap-3"><span className="font-display text-4xl font-bold">{publicPricing.halls.price}</span><span className="text-sm text-muted-foreground line-through">{publicPricing.halls.previousPrice}</span></div><p className="mt-2 text-sm text-muted-foreground">Per venue · billed yearly</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{planFeatures.map((feature) => <li key={feature} className="flex gap-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{feature}</li>)}</ul><Button className="mt-8" asChild><a href="#demo">Request a demo</a></Button></article></div>
      </section>

      <section id="demo" className="scroll-mt-20 py-16 sm:py-24"><div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="mb-8"><p className="text-sm font-bold uppercase text-primary">See it with your workflow</p><h2 className="mt-3 font-display text-3xl font-bold">Request a personalised demo</h2></div><div className="border border-border bg-card p-5 shadow-sm sm:p-8"><DemoRequestForm product="upcurv_halls" /></div></div></section>
    </main>
    <LandingFooter />
    <ChatBot />
  </div>
);

export default UpcurvHalls;