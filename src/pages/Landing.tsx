import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, CircleCheck,
  ClipboardList, Gauge, Layers3, MoveRight, RefreshCw, Settings2, Sparkles,
} from 'lucide-react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { ChatBot } from '@/components/landing/ChatBot';
import { CustomSaasPopup } from '@/components/landing/CustomSaasPopup';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { Button } from '@/components/ui/button';
import { publicSolutions } from '@/lib/publicSolutions';
import { cn } from '@/lib/utils';

const productSolutions = publicSolutions.slice(0, 4);

const buildTypes = [
  'CRM & Lead Management', 'Inventory Management', 'Billing & Operations',
  'Order Management', 'Employee Management', 'Dealer Management',
  'Property Management', 'Service Management', 'Workflow Automation',
  'Customer Portals', 'Internal Dashboards', 'Industry-specific ERP',
];

const businessTypes = ['Retail', 'Manufacturing', 'Services', 'Real Estate', 'Automotive', 'Education', 'Other'];

const recommendations: Record<string, { title: string; copy: string; href: string; action: string }> = {
  Retail: { title: 'Start with Upcurv Trade', copy: 'Bring stock, orders and everyday operations into one clearer workflow.', href: 'https://upcurvtrade.upcurv.in', action: 'Request a demo' },
  Manufacturing: { title: 'Build a custom operations system', copy: 'Map production, inventory, approvals and reporting around your actual process.', href: '/custom-saas#discussion', action: 'Discuss my workflow' },
  Services: { title: 'Build a custom service platform', copy: 'Connect leads, jobs, teams, customers and billing without stitching together generic tools.', href: '/custom-saas#discussion', action: 'Discuss my workflow' },
  'Real Estate': { title: 'Build a property workflow', copy: 'Create one tailored system for leads, properties, visits, documents and follow-ups.', href: '/custom-saas#discussion', action: 'Discuss my workflow' },
  Automotive: { title: 'Explore UpcurvHub', copy: 'List vehicles, connect with buyers and sellers, and grow your vehicle business.', href: 'https://upcurvhub.upcurv.in', action: 'Explore vehicles' },
  Education: { title: 'Build a custom education system', copy: 'Shape admissions, learners, staff, payments and reporting around your institution.', href: '/custom-saas#discussion', action: 'Discuss my workflow' },
  Other: { title: 'Let’s map your workflow', copy: 'Tell us what you manage manually and we’ll identify the right product or custom system.', href: '/custom-saas#discussion', action: 'Talk to an expert' },
};

const toneClasses: Record<string, string> = {
  hub: 'text-solution-hub bg-solution-hub/10 border-solution-hub/20',
  prints: 'text-solution-prints bg-solution-prints/10 border-solution-prints/20',
  trade: 'text-solution-trade bg-solution-trade/10 border-solution-trade/20',
  saas: 'text-solution-saas bg-solution-saas/10 border-solution-saas/20',
  halls: 'text-solution-halls bg-solution-halls/10 border-solution-halls/20',
};

