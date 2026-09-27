import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { DemoRequestForm } from '@/components/landing/DemoRequestForm';
import { AnimatedSection, AnimatedCard } from '@/components/landing/AnimatedSection';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import {
  CheckCircle2, ShoppingCart, Layout, Tag, Gift, Truck, BarChart3,
  CreditCard, Palette, Zap, Globe, Shield, Star, Users, Package,
  Search, Bell, ChevronRight, Share2, Smartphone, TrendingUp
} from 'lucide-react';
import ecomHero from '@/assets/ecom-hero.png';

const features = [
  { icon: Layout, title: '10+ Templates', desc: 'Beautifully designed store templates. Launch in minutes.' },
  { icon: Palette, title: 'Full Customization', desc: 'Colors, fonts, layouts — no coding needed.' },
  { icon: Tag, title: 'Banners & Offers', desc: 'Hero banners, flash sales, and promotions.' },
  { icon: Gift, title: 'Coupons Engine', desc: 'Percentage, flat, buy-X-get-Y discounts.' },
  { icon: Truck, title: 'Order Tracking', desc: 'Complete order lifecycle management.' },
  { icon: BarChart3, title: 'Analytics', desc: 'GMV, daily orders, product performance.' },
  { icon: CreditCard, title: 'Multi-Gateway', desc: 'UPI, cards, net banking, wallets, COD.' },
  { icon: Search, title: 'SEO Tools', desc: 'Meta tags, sitemap, Google Shopping feed.' },
  { icon: Share2, title: 'Social Commerce', desc: 'Share on WhatsApp, Instagram, Facebook.' },
  { icon: Bell, title: 'WhatsApp Alerts', desc: 'Automated order & delivery notifications.' },
  { icon: Users, title: 'Customer CRM', desc: 'Profiles, purchase history, loyalty points.' },
  { icon: Package, title: 'Inventory', desc: 'Real-time stock with low-stock alerts.' },
];

const stats = [
  { value: '5+', label: 'Stores Launched' },
  { value: '10+', label: 'Template Designs' },
  { value: '₹25L+', label: 'GMV Processed' },
  { value: '99.9%', label: 'Uptime' },
];

const howItWorks = [
  { step: '01', title: 'Pick a Template', desc: 'Choose from our gallery of mobile-first templates.' },
  { step: '02', title: 'Add Products', desc: 'Upload products with images, variants, and pricing.' },
  { step: '03', title: 'Set Up Payments', desc: 'Connect Razorpay, PayU, or other gateways.' },
  { step: '04', title: 'Go Live & Sell', desc: 'Publish your store and start receiving orders.' },
];

const testimonials = [
  { name: 'Deepa Menon', role: 'Owner, Kalari Naturals', quote: 'Set up my entire store in one afternoon. Got my first order the next day!', rating: 5 },
  { name: 'Arjun Singh', role: 'Founder, TechGadgets India', quote: 'The SEO tools helped us grow to ₹2L/month in 90 days.', rating: 5 },
  { name: 'Fatima Zaidi', role: 'CEO, FashionForward', quote: 'Switched from Shopify. Upcurv Ecom is faster, cheaper, and support is great.', rating: 5 },
];

