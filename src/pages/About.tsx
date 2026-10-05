import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { AnimatedSection, AnimatedCard } from '@/components/landing/AnimatedSection';
import { Target, Eye, Users, Zap, MapPin, Calendar, Building2, Rocket, Award, Globe } from 'lucide-react';

const team = [
  { 
    name: 'Gokul Anand', 
    role: 'Founder & CEO', 
    bio: 'Entrepreneur in his early 20s building scalable B2B technology solutions. Founded Upcurv with a vision to create system-driven businesses. Leads product vision, strategy, and long-term company growth with a strong execution-focused approach.' 
  },
  { 
    name: 'Arul Kumar', 
    role: 'Co-Founder', 
    bio: 'Business leader with 15+ years of experience managing multi-crore operations across traditional and emerging sectors. Brings deep expertise in financial structuring, operational scale, and sustainable growth models.' 
  },
  { 
    name: 'Rajesh', 
    role: 'Co-Founder', 
    bio: 'Seasoned entrepreneur with over 10 years of hands-on business leadership, overseeing high-volume operations and multi-crore turnover ventures. Focuses on strategic expansion, partnerships, and market positioning.' 
  }
];

const timeline = [
  { 
    year: 'July 2025', 
    title: 'Eduvanca Introduced', 
    desc: 'Entered the industry with Eduvanca — an edtech platform focused on practical, execution-based learning for students.' 
  },
  { 
    year: 'September 2025', 
    title: 'Company Officially Registered', 
    desc: 'Completed formal company registration and began building structured operations and product roadmap.' 
  },
  { 
    year: 'October 2025', 
    title: 'Startup India Recognition', 
    desc: 'Received official Startup India recognition, validating our innovation-driven vision and structured growth approach.' 
  },
  { 
    year: 'December 2025', 
    title: 'Product Failure & Strategic Pause', 
    desc: 'Faced significant product-market fit challenges. The initial Eduvanca model did not scale as expected, leading to deep analysis and restructuring.' 
  },
  { 
    year: 'January 2026', 
    title: 'Rebranded as Upcurv', 
    desc: 'Renamed the company to Upcurv, signaling a broader vision beyond edtech and preparing for scalable B2B technology solutions.' 
  },
  { 
    year: 'February 2026', 
    title: 'B2B Pivot & Market Capture', 
    desc: 'Shifted focus toward B2B SaaS solutions, rebuilding with stronger fundamentals and initiating structured market acquisition strategies.' 
  }
];

const About = () => (
  <div className="public-site min-h-screen bg-background text-foreground">
      <SEOHead title="About Upcurv Innovations" description="Upcurv Innovations is a Coimbatore-based company building digital products and affordable custom business software for growing Indian businesses." path="/about" />
    <PageViewTracker title="About Us" />
    <LandingNavbar />

    {/* HERO */}
    <section className="border-b border-border bg-secondary py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">About Upcurv</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to power every Indian business with world-class cloud technology — from a single retail shop to a chain of dealerships.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* MISSION & VISION */}
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-md border border-border bg-card p-8 shadow-sm">
              <Target className="mb-4 h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground">To democratize SaaS technology for Indian businesses, making powerful business management tools accessible to every entrepreneur, regardless of size or location. We believe every shopkeeper, dealer, and retailer deserves enterprise-grade software at an affordable price.</p>
            </div>
            <div className="rounded-md border border-border bg-card p-8 shadow-sm">
              <Eye className="mb-4 h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground">To become India's leading SaaS ecosystem — where businesses thrive on cloud platforms and franchise partners drive local growth in every city. By 2028, we aim to serve 10,000+ businesses across 100 cities with our suite of industry-specific platforms.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* VALUES */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Users, title: 'Customer First', desc: 'Every feature we build starts with a real customer problem. We listen, understand, and deliver solutions that make a tangible difference.' },
              { icon: Zap, title: 'Speed & Simplicity', desc: 'We believe great software should be fast to set up, easy to use, and powerful under the hood. No complexity, no clutter.' },
              { icon: MapPin, title: 'Local Impact', desc: 'We build for Indian businesses with local compliance, regional language support, and deep market understanding of tier-2 and tier-3 cities.' },
              { icon: Award, title: 'Transparency', desc: 'Clear pricing, honest communication, and open partnerships — no hidden costs, no surprises, no vendor lock-in.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-md border border-border bg-card p-6">
                <Icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* COMPANY TIMELINE */}
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Our Journey</h2>
          <p className="mt-2 text-muted-foreground">From a small team in Coimbatore to a national SaaS platform</p>
        </AnimatedSection>
        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-primary/20 md:left-1/2" />
          {timeline.map((item, i) => (
            <AnimatedCard key={i} delay={i * 0.08}>
              <div className={`relative flex items-start mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="rounded-md border border-border bg-card p-5 shadow-sm">
                    <span className="text-sm font-bold text-primary">{item.year}</span>
                    <h4 className="font-bold text-foreground mt-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute left-4 z-10 mt-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-card bg-primary md:left-1/2" />
                <div className="ml-10 rounded-md border border-border bg-card p-5 shadow-sm md:hidden">
                  <span className="text-sm font-bold text-primary">{item.year}</span>
                  <h4 className="font-bold text-foreground mt-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
                <div className="hidden md:block w-1/2" />
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* TEAM */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Meet the Team</h2>
          <p className="mt-2 text-muted-foreground">The people building the future of Indian SaaS</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <AnimatedCard key={member.name} delay={i * 0.06}>
              <div className="rounded-md border border-border bg-card p-6 text-center transition-shadow hover:shadow-md">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center border border-primary/20 bg-accent">
                  <span className="text-2xl font-bold text-primary">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* OFFICE */}
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Our Office</h2>
          <p className="mt-2 text-muted-foreground">Where innovation happens every day</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
  { 
    title: 'Registered Office', 
    desc: 'Coimbatore, Tamil Nadu', 
    detail: 'Our official registered headquarters handling compliance, governance, and strategic leadership operations.', 
    icon: Building2 
  },
  { 
    title: 'Remote-First Operations', 
    desc: 'Pan India', 
    detail: 'Upcurv operates as a remote-first SaaS company. Our product, engineering, and growth teams collaborate digitally to build scalable B2B solutions.', 
    icon: Globe 
  },
  { 
    title: 'Market Presence', 
    desc: 'Expanding Across India', 
    detail: 'We work with businesses and partners across multiple cities through structured onboarding, digital systems, and performance-driven execution.', 
    icon: Rocket 
  },
].map((office, i) => (
            <AnimatedCard key={office.title} delay={i * 0.1}>
              <div className="h-full rounded-md border border-border bg-card p-6">
                <office.icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="font-bold text-foreground">{office.title}</h3>
                <p className="text-sm font-medium text-primary">{office.desc}</p>
                <p className="text-sm text-muted-foreground mt-2">{office.detail}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* STATS */}
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '15+', label: 'Active Businesses' },
            { value: '3+', label: 'Cities Covered' },
            { value: '3', label: 'SaaS Products' },
            { value: '10+', label: 'Team Members' },
          ].map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="text-4xl font-black">{stat.value}</div>
              <div className="mt-1 text-sm text-primary-foreground/80">{stat.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <LandingFooter />
    <ChatBot />
  </div>
);

export default About;
