import { useState } from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { Link } from 'react-router-dom';
import { AnimatedSection, AnimatedCard } from '@/components/landing/AnimatedSection';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import {
  CheckCircle2, ChevronRight, Star, QrCode, Receipt, Wallet, ShieldCheck,
  MapPin, Zap, Gift, Tag, Utensils, Scissors, Store, Dribbble, MoreHorizontal,
  ArrowRight, TrendingUp, BadgePercent, Smartphone, CreditCard, Loader2
} from 'lucide-react';
import primeHero from '@/assets/prime-hero.png';
import { UpcurvLogo } from '@/components/landing/UpcurvLogo';
import { toast } from 'sonner';

const BRAND = '#F9423A';

const highlights = [
  { icon: Tag, title: 'Instant Discounts', desc: 'No coupons needed', bg: '#FEE2E2', iconColor: BRAND },
  { icon: Gift, title: 'Cashback Rewards', desc: 'Earn on every payment', bg: '#DCFCE7', iconColor: '#16A34A' },
  { icon: MapPin, title: 'Nearby Stores', desc: 'Use it where you go', bg: '#DBEAFE', iconColor: '#2563EB' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'UPI powered, 100% safe', bg: '#FEF3C7', iconColor: '#D97706' },
];

const howItWorks = [
  { icon: QrCode, title: 'Scan QR', desc: 'at any partner store', color: '#1A1A2E' },
  { icon: Receipt, title: 'Enter Bill', desc: 'amount', color: '#3B82F6' },
  { icon: BadgePercent, title: 'See Savings', desc: 'instantly', color: '#16A34A' },
  { icon: ShieldCheck, title: 'Pay Securely', desc: 'via UPI', color: '#D97706' },
  { icon: Gift, title: 'Get Cashback', desc: 'for next time', color: BRAND },
];

const categories = [
  { icon: Utensils, label: 'Restaurants' },
  { icon: Scissors, label: 'Salons' },
  { icon: Store, label: 'Retail Stores' },
  { icon: Dribbble, label: 'Turfs' },
  { icon: MoreHorizontal, label: 'More' },
];

const trustPoints = [
  { icon: ShieldCheck, title: 'Secure UPI Payments', desc: 'Bank-level security', color: BRAND },
  { icon: CheckCircle2, title: 'No Hidden Charges', desc: 'What you see is what you pay', color: '#16A34A' },
  { icon: Zap, title: 'Instant Confirmations', desc: 'Always, in real time', color: '#3B82F6' },
];

const stats = [
  { value: '100K+', label: 'Users Saving Smarter' },
  { value: '500+', label: 'Partner Stores' },
  { value: '₹10L+', label: 'Cashback Given' },
  { value: '99.9%', label: 'Uptime' },
];

const offers = [
  { name: 'Cafe Delight', tag: '20% OFF', tagColor: BRAND, desc: 'Up to ₹100 off', distance: '0.3 km away' },
  { name: 'Style Studio', tag: '₹50 OFF', tagColor: '#3B82F6', desc: 'on bills above ₹300', distance: '0.5 km away' },
  { name: 'Mart Fresh', tag: '₹100 CASHBACK', tagColor: '#22C55E', desc: 'on bills above ₹500', distance: '0.7 km away' },
];

const WALLET_API = 'https://juauddaapjoflyzwksqe.supabase.co/functions/v1/get-wallet-link';
const WALLET_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1YXVkZGFhcGpvZmx5endrc3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTYxNDEsImV4cCI6MjA1ODQ3MjE0MX0.JDKiStjXq14evR0ZYJfesVHGIUqz3JMvkfg0aOCMYuQ';