const UpcurvEcom = () => (
  <div className="min-h-screen bg-white">
    <SEOHead
      title="Upcurv Ecom - Launch Your Branded Online Store"
      description="Everything you need to create, manage, and grow your online store — templates, inventory, payments, and WhatsApp notifications."
      path="/upcurv-ecom"
    />
    <PageViewTracker title="Upcurv Ecom" />
    <LandingNavbar logoColor="#16A34A" />

    {/* HERO */}
    <section className="py-20 sm:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #F0FDF4, #FFFFFF, #F0FDF408)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ShoppingCart className="h-4 w-4" /> E-Commerce Platform
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Launch & Scale Your Own<br />
              <span className="text-green-600">Branded Online Store</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl">
              Everything you need to create, manage, and grow your online store — from beautiful templates to payment processing and WhatsApp notifications.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#demo" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Free Trial <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#features" className="inline-flex items-center gap-2 border border-green-200 hover:bg-green-50 text-green-700 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors">
                See Features
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Free Setup</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> 14-day trial</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> No code needed</div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img src={ecomHero} alt="Upcurv Ecom Dashboard" className="w-full" />
            </div>
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white rounded-xl border border-border shadow-lg p-2.5 sm:p-3 flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center"><TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" /></div>
              <div><p className="text-[10px] sm:text-xs text-muted-foreground">Today</p><p className="text-[10px] sm:text-xs font-bold text-foreground">12 new orders</p></div>
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
              <div className="text-3xl sm:text-4xl font-black text-green-600">{s.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">{s.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-wide">Simple 4-Step Process</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2">Go from Idea to Live Store in Hours</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {howItWorks.map((step, i) => (
            <AnimatedCard key={step.step} delay={i * 0.1}>
              <div className="bg-white rounded-xl border border-border p-4 sm:p-6 relative overflow-hidden h-full">
                <div className="text-4xl sm:text-6xl font-black text-muted/20 absolute top-1 sm:top-2 right-2 sm:right-3">{step.step}</div>
                <h3 className="font-bold text-foreground text-sm sm:text-base mb-1 sm:mb-2 mt-1 sm:mt-2">{step.title}</h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURES - 2 col on mobile */}
    <section id="features" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-wide">Full Feature Set</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2">Everything to Run a Successful Online Store</h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <AnimatedCard key={title} delay={i * 0.04}>
              <div className="bg-white rounded-xl border border-border p-3 sm:p-6 md:hover:shadow-lg md:hover:border-green-200 transition-all duration-300 h-full group">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-green-50 md:group-hover:bg-green-600 flex items-center justify-center mb-2 sm:mb-4 transition-colors duration-300">
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-green-600 md:group-hover:text-white transition-colors duration-300" />
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
    <section className="bg-green-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Built for Indian Sellers</h2>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-lg">GST compliance, local payments, and WhatsApp-first communication.</p>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {[
                { icon: Zap, title: 'Launch in Minutes', desc: 'No coding or design skills required.' },
                { icon: Globe, title: 'Sell Everywhere', desc: 'Share your store link on any channel.' },
                { icon: Shield, title: 'Secure & Scalable', desc: 'PCI-compliant, SSL, auto-scaling.' },
                { icon: Smartphone, title: 'Mobile-First', desc: '80% of Indian e-commerce is on mobile.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
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
                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3 w-3 sm:h-4 sm:w-4 fill-green-500 text-green-500" />)}</div>
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
    <section className="py-12 sm:py-16 bg-green-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Ready to Launch Your Online Store?</h2>
          <p className="text-green-100 text-sm sm:text-lg mb-6 sm:mb-8">Join the sellers already growing with Upcurv Ecom.</p>
          <a href="#demo" className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-6 sm:px-8 py-3 rounded-lg hover:bg-green-50 transition-colors">
            Get Free Demo <ChevronRight className="h-4 w-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>

    {/* PRICING */}
    <section className="py-16 sm:py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-12">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-wide">Simple Pricing</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2">One Plan. Everything Included.</h2>
        </AnimatedSection>
        <AnimatedSection className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border-2 border-green-500 p-6 sm:p-8 shadow-xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-full">BEST VALUE</div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground text-center">Upcurv Ecom Pro</h3>
            <div className="text-center mt-4"><span className="text-4xl sm:text-5xl font-black text-green-600">₹1,100</span><span className="text-muted-foreground">/month</span></div>
            <p className="text-sm text-muted-foreground text-center mt-2">Per store • Billed monthly</p>
            <ul className="mt-6 space-y-2 sm:space-y-3">
              {['10+ Store Templates', 'Full Customization', 'Unlimited Products', 'Multi-Gateway Payments', 'Order & Delivery Tracking', 'Coupons & Discounts', 'SEO Tools', 'WhatsApp Notifications', 'Social Commerce', 'Priority Support'].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs sm:text-sm text-foreground"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />{f}</li>
              ))}
            </ul>
            <a href="#demo" className="mt-6 sm:mt-8 block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">Start Free Trial</a>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* DEMO */}
    <section id="demo" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Get Started Today</h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">Request a free personalized demo of Upcurv Ecom</p>
        </AnimatedSection>
        <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-sm border border-border p-6 sm:p-8 max-w-xl mx-auto">
          <DemoRequestForm product="upcurv_ecom" accentColor="#16A34A" />
        </div>
      </div>
    </section>

    <LandingFooter />
    <ChatBot />
  </div>
);

export default UpcurvEcom;