const Landing = () => {
  const reduceMotion = useReducedMotion();
  const [businessType, setBusinessType] = useState('Retail');
  const recommendation = useMemo(() => recommendations[businessType], [businessType]);
  const HallIcon = publicSolutions[4].icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Business Software Built Around How You Work" description="Upcurv builds digital products and custom business software that help growing businesses simplify operations, reach customers and move faster." path="/" />
      <PageViewTracker title="Home" />
      <LandingNavbar />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:min-h-[720px] md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="mb-6 inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 text-xs font-bold uppercase text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Built for real business workflows
              </div>
              <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-6xl xl:text-7xl">
                Less chasing, more growing. <span className="text-primary">Tools that keep your business moving.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                From ready-to-use products to custom business systems, Upcurv helps businesses simplify operations, reduce manual work and move faster.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild><a href="#products">Explore our products <ArrowDown /></a></Button>
                <Button size="lg" variant="outline" asChild><a href="#custom-saas">Build custom software <ArrowRight /></a></Button>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground"><CircleCheck className="h-4 w-4 text-success" /> Built for growing businesses. Designed around real workflows.</p>
            </motion.div>

            <motion.div initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="relative">
              <div className="border border-border bg-card p-3 shadow-xl sm:p-5">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div><p className="font-display text-xl font-bold">Upcurv</p><p className="text-xs text-muted-foreground">One ecosystem. Different business paths.</p></div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-success"><span className="h-2 w-2 rounded-full bg-success" /> Systems active</div>
                </div>
                <div className="grid grid-cols-2 gap-3 py-4">
                  {productSolutions.map((solution, index) => (
                    <motion.a key={solution.key} href={solution.href} animate={reduceMotion ? undefined : { y: [0, index % 2 ? -3 : 3, 0] }} transition={{ duration: 4 + index, repeat: Infinity }} className="group border border-border bg-background p-3 transition-colors hover:bg-muted/50">
                      <div className="flex items-center gap-2"><span className={cn('flex h-8 w-8 items-center justify-center border', toneClasses[solution.tone])}><solution.icon className="h-4 w-4" /></span><span className="text-sm font-bold">{solution.name}</span></div>
                      <div className="mt-4 flex items-center gap-1 overflow-hidden">
                        {solution.workflow.map((step, stepIndex) => <div key={step} className="contents"><span className="truncate border border-border bg-card px-2 py-1 text-[9px] font-semibold text-muted-foreground">{step}</span>{stepIndex < 2 ? <ChevronRight className="h-3 w-3 shrink-0 text-primary" /> : null}</div>)}
                      </div>
                    </motion.a>
                  ))}
                </div>
                <a href="/custom-saas#discussion" className="flex items-center justify-between border border-solution-saas/25 bg-solution-saas/10 p-4 text-solution-saas">
                  <div className="flex items-center gap-3"><Settings2 className="h-5 w-5" /><div><p className="text-sm font-bold">Custom SaaS</p><p className="text-xs opacity-80">Your workflow becomes the product</p></div></div><ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="products" className="scroll-mt-20 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl"><p className="text-sm font-bold uppercase text-primary">Built by Upcurv</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Our Products</h2><p className="mt-4 text-muted-foreground">Digital products built for real businesses — pick the one that fits your work.</p></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {productSolutions.map((solution) => (
                <a key={solution.key} href={solution.href} className="group border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-7">
                  <div className="flex items-start justify-between gap-4"><div className={cn('flex h-11 w-11 items-center justify-center border', toneClasses[solution.tone])}><solution.icon /></div><ArrowUpRight className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                  <p className="mt-6 text-sm font-bold text-muted-foreground">{solution.prompt}</p><h3 className="mt-1 font-display text-2xl font-bold">{solution.name}</h3><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{solution.description}</p><p className="mt-6 text-sm font-bold text-primary">{solution.action} →</p>
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-col justify-between gap-5 border border-solution-halls/25 bg-solution-halls/10 p-5 sm:flex-row sm:items-center sm:p-7">
              <div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center border border-solution-halls/20 bg-card text-solution-halls"><HallIcon /></div><div><p className="font-display text-xl font-bold">Already run a hall or event venue?</p><p className="mt-1 text-sm text-muted-foreground">Upcurv Halls brings bookings, payments and event coordination together.</p></div></div>
              <Button variant="outline" asChild><Link to="/upcurv-halls">Explore Upcurv Halls <ArrowRight /></Link></Button>
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20 border-b border-border py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div><p className="text-sm font-bold uppercase text-primary">A simpler model</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Custom software without the traditional project headache.</h2><p className="mt-5 leading-7 text-muted-foreground">Instead of a large upfront build followed by costly maintenance, use a continuously maintained system through a monthly subscription. Scope and pricing follow your workflow.</p></div>
              <div className="grid gap-3 sm:grid-cols-4">{[
                [ClipboardList, 'Map', 'Understand the work'], [Layers3, 'Build', 'Shape the system'], [Gauge, 'Launch', 'Put it to work'], [RefreshCw, 'Improve', 'Evolve each month'],
              ].map(([Icon, title, copy], index) => { const StepIcon = Icon as typeof ClipboardList; return <div key={title as string} className="border border-border bg-card p-5"><StepIcon className="h-5 w-5 text-primary" /><p className="mt-7 text-xs font-bold text-muted-foreground">0{index + 1}</p><h3 className="mt-1 font-display text-xl font-bold">{title as string}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{copy as string}</p></div>; })}</div>
            </div>
          </div>
        </section>

        <section id="solutions" className="scroll-mt-20 bg-secondary py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
            <div><p className="text-sm font-bold uppercase text-primary">Find your solution</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">What type of business do you operate?</h2><p className="mt-4 text-muted-foreground">Choose the closest match for a useful starting point.</p></div>
            <div><div className="flex flex-wrap gap-2">{businessTypes.map((type) => <Button key={type} variant={businessType === type ? 'default' : 'outline'} onClick={() => setBusinessType(type)}>{type}</Button>)}</div><motion.div key={businessType} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 border border-border bg-card p-6 sm:p-8"><p className="text-xs font-bold uppercase text-primary">Recommended next step</p><h3 className="mt-3 font-display text-2xl font-bold">{recommendation.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{recommendation.copy}</p><Button className="mt-6" asChild><a href={recommendation.href}>{recommendation.action} <ArrowRight /></a></Button></motion.div></div>
          </div>
        </section>


        <section id="resources" className="scroll-mt-20 border-t border-border py-14">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"><div><p className="text-sm font-bold uppercase text-primary">Resources</p><h2 className="mt-2 font-display text-2xl font-bold">Practical thinking for growing businesses.</h2><p className="mt-2 text-sm text-muted-foreground">Workflow guides and useful business software insights are coming soon.</p></div><Button variant="outline" asChild><a href="tel:+918807858256">Ask our team <ArrowRight /></a></Button></div>
        </section>
      </main>

      <LandingFooter />
      <ChatBot />
      <CustomSaasPopup />
    </div>
  );
};

export default Landing;