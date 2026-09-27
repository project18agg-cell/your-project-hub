import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { DemoRequestForm } from '@/components/landing/DemoRequestForm';
import { AnimatedSection, AnimatedCard } from '@/components/landing/AnimatedSection';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Car, BarChart3, Users, Calculator, ClipboardList, Calendar,
  TrendingUp, Shield, Smartphone, Globe, Zap, MapPin, Bell, CreditCard, Star, ChevronRight,
  Fuel, Wrench, Gauge, Route
} from 'lucide-react';
import vahanhubHero from '@/assets/vahanhub-hero.png';

const features = [
  { icon: Car, title: 'Vehicle Inventory', desc: 'Track all vehicles with details, images, pricing, and availability in real-time.' },
  { icon: Users, title: 'Dealer Catalogue', desc: 'Branded catalogue page with shareable links and real-time inventory views.' },
  { icon: Globe, title: 'Public Marketplace', desc: 'List vehicles on a public marketplace to boost visibility and attract buyers.' },
  { icon: ClipboardList, title: 'Lead CRM', desc: 'Capture walk-ins, phone, and online leads. Track follow-ups and conversions.' },
  { icon: Calculator, title: 'EMI & Finance', desc: 'Built-in EMI calculator, loan tracking, and finance partner integration.' },
  { icon: Calendar, title: 'Test Drive Scheduling', desc: 'Online booking, automated reminders and driver assignment workflows.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Sales velocity, inventory turnover, revenue, and staff performance.' },
  { icon: CheckCircle2, title: 'Multi-Branch', desc: 'Manage multiple showrooms from a single login. Transfer stock instantly.' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Alerts for low stock, pending test drives, lead follow-ups, and payments.' },
  { icon: CreditCard, title: 'Expense Tracking', desc: 'Track service costs, dealer fees, transport, and refurbishment expenses.' },
  { icon: Star, title: 'Customer Reviews', desc: 'Collect post-sale reviews and showcase them on your dealer catalogue.' },
  { icon: MapPin, title: 'Location Intelligence', desc: 'Map-based dealer search and territory analysis by city and district.' },
];

const stats = [
  { value: '10+', label: 'Dealers Onboarded' },
  { value: '50K+', label: 'Vehicles Listed' },
  { value: '15+', label: 'Cities Covered' },
  { value: '98%', label: 'Uptime SLA' },
];

const useCases = [
  { title: 'Car Dealers', desc: 'New and used car dealers managing large inventories with financing options.', badge: 'Most Popular', emoji: '🚗' },
  { title: 'Two-Wheeler Shops', desc: 'Bike showrooms with brand-wise inventory and service record management.', emoji: '🏍️' },
  { title: 'Commercial Vehicles', desc: 'Truck and bus dealers with fleet tracking and bulk buyer portals.', emoji: '🚛' },
  { title: 'Multi-Brand Dealerships', desc: 'Multiple brands across locations with centralized reporting.', emoji: '🏢' },
];

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Owner, AutoPrime Motors, Kochi', quote: 'Vahanhub helped us go digital in 2 weeks. Our leads tripled in the first month.', rating: 5 },
  { name: 'Priya Nair', role: 'Manager, SpeedWheels, Bangalore', quote: 'The marketplace feature is a game-changer. We sold 3 cars through online enquiries in the first week.', rating: 5 },
  { name: 'Amit Shah', role: 'Director, Premium Auto Group', quote: 'Managing 4 branches from one dashboard. Test drive scheduling alone saved us 10 hours a week.', rating: 5 },
];

