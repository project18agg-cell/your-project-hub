import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { AnimatedSection, AnimatedCard } from '@/components/landing/AnimatedSection';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Rocket, AlertTriangle, BarChart3, Zap, DollarSign, Building2, RefreshCw, Monitor, Settings, Users, ShoppingCart, LayoutDashboard, CreditCard, TrendingUp, MessageCircle, CheckCircle2 } from 'lucide-react';
import labsHero from '@/assets/labs-hero.png';
import brandMyFamily from '@/assets/brand-myfamily.png';
import brandEnjoy from '@/assets/brand-enjoy.png';
import brandEduvanca from '@/assets/brand-eduvanca.png';
import brandPrMahal from '@/assets/brand-prmahal.png';

const YELLOW = '#FFD600';

const UpcurvLabs = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Upcurv Labs - We Build Systems That Run Your Business"
        description="Websites, dashboards & SaaS solutions — designed to scale your operations. Starting at ₹2,499."
        path="/upcurv-labs"
      />
      <PageViewTracker title="Upcurv Labs" />
      <LandingNavbar logoColor={YELLOW} />

      {/* HERO */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 sm:mb-6" style={{ backgroundColor: `${YELLOW}20`, color: '#B8A000' }}>
                ✅ Trusted by growing businesses
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: '#111' }}>
                We Build Systems That{' '}
                <span className="relative">
                  Run Your Business
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-1 left-0 h-3 -z-10 rounded"
                    style={{ backgroundColor: `${YELLOW}40` }}
                  />
                </span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-xl max-w-lg mx-auto lg:mx-0" style={{ color: '#555' }}>
                Websites, dashboards & SaaS solutions — designed to scale your operations.
              </p>
              <p className="mt-2 sm:mt-3 text-sm font-medium" style={{ color: '#888' }}>
                Starting at ₹2,499 • Enterprise-grade quality
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
                <Button className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold text-black hover:brightness-95" style={{ backgroundColor: YELLOW }} asChild>
                  <a href="#pricing">
                    <Rocket className="mr-2 h-5 w-5" /> Get Your System
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold border-2" style={{ borderColor: '#ddd', color: '#333' }} asChild>
                  <a href="https://wa.me/918807858256" target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-5 w-5" /> Book a Call
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full max-w-sm sm:max-w-lg lg:max-w-none"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: `${YELLOW}30` }}>
                <img src={labsHero} alt="Dashboard mockup" className="w-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BRANDS WE WORKED WITH */}
      <section className="py-10 sm:py-14 border-y" style={{ borderColor: '#f0f0f0', backgroundColor: '#FAFAFA' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#999' }}>
              Brands We've Worked With
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
            {[
              { src: brandMyFamily, alt: 'My Family' },
              { src: brandEnjoy, alt: 'Enjoy' },
              { src: brandEduvanca, alt: 'Eduvanca' },
              { src: brandPrMahal, alt: 'PR Mahal' },
            ].map((brand) => (
              <motion.div
                key={brand.alt}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center"
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="h-12 sm:h-16 lg:h-20 w-auto object-contain rounded-lg"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold" style={{ color: '#111' }}>
              Most Businesses Don't Have Systems.{' '}
              <span style={{ color: '#DC2626' }}>They Have Chaos.</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              { icon: AlertTriangle, title: 'Manual Work', desc: 'Wasted time on repetitive tasks that should be automated.', color: '#EF4444' },
              { icon: BarChart3, title: 'No Tracking', desc: 'Lost revenue because there\'s no visibility into operations.', color: '#F59E0B' },
              { icon: Zap, title: 'No Automation', desc: 'Slow growth from doing everything by hand.', color: '#8B5CF6' },
            ].map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border text-center h-full" style={{ borderColor: '#eee' }}>
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-5" style={{ backgroundColor: `${item.color}15` }}>
                    <item.icon className="h-5 w-5 sm:h-7 sm:w-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2" style={{ color: '#111' }}>{item.title}</h3>
                  <p className="text-xs sm:text-sm" style={{ color: '#666' }}>{item.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold" style={{ color: '#111' }}>
              We Turn Your Business Into a{' '}
              <span className="relative">
                System
                <div className="absolute bottom-1 left-0 w-full h-3 -z-10 rounded" style={{ backgroundColor: `${YELLOW}40` }} />
              </span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Settings, title: 'Automate Operations', desc: 'Remove manual work with smart workflows.' },
              { icon: BarChart3, title: 'Track Everything', desc: 'Real-time dashboards for complete visibility.' },
              { icon: TrendingUp, title: 'Scale Without Confusion', desc: 'Systems that grow with your business.' },
              { icon: RefreshCw, title: 'Iterate Fast', desc: 'Quick updates and continuous improvement.' },
            ].map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border text-center h-full" style={{ borderColor: '#eee' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: `${YELLOW}20` }}>
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#B8A000' }} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mb-1" style={{ color: '#111' }}>{item.title}</h3>
                  <p className="text-xs sm:text-sm" style={{ color: '#666' }}>{item.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full" style={{ color: '#B8A000', backgroundColor: `${YELLOW}20` }}>Our Services</span>
            <h2 className="text-2xl sm:text-4xl font-bold mt-4" style={{ color: '#111' }}>What We Build</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: Monitor,
                title: 'Website + Management System',
                desc: 'Custom website + admin dashboard to manage your business operations.',
                features: ['Website (modern UI)', 'Admin panel', 'Customer / order tracking', 'Reports & analytics'],
              },
              {
                icon: LayoutDashboard,
                title: 'SaaS for Your Business',
                desc: 'We build scalable SaaS platforms tailored to your business idea.',
                features: ['Full SaaS development', 'Login, dashboard, payments', 'Scalable architecture', 'Ongoing support'],
              },
            ].map((service, i) => (
              <AnimatedCard key={service.title} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border h-full" style={{ borderColor: '#eee' }}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5" style={{ backgroundColor: `${YELLOW}20` }}>
                    <service.icon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: '#B8A000' }} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#111' }}>{service.title}</h3>
                  <p className="text-xs sm:text-sm mb-4 sm:mb-5" style={{ color: '#666' }}>{service.desc}</p>
                  <ul className="space-y-2 mb-5 sm:mb-6">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: '#555' }}>
                        <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: YELLOW }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="rounded-full px-6 text-black font-semibold hover:brightness-95 w-full text-sm sm:text-base" style={{ backgroundColor: YELLOW }} asChild>
                    <a href="#pricing">Get Your System <ArrowRight className="ml-2 h-4 w-4" /></a>
                  </Button>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold" style={{ color: '#111' }}>
              Built for <span className="relative">Growth<div className="absolute bottom-1 left-0 w-full h-3 -z-10 rounded" style={{ backgroundColor: `${YELLOW}40` }} /></span>, Not Just Design
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Zap, title: 'Fast Execution', desc: 'We deliver quickly without cutting corners.' },
              { icon: DollarSign, title: 'Affordable Pricing', desc: 'Enterprise quality at startup-friendly rates.' },
              { icon: Building2, title: 'Enterprise-Grade', desc: 'Systems built to handle real business scale.' },
              { icon: RefreshCw, title: 'Scalable Architecture', desc: 'Designed to grow as you grow.' },
            ].map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.1}>
                <div className="text-center p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: `${YELLOW}20` }}>
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: '#B8A000' }} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mb-1" style={{ color: '#111' }}>{item.title}</h3>
                  <p className="text-xs sm:text-sm" style={{ color: '#666' }}>{item.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold" style={{ color: '#111' }}>
              Simple <span style={{ color: '#B8A000' }}>3-Step</span> Process
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-3 gap-3 sm:gap-8">
            {[
              { step: '01', icon: Phone, title: 'Discuss Your Requirement', desc: 'Tell us what you need. We listen and plan.' },
              { step: '02', icon: Settings, title: 'We Design & Build', desc: 'Our team creates your custom system.' },
              { step: '03', icon: Rocket, title: 'You Launch & Scale', desc: 'Go live and grow your business.' },
            ].map((item, i) => (
              <AnimatedCard key={item.step} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-5 shadow-lg" style={{ backgroundColor: YELLOW }}>
                    <item.icon className="h-5 w-5 sm:h-7 sm:w-7 text-black" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold mb-1 sm:mb-2" style={{ color: '#B8A000' }}>STEP {item.step}</div>
                  <h3 className="text-xs sm:text-lg font-bold mb-1 sm:mb-2" style={{ color: '#111' }}>{item.title}</h3>
                  <p className="text-[10px] sm:text-sm hidden sm:block" style={{ color: '#666' }}>{item.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-14 sm:py-20" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl font-bold" style={{ color: '#111' }}>
              Starts at Just{' '}
              <span style={{ color: '#B8A000' }}>₹2,499</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg" style={{ color: '#666' }}>
              Get your complete business system at an affordable price.
            </p>
            <div className="mt-6 sm:mt-8 bg-white rounded-2xl p-5 sm:p-8 shadow-sm border inline-block text-left" style={{ borderColor: '#eee' }}>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" style={{ color: YELLOW }} />
                  <div>
                    <p className="text-sm sm:text-base font-semibold" style={{ color: '#111' }}>Website + Management System</p>
                    <p className="text-xs sm:text-sm" style={{ color: '#888' }}>Starting at ₹2,499 + small monthly managing fee</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" style={{ color: YELLOW }} />
                  <div>
                    <p className="text-sm sm:text-base font-semibold" style={{ color: '#111' }}>Website Only</p>
                    <p className="text-xs sm:text-sm" style={{ color: '#888' }}>Starting at ₹2,499 • No monthly fee</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8">
              <Button className="rounded-full px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-lg font-semibold text-black hover:brightness-95" style={{ backgroundColor: YELLOW }} asChild>
                <a href="https://wa.me/918807858256" target="_blank" rel="noopener noreferrer">
                  Get Quote <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: '#111' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to Build Your{' '}
              <span style={{ color: YELLOW }}>Business System</span>?
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg" style={{ color: '#999' }}>
              Let's turn your idea into a powerful system.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center">
              <Button className="rounded-full px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-lg font-semibold text-black hover:brightness-95" style={{ backgroundColor: YELLOW }} asChild>
                <a href="https://wa.me/918807858256" target="_blank" rel="noopener noreferrer">
                  <Rocket className="mr-2 h-5 w-5" /> Get Started
                </a>
              </Button>
              <Button variant="outline" className="rounded-full px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-lg font-semibold border-2" style={{ borderColor: YELLOW, color: YELLOW }} asChild>
                <a href="https://wa.me/918807858256" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-5 w-5" /> Talk to Us
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918807858256"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        style={{ backgroundColor: '#25D366' }}
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </a>

      <LandingFooter />
    </div>
  );
};

export default UpcurvLabs;
