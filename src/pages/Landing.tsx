import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { AnimatedSection, AnimatedCard, isMobileDevice } from '@/components/landing/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Cloud, Shield, Smartphone, Server, MapPin, TrendingUp, Car, ShoppingCart, Store, ArrowRight, CheckCircle2, Star, Users, Zap, Tag, Gift, ShieldCheck, QrCode, Shirt, Building, Code2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import vahanhubHero from '@/assets/vahanhub-hero.png';
import ecomHero from '@/assets/ecom-hero.png';
import retailHero from '@/assets/retail-hero.png';
import blogRetailSaas from '@/assets/blog-retail-saas.png';
import blogFranchiseModel from '@/assets/blog-franchise-model.png';
import blogCarDealer from '@/assets/blog-car-dealer.png';


const BRAND = '#F9423A';

const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
      <SEOHead
        title="Upcurv - Cloud-Based Business Management Platforms"
        description="Upcurv builds scalable SaaS platforms for Indian businesses — dealer management, e-commerce, and retail POS solutions."
        path="/"
      />
      <PageViewTracker title="Home" />
      <LandingNavbar />

      {/* HERO — Suprhost-inspired */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
            style={{ background: `radial-gradient(circle, ${BRAND}20, transparent)` }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full"
            style={{ background: `radial-gradient(circle, ${BRAND}15, transparent)` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-6 px-4 py-2 rounded-full border"
                  style={{ color: BRAND, borderColor: `${BRAND}40`, backgroundColor: `${BRAND}08` }}
                >
                  <Star className="h-3.5 w-3.5" fill={BRAND} /> India's Fastest Growing SaaS
                </motion.span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] tracking-tight"
                style={{ color: '#1A1A2E' }}
              >
                Powering modern businesses with{' '}
                <span className="relative inline-block">
                  <span style={{ color: BRAND }}>cloud-based growth</span>
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <motion.path
                      d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8"
                      stroke={BRAND}
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      style={{ pathLength: useTransform(scrollYProgress, [0, 0.3], [1, 1]) }}
                    />
                  </motion.svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 text-base sm:text-lg max-w-xl leading-relaxed"
                style={{ color: '#555' }}
              >
                Upcurv builds scalable business management platforms designed to automate operations, increase visibility, and accelerate growth for Indian businesses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button size="lg" className="text-white px-8 rounded-full shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: BRAND }} asChild>
                  <a href="#products">Explore Products <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" style={{ borderColor: BRAND, color: BRAND }} asChild>
                  <a href="#franchise">City Franchise Partner</a>
                </Button>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-10 flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  {['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'].map((bg, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full ${bg} border-2 flex items-center justify-center`} style={{ borderColor: '#FFF8F0' }}>
                      <Users className="h-4 w-4 text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#1A1A2E' }}>15+ businesses</p>
                  <p className="text-xs" style={{ color: '#888' }}>trust Upcurv platforms</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Animated stats/feature cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[520px]">
                {/* Floating stat cards */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 w-[280px] bg-white rounded-2xl shadow-2xl p-6 border"
                  style={{ borderColor: '#eee', transform: 'rotate(-2deg)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${BRAND}15` }}>
                      <TrendingUp className="h-5 w-5" style={{ color: BRAND }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>₹1.4L</p>
                      <p className="text-xs" style={{ color: '#888' }}>Monthly Revenue</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: h }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="flex-1 rounded-sm"
                        style={{ backgroundColor: i === 5 ? BRAND : `${BRAND}30`, maxHeight: '90px' }}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute top-12 right-0 w-[240px] bg-white rounded-2xl shadow-xl p-5 border"
                  style={{ borderColor: '#eee', transform: 'rotate(3deg)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#888' }}>Active Products</p>
                  {[
                    { name: 'Vahanhub', color: '#3B82F6', pct: 85 },
                    { name: 'Upcurv Ecom', color: '#16A34A', pct: 70 },
                    { name: 'Upcurv Retail', color: '#06B6D4', pct: 60 },
                    { name: 'Upcurv Prime', color: '#F9423A', pct: 55 },
                    { name: 'Upcurv Wash', color: '#0EA5E9', pct: 40 },
                  ].map((p, i) => (
                    <div key={p.name} className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: '#1A1A2E' }}>{p.name}</span>
                        <span style={{ color: '#888' }}>{p.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: '#f0f0f0' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.pct}%` }}
                          transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: p.color }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-16 left-8 bg-white rounded-xl shadow-lg px-5 py-4 border"
                  style={{ borderColor: `${BRAND}20` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dcfce7' }}>
                      <Users className="h-5 w-5" style={{ color: '#16a34a' }} />
                    </div>
                    <div>
                      <p className="text-lg font-bold" style={{ color: '#1A1A2E' }}>15+</p>
                      <p className="text-[11px]" style={{ color: '#888' }}>Active Businesses</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute bottom-4 right-12 bg-white rounded-xl shadow-lg px-4 py-3 border"
                  style={{ borderColor: `${BRAND}20` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${BRAND}15` }}>
                      <Zap className="h-4 w-4" style={{ color: BRAND }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: '#1A1A2E' }}>99.9% Uptime</p>
                      <p className="text-[10px]" style={{ color: '#888' }}>Cloud-powered SaaS</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <AnimatedSection>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '15+', label: 'Active Users' },
              { value: '7', label: 'Products Live' },
              { value: '3+', label: 'Cities Covered' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white shadow-sm border"
                style={{ borderColor: '#eee' }}
              >
                <p className="text-3xl font-bold" style={{ color: BRAND }}>{stat.value}</p>
                <p className="text-sm mt-1" style={{ color: '#666' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* PRODUCTS */}
      <section id="products" className="py-20" style={{ backgroundColor: '#FFFAF5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full" style={{ color: BRAND, backgroundColor: `${BRAND}10` }}>Our Products</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: '#1A1A2E' }}>
              Purpose-built platforms for{' '}
              <span style={{ color: BRAND }}>Indian businesses</span>
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: '#666' }}>Every product is designed from the ground up to solve real business challenges.</p>
          </AnimatedSection>

          <div className="space-y-8">
            {[
              {
                name: 'Vahanhub', subtitle: 'Smart Dealer Management + Marketplace Growth Engine',
                gradient: `linear-gradient(135deg, #3B82F6, #2563EB)`, icon: Car, link: '/vahanhub', img: vahanhubHero,
                features: ['Complete Dealer Management System', 'Personal Dealer Catalogue', 'Public Marketplace', 'Leads & EMI Tracking', 'Vehicle Inventory', 'Test Drive Scheduling', 'Performance Analytics'],
              },
              {
                name: 'Upcurv Ecom', subtitle: 'Launch & Scale Your Own Branded Online Store',
                gradient: `linear-gradient(135deg, #16A34A, #15803D)`, icon: ShoppingCart, link: '/upcurv-ecom', img: ecomHero,
                features: ['10 Ready-Made Templates', 'Full Store Customization', 'Banner & Offer Management', 'Coupons & Discounts', 'Order & Delivery Tracking', 'Expense Monitoring', 'Payment Integration'],
              },
              {
                name: 'Upcurv Retail', subtitle: 'Complete Retail Business Management',
                gradient: `linear-gradient(135deg, #06B6D4, #0891B2)`, icon: Store, link: '/upcurv-retail', img: retailHero,
                features: ['Billing (Thermal + A4)', 'Inventory Tracking', 'Multi-Counter Support', 'Multi-Role Staff Access', 'Loyalty Points', 'Returns Management', 'Advanced Reports'],
              },
            ].map((product, i) => (
              <AnimatedSection key={product.name} delay={i * 0.1}>
                <motion.div
                  whileHover={isMobileDevice() ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm border overflow-hidden md:hover:shadow-xl transition-all duration-300"
                  style={{ borderColor: '#eee' }}
                >
                  <div className="h-1.5" style={{ background: product.gradient }} />
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      <div className="hidden lg:block w-48 h-32 rounded-xl overflow-hidden shrink-0 shadow-md">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${product.gradient}20` }}>
                            <product.icon className="h-5 w-5" style={{ color: BRAND }} />
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#1A1A2E' }}>{product.name}</h3>
                            <p className="text-sm" style={{ color: '#888' }}>{product.subtitle}</p>
                          </div>
                        </div>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                          {product.features.map(f => (
                            <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#555' }}>
                              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: BRAND }} />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="text-white shrink-0 rounded-full px-6" style={{ backgroundColor: BRAND }} asChild>
                        <Link to={product.link}>Explore <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}

            {/* Upcurv Prime */}
            <AnimatedSection delay={0.4}>
              <motion.div
                whileHover={isMobileDevice() ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden md:hover:shadow-xl transition-all duration-300"
                style={{ borderColor: '#eee' }}
              >
                <div className="h-1.5" style={{ background: `linear-gradient(135deg, ${BRAND}, #FF6B6B)` }} />
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${BRAND}15` }}>
                          <Tag className="h-5 w-5" style={{ color: BRAND }} />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#1A1A2E' }}>
                            Upcurv <span className="px-1.5 py-0.5 rounded text-white text-sm font-bold" style={{ backgroundColor: BRAND }}>prime</span>
                          </h3>
                          <p className="text-sm font-medium" style={{ color: '#888' }}>Smarter Payments. Real Savings.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-5">
                        <div className="space-y-2">
                          {[
                            { icon: QrCode, text: 'Scan & Pay at Stores' },
                            { icon: Tag, text: 'Instant Discounts' },
                            { icon: Gift, text: 'Cashback Rewards' },
                            { icon: MapPin, text: 'Nearby Partner Stores' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                              <Icon className="h-4 w-4 shrink-0" style={{ color: BRAND }} />
                              {text}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {[
                            { icon: ShieldCheck, text: 'Secure UPI Payments' },
                            { icon: Store, text: 'Multi-Category Stores' },
                            { icon: TrendingUp, text: 'Savings Analytics' },
                            { icon: Zap, text: 'Instant Confirmations' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                              <Icon className="h-4 w-4 shrink-0" style={{ color: '#22C55E' }} />
                              {text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button className="text-white shrink-0 rounded-full px-6" style={{ backgroundColor: BRAND }} asChild>
                      <Link to="/upcurv-prime">Explore <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Upcurv Wash */}
            <AnimatedSection delay={0.5}>
              <motion.div
                whileHover={isMobileDevice() ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden md:hover:shadow-xl transition-all duration-300"
                style={{ borderColor: '#eee' }}
              >
                <div className="h-1.5" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }} />
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#0EA5E915' }}>
                          <Shirt className="h-5 w-5" style={{ color: '#0EA5E9' }} />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#1A1A2E' }}>Upcurv Wash</h3>
                          <p className="text-sm font-medium" style={{ color: '#888' }}>Laundry & Ironing Shop Management</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-5">
                        <div className="space-y-2">
                          {[
                            { icon: Shirt, text: 'Garment Tracking' },
                            { icon: Tag, text: 'Order Management' },
                            { icon: MapPin, text: 'Pickup & Delivery' },
                            { icon: Users, text: 'Customer CRM' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                              <Icon className="h-4 w-4 shrink-0" style={{ color: '#0EA5E9' }} />
                              {text}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {[
                            { icon: ShieldCheck, text: 'Billing & Payments' },
                            { icon: Store, text: 'Multi-Branch Support' },
                            { icon: TrendingUp, text: 'Business Analytics' },
                            { icon: Zap, text: 'WhatsApp Alerts' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                              <Icon className="h-4 w-4 shrink-0" style={{ color: '#1E3A5F' }} />
                              {text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button className="text-white shrink-0 rounded-full px-6" style={{ backgroundColor: '#0EA5E9' }} asChild>
                      <Link to="/upcurv-wash">Explore <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Upcurv Halls */}
            <AnimatedSection delay={0.6}>
              <motion.div
                whileHover={isMobileDevice() ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden md:hover:shadow-xl transition-all duration-300"
                style={{ borderColor: '#eee' }}
              >
                <div className="h-1.5" style={{ background: 'linear-gradient(135deg, #E8A0BF, #C4739E)' }} />
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#E8A0BF20' }}>
                          <Building className="h-5 w-5" style={{ color: '#C4739E' }} />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#1A1A2E' }}>Upcurv Halls</h3>
                          <p className="text-sm font-medium" style={{ color: '#888' }}>Wedding & Event Hall Management</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-5">
                        <div className="space-y-2">
                          {[
                            { icon: Building, text: 'Booking Calendar' },
                            { icon: Tag, text: 'Hall Management' },
                            { icon: Gift, text: 'Catering Packages' },
                            { icon: Users, text: 'Guest Management' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                              <Icon className="h-4 w-4 shrink-0" style={{ color: '#C4739E' }} />
                              {text}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {[
                            { icon: ShieldCheck, text: 'Payment Tracking' },
                            { icon: Store, text: 'Multi-Venue Support' },
                            { icon: TrendingUp, text: 'Revenue Analytics' },
                            { icon: Zap, text: 'WhatsApp Reminders' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                              <Icon className="h-4 w-4 shrink-0" style={{ color: '#4A2040' }} />
                              {text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button className="text-white shrink-0 rounded-full px-6" style={{ backgroundColor: '#C4739E' }} asChild>
                      <Link to="/upcurv-halls">Explore <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Upcurv Labs */}
            <AnimatedSection delay={0.7}>
              <motion.div
                whileHover={isMobileDevice() ? undefined : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden md:hover:shadow-xl transition-all duration-300"
                style={{ borderColor: '#eee' }}
              >
                <div className="h-1.5" style={{ background: 'linear-gradient(135deg, #FFD600, #B8A000)' }} />
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#FFD60020' }}>
                          <Code2 className="h-5 w-5" style={{ color: '#B8A000' }} />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#1A1A2E' }}>Upcurv Labs</h3>
                          <p className="text-sm font-medium" style={{ color: '#888' }}>Custom Systems & SaaS Development</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-5">
                        <div className="space-y-2">
                          {[
                            { icon: Cloud, text: 'Custom Websites' },
                            { icon: Server, text: 'Admin Dashboards' },
                            { icon: ShoppingCart, text: 'SaaS Development' },
                            { icon: Smartphone, text: 'Scalable Architecture' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                              <Icon className="h-4 w-4 shrink-0" style={{ color: '#B8A000' }} />
                              {text}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {[
                            { icon: TrendingUp, text: 'Reports & Analytics' },
                            { icon: Shield, text: 'Enterprise Security' },
                            { icon: Zap, text: 'Fast Delivery' },
                            { icon: Users, text: 'Ongoing Support' },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm" style={{ color: '#555' }}>
                              <Icon className="h-4 w-4 shrink-0" style={{ color: '#FFD600' }} />
                              {text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button className="shrink-0 rounded-full px-6 text-black font-semibold hover:brightness-95" style={{ backgroundColor: '#FFD600' }} asChild>
                      <Link to="/upcurv-labs">Explore <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FRANCHISE */}
      <section id="franchise" className="relative py-24 overflow-hidden" style={{ backgroundColor: '#1A1A2E' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: `${BRAND}15` }} />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: `${BRAND}10` }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border" style={{ color: BRAND, borderColor: `${BRAND}40`, backgroundColor: `${BRAND}10` }}>
              Franchise Program
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
              Own the SaaS Market of <span style={{ color: BRAND }}>Your City</span>
            </h2>
            <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
              India's first city-based SaaS franchise model — control customer acquisition in your city and earn revenue share from all subscriptions.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-14">
            {[
              { icon: MapPin, label: 'Exclusive City Rights' },
              { icon: TrendingUp, label: 'Recurring Revenue' },
              { icon: Cloud, label: 'SaaS-Based Income' },
              { icon: Server, label: 'No Inventory Required' },
              { icon: Shield, label: 'High Scalability' },
            ].map(({ icon: Icon, label }, i) => (
              <AnimatedCard key={label} delay={i * 0.08}>
                <div className="rounded-2xl p-5 text-center border transition-all duration-300 md:hover:border-opacity-30"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <Icon className="h-6 w-6 mx-auto mb-2" style={{ color: BRAND }} />
                  <p className="text-sm font-medium text-white">{label}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <Button size="lg" className="text-white px-10 rounded-full shadow-lg" style={{ backgroundColor: BRAND }} asChild>
              <Link to="/franchise">Apply for City Partnership <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* WHY UPCURV */}
      <section id="why-upcurv" className="py-20" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full" style={{ color: BRAND, backgroundColor: `${BRAND}10` }}>Why Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: '#1A1A2E' }}>Why Upcurv?</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Cloud, title: '100% Cloud Based', desc: 'Access from anywhere, anytime. No installations needed.' },
              { icon: Server, title: 'Scalable Architecture', desc: 'Built to grow with your business from day one.' },
              { icon: Smartphone, title: 'Multi-Device Access', desc: 'Desktop, tablet, and mobile ready interfaces.' },
              { icon: Shield, title: 'Secure Infrastructure', desc: 'Enterprise-grade security for your data.' },
              { icon: MapPin, title: 'Built for India', desc: 'GST-ready, multi-language, local payment support.' },
              { icon: TrendingUp, title: 'Franchise Revenue Model', desc: 'Unique city-based SaaS franchise opportunity.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <AnimatedCard key={title} delay={i * 0.08}>
              <motion.div
                  whileHover={isMobileDevice() ? undefined : { y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-2xl border p-7 h-full transition-all"
                  style={{ borderColor: '#eee' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${BRAND}10` }}>
                    <Icon className="h-6 w-6" style={{ color: BRAND }} />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#1A1A2E' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{desc}</p>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full" style={{ color: BRAND, backgroundColor: `${BRAND}10` }}>Blog</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: '#1A1A2E' }}>From Our Blog</h2>
            <p className="mt-4 text-lg" style={{ color: '#666' }}>Insights, tips, and updates from the Upcurv team</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'How SaaS is Transforming Indian Retail', excerpt: 'Discover how cloud-based solutions are reshaping the retail landscape across tier-2 and tier-3 cities.', date: 'Feb 10, 2026', tag: 'Industry', img: blogRetailSaas },
              { title: 'The Rise of City Franchise Models', excerpt: 'Learn why city-based franchise partnerships are the next big thing in India\'s SaaS ecosystem.', date: 'Feb 5, 2026', tag: 'Business', img: blogFranchiseModel },
              { title: '5 Features Every Car Dealer Needs', excerpt: 'From real-time inventory to public marketplace listings — the must-have tools for modern dealers.', date: 'Jan 28, 2026', tag: 'Product', img: blogCarDealer },
            ].map((post, i) => (
              <AnimatedCard key={post.title} delay={i * 0.1}>
                <Link to="/blogs" className="block bg-white rounded-2xl border overflow-hidden md:hover:shadow-lg transition-all h-full group" style={{ borderColor: '#eee' }}>
                  <div className="h-40 relative overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm" style={{ color: BRAND }}>{post.tag}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs mb-2" style={{ color: '#999' }}>{post.date}</p>
                    <h3 className="font-bold mb-2 md:group-hover:text-[#F9423A] transition-colors" style={{ color: '#1A1A2E' }}>{post.title}</h3>
                    <p className="text-sm" style={{ color: '#666' }}>{post.excerpt}</p>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="rounded-full px-8" style={{ borderColor: BRAND, color: BRAND }} asChild>
              <Link to="/blogs">View All Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <LandingFooter />
      <ChatBot />
    </div>
  );
};

export default Landing;