// Floating vehicle SVG paths for decorative animation
const FloatingCar = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute pointer-events-none opacity-[0.06] ${className}`}
    animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <Car className="h-16 w-16 sm:h-24 sm:w-24 text-blue-500" />
  </motion.div>
);

const Vahanhub = () => (
  <div className="min-h-screen bg-white">
    <SEOHead
      title="Vahanhub - Smart Dealer Management Platform"
      description="Complete digital platform for automobile dealers — manage inventory, capture leads, schedule test drives, and grow with a public marketplace."
      path="/vahanhub"
    />
    <PageViewTracker title="Vahanhub" />
    <LandingNavbar logoColor="#F97316" />

    {/* HERO with Auto-Theme Animations */}
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-20 sm:py-24 overflow-hidden">
      {/* Decorative floating elements */}
      <FloatingCar className="top-16 left-[5%] hidden lg:block" delay={0} />
      <FloatingCar className="bottom-10 right-[8%] hidden lg:block" delay={1.5} />
      <motion.div
        className="absolute top-20 right-[15%] hidden lg:block pointer-events-none opacity-[0.04]"
        animate={{ y: [0, -16, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Gauge className="h-20 w-20 text-blue-600" />
      </motion.div>
      <motion.div
        className="absolute bottom-24 left-[20%] hidden lg:block pointer-events-none opacity-[0.05]"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 7, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Route className="h-16 w-16 text-blue-400" />
      </motion.div>

      {/* Animated road line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Car className="h-4 w-4" /> Dealer Management Platform
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Smart Dealer Management +<br />
              <motion.span
                className="text-blue-500 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Marketplace Growth Engine
              </motion.span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
              The complete digital platform for automobile dealers — manage inventory, capture leads, schedule test drives, and grow your online presence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                whileTap={{ scale: 0.98 }}
                href="#demo"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Free Demo <ChevronRight className="h-4 w-4" />
              </motion.a>
              <a href="#features" className="inline-flex items-center gap-2 border border-blue-200 hover:bg-blue-50 text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors">
                See Features
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Free Setup</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> 14-day trial</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> No credit card</div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img src={vahanhubHero} alt="Vahanhub Dashboard" className="w-full" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white rounded-2xl border border-border shadow-lg p-3 sm:p-4 flex items-center gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center"><TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" /></div>
              <div><p className="text-[10px] sm:text-xs text-muted-foreground">This month</p><p className="text-xs sm:text-sm font-bold text-foreground">+32 new leads</p></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-3 sm:-top-4 -right-2 sm:-right-4 bg-blue-600 rounded-2xl shadow-lg p-3 sm:p-4 text-white text-center"
            >
              <div className="text-lg sm:text-2xl font-bold">50K+</div>
              <div className="text-[10px] sm:text-xs text-blue-100">Vehicles Listed</div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* STATS with animated counters */}
    <section className="py-12 sm:py-14 border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
              <motion.div
                className="text-3xl sm:text-4xl font-black text-blue-500"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: i * 0.1 }}
              >
                {s.value}
              </motion.div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">{s.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURES - 2 col on mobile */}
    <section id="features" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Everything You Need</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2">Powerful Tools for Modern Dealerships</h2>
          <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">From inventory to invoicing, Vahanhub handles every aspect of running a successful automobile dealership</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <AnimatedCard key={title} delay={i * 0.04}>
              <div className="bg-white rounded-xl border border-border p-3 sm:p-6 md:hover:shadow-lg md:hover:border-blue-200 transition-all duration-300 h-full group">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 md:group-hover:bg-blue-500 flex items-center justify-center mb-2 sm:mb-4 transition-colors duration-300">
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-blue-500 md:group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-foreground text-xs sm:text-base mb-1 sm:mb-2">{title}</h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed hidden sm:block">{desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* USE CASES */}
    <section className="bg-blue-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Built for Every Auto Business</h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">Whether you sell cars, bikes, or commercial vehicles — Vahanhub adapts</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {useCases.map((uc, i) => (
            <AnimatedCard key={uc.title} delay={i * 0.08}>
              <motion.div
                className="bg-white rounded-xl border border-border p-4 sm:p-6 h-full relative"
              >
                {uc.badge && <span className="absolute top-2 sm:top-3 right-2 sm:right-3 text-[9px] sm:text-xs bg-blue-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full">{uc.badge}</span>}
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{uc.emoji}</div>
                <h3 className="font-bold text-foreground text-sm sm:text-base mb-1 sm:mb-2">{uc.title}</h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground">{uc.desc}</p>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* WHY CHOOSE + TESTIMONIALS */}
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Why Dealers Choose Vahanhub</h2>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-lg">Built specifically for the Indian automobile industry.</p>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {[
                { icon: Zap, title: 'Go Live in 48 Hours', desc: 'Complete onboarding and training in under 2 days.' },
                { icon: Shield, title: 'Secure & Compliant', desc: 'All data encrypted. Full GST compliance built in.' },
                { icon: Smartphone, title: 'Works on Any Device', desc: 'Native-quality experience on desktop, tablet, and mobile.' },
                { icon: Globe, title: 'Marketplace Visibility', desc: "Vehicles show up on Upcurv's public marketplace." },
              ].map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  className="flex gap-3 sm:gap-4"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">{title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="space-y-3 sm:space-y-4">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  className="bg-white rounded-xl border border-border p-4 sm:p-6 shadow-sm"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground italic">"{t.quote}"</p>
                  <div className="mt-2 sm:mt-3"><p className="text-xs sm:text-sm font-semibold text-foreground">{t.name}</p><p className="text-[10px] sm:text-xs text-muted-foreground">{t.role}</p></div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* CTA BANNER with motion */}
    <section className="py-12 sm:py-16 bg-blue-600 text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Transform Your Dealership?</h2>
          <p className="text-blue-100 text-sm sm:text-lg mb-6 sm:mb-8">Join the dealers already using Vahanhub.</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#demo"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get Free Demo <ChevronRight className="h-4 w-4" />
          </motion.a>
        </AnimatedSection>
      </div>
    </section>

    {/* PRICING */}
    <section className="py-16 sm:py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Simple Pricing</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2">One Plan. Everything Included.</h2>
        </AnimatedSection>
        <AnimatedSection className="max-w-md mx-auto">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl border-2 border-blue-500 p-6 sm:p-8 shadow-xl relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">RECOMMENDED</div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground text-center">Vahanhub Pro</h3>
            <div className="text-center mt-4"><span className="text-4xl sm:text-5xl font-black text-blue-600">₹1,300</span><span className="text-muted-foreground">/month</span></div>
            <p className="text-sm text-muted-foreground text-center mt-2">Per dealership • Billed monthly</p>
            <ul className="mt-6 space-y-2 sm:space-y-3">
              {['Unlimited Vehicle Listings', 'Lead Management CRM', 'Personal Dealer Catalogue', 'Public Marketplace Listing', 'EMI & Finance Tracking', 'Test Drive Scheduling', 'Multi-Branch Support', 'Performance Analytics', 'WhatsApp Notifications', 'Priority Support'].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs sm:text-sm text-foreground"><CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />{f}</li>
              ))}
            </ul>
            <a href="#demo" className="mt-6 sm:mt-8 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">Get Free Demo</a>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>

    {/* DEMO FORM */}
    <section id="demo" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Request a Free Demo</h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">Our team will walk you through Vahanhub personally</p>
        </AnimatedSection>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm border border-border p-6 sm:p-8 max-w-xl mx-auto">
          <DemoRequestForm product="vahanhub" accentColor="#3B82F6" />
        </div>
      </div>
    </section>

    <LandingFooter />
    <ChatBot />
  </div>
);

export default Vahanhub;
