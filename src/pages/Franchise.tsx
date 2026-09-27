import { useState } from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { FranchiseForm } from '@/components/landing/FranchiseForm';
import { AnimatedSection, AnimatedCard } from '@/components/landing/AnimatedSection';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { motion } from 'framer-motion';
import {
  MapPin, TrendingUp, Shield, DollarSign, Users, Building2, CheckCircle2, XCircle,
  ArrowRight, Zap, BarChart3, Globe, Target, Award, Calculator, ChevronRight
} from 'lucide-react';

const comparisonData = [
  { feature: 'Initial Investment', traditional: '₹10L - ₹50L+', saas: '₹50K - ₹2L', saasBetter: true },
  { feature: 'Physical Inventory', traditional: 'Required', saas: 'Not Required', saasBetter: true },
  { feature: 'Staff Required', traditional: '5-20+ employees', saas: '1-3 (self)', saasBetter: true },
  { feature: 'Revenue Model', traditional: 'One-time sales', saas: 'Monthly Recurring', saasBetter: true },
  { feature: 'Location Dependency', traditional: 'Fixed location', saas: 'Work from anywhere', saasBetter: true },
  { feature: 'Scalability', traditional: 'Linear, slow', saas: 'Exponential', saasBetter: true },
  { feature: 'Break-Even Timeline', traditional: '2-4 years', saas: '6-18 months', saasBetter: true },
  { feature: 'Risk Level', traditional: 'Very High', saas: 'Low-Medium', saasBetter: true },
  { feature: 'Territorial Exclusivity', traditional: 'No guarantee', saas: 'Exclusive city rights', saasBetter: true },
  { feature: 'Product Updates', traditional: 'Extra cost', saas: 'Automatic & free', saasBetter: true },
];

const benefits = [
  { icon: MapPin, title: 'Exclusive City Rights', desc: 'Own the SaaS market of your city. No competition from other Upcurv franchisees in your territory.', color: 'bg-red-500/10 text-red-500' },
  { icon: TrendingUp, title: 'Recurring Revenue', desc: 'Earn a percentage of every subscription renewed in your city — month after month, year after year.', color: 'bg-green-500/10 text-green-500' },
  { icon: Shield, title: 'Zero Product Risk', desc: 'Products are already built, tested, and deployed. You focus on sales and customer relationships.', color: 'bg-blue-500/10 text-blue-500' },
  { icon: DollarSign, title: 'Multiple Revenue Streams', desc: 'Earn from Vahanhub, Upcurv Ecom, and Upcurv Retail subscriptions in your assigned city.', color: 'bg-yellow-500/10 text-yellow-500' },
  { icon: Users, title: 'Training & Support', desc: 'Complete onboarding, product training, and ongoing business support from Upcurv HQ.', color: 'bg-purple-500/10 text-purple-500' },
  { icon: Globe, title: 'Cloud-Powered Operations', desc: 'Manage your entire franchise from any device, anywhere. No office or warehouse needed.', color: 'bg-sky-500/10 text-sky-500' },
];

const marketStats = [
  { value: '63M+', label: 'SMBs in India', sub: 'Potential customers' },
  { value: '₹1.5L Cr', label: 'SaaS Market by 2027', sub: 'India market size' },
  { value: '35%', label: 'Annual Growth Rate', sub: 'Indian SaaS CAGR' },
  { value: '500+', label: 'Cities Untapped', sub: 'Franchise opportunities' },
];

const steps = [
  { step: '01', title: 'Apply Online', desc: 'Fill the franchise application form. Our team reviews within 48 hours.' },
  { step: '02', title: 'Discovery Call', desc: 'Speak with our partnership team to understand city potential and expectations.' },
  { step: '03', title: 'Agreement & Onboarding', desc: 'Sign the franchise agreement and complete product training (3-5 days).' },
  { step: '04', title: 'Launch & Earn', desc: 'Start acquiring customers in your city and earn revenue share from day one.' },
];