const UpcurvPrime = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [walletResult, setWalletResult] = useState<{ wallet_url: string; status: string } | null>(null);

  const handleGetWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(WALLET_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': WALLET_ANON_KEY },
        body: JSON.stringify({ phone, name: name.trim() }),
      });
      const data = await res.json();
      if (data.wallet_url) {
        setWalletResult(data);
        toast.success(data.status === 'new' ? 'Wallet created! Welcome aboard 🎉' : 'Welcome back! Here\'s your wallet 💰');
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch {
      toast.error('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Upcurv Prime - Smarter Payments, Real Savings"
        description="Scan a QR, unlock instant discounts, pay easily, and earn cashback for your next visit. Upcurv Prime — smarter payments for everyday shopping."
        path="/upcurv-prime"
      />
      <PageViewTracker title="Upcurv Prime" />
      <LandingNavbar logoColor={BRAND} />

      {/* HERO */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20" style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border" style={{ color: BRAND, borderColor: `${BRAND}40`, backgroundColor: `${BRAND}08` }}>
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill={BRAND} /> Smarter Payments. Real Savings.
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight" style={{ color: '#1A1A2E' }}>
                Pay Less.<br />
                <span style={{ color: BRAND }}>Every Time</span> You Shop.
              </h1>
              <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed" style={{ color: '#555' }}>
                Scan a QR, unlock instant discounts, pay easily, and earn cashback for your next visit.
              </p>

              {/* Get Wallet Form */}
              {!walletResult ? (
                <form onSubmit={handleGetWallet} className="mt-6 sm:mt-8 space-y-3 max-w-md">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#ddd' }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: '#ddd' }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center disabled:opacity-60"
                    style={{ backgroundColor: '#1A1A2E' }}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
                    {loading ? 'Getting Wallet...' : 'Get Wallet'}
                  </button>
                </form>
              ) : (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl border max-w-md" style={{ borderColor: '#dcfce7', backgroundColor: '#f0fdf4' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dcfce7' }}>
                      <CheckCircle2 className="h-5 w-5" style={{ color: '#16a34a' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#1A1A2E' }}>
                        {walletResult.status === 'new' ? 'Wallet Created!' : 'Welcome Back!'}
                      </p>
                      <p className="text-xs" style={{ color: '#888' }}>Your wallet is ready to use</p>
                    </div>
                  </div>
                  <a
                    href={walletResult.wallet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all w-full justify-center"
                    style={{ backgroundColor: BRAND }}
                  >
                    Open My Wallet <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )}

              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'].map((bg, i) => (
                    <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center`}>
                      <span className="text-white text-[9px] sm:text-[10px] font-bold">{String.fromCharCode(65 + i)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm" style={{ color: '#888' }}>100K+ users saving smarter every day</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="relative hidden sm:block">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute -top-6 -right-6 w-[70%] h-[60%] rounded-3xl" style={{ backgroundColor: BRAND, zIndex: 0 }} />
                <img src={primeHero} alt="Upcurv Prime - Smart Payments" className="w-full drop-shadow-2xl relative z-10 rounded-2xl" />
                
                {/* Floating cards */}
                <div className="absolute -top-2 right-16 bg-white rounded-xl shadow-lg border p-2.5 z-20 animate-bounce-slow" style={{ borderColor: '#eee' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dcfce7' }}>
                      <CheckCircle2 className="h-3.5 w-3.5" style={{ color: '#16a34a' }} />
                    </div>
                    <div>
                      <p className="text-[9px]" style={{ color: '#888' }}>Instant Savings</p>
                      <p className="text-xs font-bold" style={{ color: BRAND }}>₹80</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 -left-4 bg-white rounded-xl shadow-lg border p-2.5 z-20" style={{ borderColor: '#eee' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${BRAND}15` }}>
                      <Wallet className="h-3.5 w-3.5" style={{ color: BRAND }} />
                    </div>
                    <div>
                      <p className="text-[9px]" style={{ color: '#888' }}>Total Savings</p>
                      <p className="text-xs font-bold" style={{ color: '#1A1A2E' }}>₹2,450</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS BAR */}
      <section className="py-4 sm:py-8 border-y" style={{ borderColor: '#f0f0f0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {highlights.map((h, i) => (
              <AnimatedSection key={h.title} delay={i * 0.1}>
                <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 rounded-xl bg-white border" style={{ borderColor: '#f5f5f5' }}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: h.bg }}>
                    <h.icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: h.iconColor }} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold" style={{ color: '#1A1A2E' }}>{h.title}</p>
                    <p className="text-[10px] sm:text-xs" style={{ color: '#888' }}>{h.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-12 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8 sm:mb-14">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold" style={{ color: '#1A1A2E' }}>How It Works</h2>
            <p className="mt-2 text-xs sm:text-base" style={{ color: '#888' }}>5 simple steps to smarter payments</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {howItWorks.map((step, i) => (
              <AnimatedCard key={step.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border p-4 sm:p-6 text-center h-full relative" style={{ borderColor: '#eee' }}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3" style={{ backgroundColor: `${step.color}10` }}>
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: step.color }} />
                  </div>
                  <h3 className="font-bold text-xs sm:text-base" style={{ color: '#1A1A2E' }}>{step.title}</h3>
                  <p className="text-[10px] sm:text-xs mt-1" style={{ color: '#888' }}>{step.desc}</p>
                  {i < howItWorks.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS + CATEGORIES */}
      <section className="py-12 sm:py-24" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
            <AnimatedSection>
              <div className="bg-white rounded-2xl border p-4 sm:p-8 h-full" style={{ borderColor: '#eee' }}>
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold" style={{ color: '#1A1A2E' }}>Today's Top Offers</h3>
                    <p className="text-[10px] sm:text-xs mt-1" style={{ color: '#888' }}>Explore exciting deals near you</p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {offers.map((offer) => (
                    <div key={offer.name} className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl border" style={{ borderColor: '#f0f0f0' }}>
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FFF8F0' }}>
                        <Store className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: BRAND }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded text-white" style={{ backgroundColor: offer.tagColor }}>{offer.tag}</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold truncate" style={{ color: '#1A1A2E' }}>{offer.name}</p>
                        <p className="text-[10px] sm:text-xs" style={{ color: '#888' }}>{offer.desc} · {offer.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl border p-4 sm:p-8 h-full" style={{ borderColor: '#eee' }}>
                <div className="mb-4 sm:mb-5">
                  <h3 className="text-lg sm:text-xl font-bold" style={{ color: '#1A1A2E' }}>Use It Anywhere Near You</h3>
                  <p className="text-[10px] sm:text-xs mt-1" style={{ color: '#888' }}>From cafes to salons, save everywhere</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  {categories.map((cat) => (
                    <div key={cat.label} className="flex flex-col items-center gap-1.5 sm:gap-2">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#FFF8F0' }}>
                        <cat.icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: BRAND }} />
                      </div>
                      <p className="text-[10px] sm:text-xs font-medium text-center" style={{ color: '#555' }}>{cat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                  {stats.slice(0, 2).map((s) => (
                    <div key={s.label} className="p-3 sm:p-4 rounded-xl text-center" style={{ backgroundColor: '#FFF8F0' }}>
                      <p className="text-xl sm:text-2xl font-bold" style={{ color: BRAND }}>{s.value}</p>
                      <p className="text-[10px] sm:text-xs mt-1" style={{ color: '#888' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TRUST POINTS */}
      <section className="py-8 sm:py-12 border-y bg-white" style={{ borderColor: '#f0f0f0' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {trustPoints.map((t, i) => (
              <AnimatedSection key={t.title} delay={i * 0.1}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${t.color}15` }}>
                    <t.icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: t.color }} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold" style={{ color: '#1A1A2E' }}>{t.title}</p>
                    <p className="text-[10px] sm:text-xs" style={{ color: '#888' }}>{t.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-10 sm:py-20" style={{ backgroundColor: BRAND }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <AnimatedSection>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Stop paying full price.<br />Start saving today.
              </h2>
              <p className="mt-2 sm:mt-3 text-white/80 text-xs sm:text-base">
                Join 100K+ users who save smarter with every payment.
              </p>
              <div className="mt-4 sm:mt-6">
                <a href="#top" className="inline-flex items-center gap-2 bg-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors hover:bg-gray-50 text-sm sm:text-base" style={{ color: BRAND }}>
                  Get Your Wallet <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="hidden lg:flex justify-end">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-xs">
                <div className="flex items-center gap-2 mb-3">
                  <UpcurvLogo size={28} color={BRAND} />
                  <span className="text-xl font-bold text-white">upcurv</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded text-white" style={{ backgroundColor: BRAND }}>prime</span>
                </div>
                <p className="text-white/90 text-sm font-medium">Smarter Payments<br />Better Savings</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
                <div className="text-2xl sm:text-4xl font-black" style={{ color: BRAND }}>{s.value}</div>
                <div className="text-[10px] sm:text-sm mt-1 font-medium" style={{ color: '#888' }}>{s.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Prime-specific footer */}
      <footer className="bg-foreground text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <UpcurvLogo size={32} color={BRAND} />
              <span className="text-lg font-bold">Upcurv</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded text-white" style={{ backgroundColor: BRAND }}>prime</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/upcurv-prime/privacy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/upcurv-prime/terms" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>
              <a href="/upcurv-prime/data-deletion" className="text-white/70 hover:text-white transition-colors">Data Deletion</a>
            </div>
            <div className="text-white/40 text-xs">
              © {new Date().getFullYear()} Upcurv Innovations Pvt. Ltd.
            </div>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

export default UpcurvPrime;