export default function Franchise() {
  const [customers, setCustomers] = useState(20);
  const [avgPlan, setAvgPlan] = useState(2000);
  const [revenueShare, setRevenueShare] = useState(25);

  const monthlyRevenue = Math.round(customers * avgPlan * (revenueShare / 100));
  const annualRevenue = monthlyRevenue * 12;

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title="Franchise Partnership" description="Own the SaaS market of your city with Upcurv's exclusive franchise model. Low investment, recurring revenue, no inventory." path="/franchise" />
      <PageViewTracker title="Franchise" />
      <LandingNavbar />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-foreground via-foreground to-[#F9423A]/20 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F9423A] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#F9423A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-[#F9423A]/20 text-[#F9423A] border border-[#F9423A]/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="h-4 w-4" /> India's First SaaS City Franchise Model
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Own the SaaS Market of <span className="text-[#F9423A]">Your City</span>
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-xl">
                Become an Upcurv City Partner and earn recurring monthly revenue from every SaaS subscription in your exclusive territory — no inventory, no office, no product risk.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#apply" className="inline-flex items-center gap-2 bg-[#F9423A] hover:bg-[#e03830] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#calculator" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Calculate Revenue <Calculator className="h-4 w-4" />
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, title: 'Exclusive Territory', desc: 'Your city, your market' },
                  { icon: TrendingUp, title: 'Monthly Recurring', desc: 'Revenue every month' },
                  { icon: Zap, title: 'Quick Launch', desc: 'Start in 2 weeks' },
                  { icon: Shield, title: 'Zero Inventory', desc: 'No stock needed' },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <AnimatedCard key={title} delay={i * 0.1}>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:hover:bg-white/10 transition-colors">
                      <Icon className="h-8 w-8 text-[#F9423A] mb-3" />
                      <p className="font-semibold text-white">{title}</p>
                      <p className="text-sm text-white/60 mt-1">{desc}</p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* MARKET OPPORTUNITY */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">The Market Opportunity</h2>
            <p className="mt-4 text-muted-foreground text-lg">India's SMB SaaS market is exploding — be the first in your city</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {marketStats.map((stat, i) => (
              <AnimatedCard key={stat.label} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-border p-6 text-center shadow-sm md:hover:shadow-md transition-shadow">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F9423A] mb-1">{stat.value}</div>
                  <div className="font-semibold text-foreground text-sm">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">India's SaaS Adoption by Sector</h3>
              <div className="space-y-4">
                {[
                  { sector: 'Automobile Dealers', pct: 12, color: 'bg-blue-500' },
                  { sector: 'Retail & Grocery', pct: 22, color: 'bg-sky-500' },
                  { sector: 'E-Commerce', pct: 38, color: 'bg-yellow-500' },
                  { sector: 'Restaurants & Food', pct: 45, color: 'bg-orange-500' },
                  { sector: 'Healthcare', pct: 28, color: 'bg-green-500' },
                ].map((item, i) => (
                  <div key={item.sector}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{item.sector}</span>
                      <span className="text-muted-foreground">{item.pct}% penetration</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full ${item.color} rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">Low SaaS penetration = massive opportunity for early movers</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* REVENUE CALCULATOR */}
      <section id="calculator" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Revenue Calculator</h2>
            <p className="mt-4 text-muted-foreground text-lg">Estimate your monthly earnings as an Upcurv City Partner</p>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <AnimatedSection>
              <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-6">Adjust the sliders</h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">Active Customers in Your City</label>
                      <span className="text-sm font-bold text-[#F9423A]">{customers}</span>
                    </div>
                    <input type="range" min={5} max={200} value={customers} onChange={e => setCustomers(+e.target.value)}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-[#F9423A]" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>5</span><span>200</span></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">Avg. Subscription Value (₹/month)</label>
                      <span className="text-sm font-bold text-[#F9423A]">₹{avgPlan.toLocaleString()}</span>
                    </div>
                    <input type="range" min={500} max={10000} step={500} value={avgPlan} onChange={e => setAvgPlan(+e.target.value)}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-[#F9423A]" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₹500</span><span>₹10,000</span></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">Your Revenue Share (%)</label>
                      <span className="text-sm font-bold text-[#F9423A]">{revenueShare}%</span>
                    </div>
                    <input type="range" min={15} max={40} value={revenueShare} onChange={e => setRevenueShare(+e.target.value)}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-[#F9423A]" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>15%</span><span>40%</span></div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[#F9423A] to-[#c0312a] rounded-2xl p-8 text-white text-center shadow-xl">
                  <p className="text-white/70 text-sm font-medium uppercase tracking-wide mb-2">Monthly Recurring Revenue</p>
                  <div className="text-5xl font-bold mb-1">₹{monthlyRevenue.toLocaleString()}</div>
                  <p className="text-white/70 text-sm">per month</p>
                </div>
                <div className="bg-foreground rounded-2xl p-6 text-white text-center">
                  <p className="text-white/60 text-sm mb-1">Annual Revenue Potential</p>
                  <div className="text-3xl font-bold text-[#F9423A]">₹{annualRevenue.toLocaleString()}</div>
                  <p className="text-white/60 text-sm mt-1">per year</p>
                </div>
                <div className="bg-white rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground text-center">
                    * Estimates based on inputs. Actual revenue depends on customer acquisition, plan mix, and churn. Revenue share % is determined by partnership tier.
                  </p>
                </div>
                <a href="#apply" className="block w-full bg-[#F9423A] hover:bg-[#e03830] text-white text-center py-3 rounded-xl font-semibold transition-colors">
                  Apply for City Partnership <ArrowRight className="inline h-4 w-4 ml-1" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Traditional Business vs SaaS Franchise</h2>
            <p className="mt-4 text-muted-foreground text-lg">See why the smart money is moving to SaaS franchises</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 bg-foreground text-white">
                <div className="p-4 font-semibold text-sm">Feature</div>
                <div className="p-4 font-semibold text-sm text-center border-x border-white/10">Traditional Business</div>
                <div className="p-4 font-semibold text-sm text-center text-[#F9423A]">Upcurv SaaS Franchise</div>
              </div>
              {comparisonData.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-3 border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}`}>
                  <div className="p-4 text-sm font-medium text-foreground">{row.feature}</div>
                  <div className="p-4 text-sm text-center text-muted-foreground border-x border-border flex items-center justify-center gap-2">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" /> {row.traditional}
                  </div>
                  <div className="p-4 text-sm text-center font-medium text-green-600 flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> {row.saas}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Why Partner with Upcurv?</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc, color }, i) => (
              <AnimatedCard key={title} delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-border p-6 md:hover:shadow-md transition-shadow h-full">
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How It Works</h2>
            <p className="mt-4 text-muted-foreground text-lg">Get started in 4 simple steps</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedCard key={step.step} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-border p-6 relative overflow-hidden h-full">
                  <div className="text-5xl font-black text-muted/30 absolute top-3 right-4">{step.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-[#F9423A]/10 flex items-center justify-center mb-4">
                    <ChevronRight className="h-5 w-5 text-[#F9423A]" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY FORM */}
      <section id="apply" className="py-20 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#F9423A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Apply for City Partnership</h2>
            <p className="mt-4 text-white/60 text-lg">Limited slots available per city. Apply now to secure your territory.</p>
          </AnimatedSection>
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8 max-w-2xl mx-auto">
            <FranchiseForm />
          </div>
        </div>
      </section>

      <LandingFooter />
      <ChatBot />
    </div>
  );
}
