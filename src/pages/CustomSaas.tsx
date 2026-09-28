import { ArrowRight, Check, ClipboardList, Gauge, Layers3, RefreshCw } from 'lucide-react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { ChatBot } from '@/components/landing/ChatBot';
import { CustomSaasForm } from '@/components/landing/CustomSaasForm';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { Button } from '@/components/ui/button';
import { publicPricing } from '@/lib/publicSolutions';

const buildTypes = [
  'CRM & Lead Management', 'Inventory Management', 'Billing & Operations',
  'Order Management', 'Employee Management', 'Dealer Management',
  'Property Management', 'Service Management', 'Workflow Automation',
  'Customer Portals', 'Internal Dashboards', 'Industry-specific ERP',
];

const CustomSaas = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead title="Custom Business Software from ₹699 per Month" description="Custom web applications, dashboards and workflow systems designed around how your business operates." path="/custom-saas" />
    <PageViewTracker title="Custom SaaS" />
    <LandingNavbar />
    <main>
      <section className="bg-foreground py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-primary">Custom SaaS</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">Your business is unique. Your software can be too.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-primary-foreground/70">Stop forcing your workflow into generic software. We build web applications, dashboards and business management systems around the way your company actually operates.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild><a href="#discussion">Discuss my workflow <ArrowRight /></a></Button>
              <p className="text-sm font-semibold text-primary-foreground/70">Starting from {publicPricing.customSaas.price}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-primary-foreground/15">
            {[
              ['01', 'Tell us the problem'], ['02', 'We map your workflow'],
              ['03', 'We build the system'], ['04', 'You use it monthly'],
            ].map(([number, label]) => <div key={number} className="bg-foreground p-5 sm:p-7"><p className="font-display text-3xl font-bold text-primary">{number}</p><p className="mt-4 text-sm font-semibold">{label}</p></div>)}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase text-primary">What can we build?</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold sm:text-5xl">A system shaped around the work you already do.</h2>
          <div className="mt-10 grid grid-cols-2 gap-px bg-border md:grid-cols-3 lg:grid-cols-4">{buildTypes.map((item) => <div key={item} className="flex min-h-28 items-end bg-card p-4 text-sm font-semibold sm:p-5"><Check className="mr-2 h-4 w-4 shrink-0 text-primary" />{item}</div>)}</div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div><p className="text-sm font-bold uppercase text-primary">A simpler model</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Custom software without the traditional project headache.</h2><p className="mt-5 leading-7 text-muted-foreground">Instead of a large upfront project followed by costly maintenance, use a continuously maintained system through a monthly subscription. Scope and pricing follow your workflow.</p></div>
          <div className="grid gap-3 sm:grid-cols-4">{[
            [ClipboardList, 'Map', 'Understand the work'], [Layers3, 'Build', 'Shape the system'], [Gauge, 'Launch', 'Put it to work'], [RefreshCw, 'Improve', 'Evolve each month'],
          ].map(([Icon, title, copy], index) => { const StepIcon = Icon as typeof ClipboardList; return <div key={title as string} className="border border-border bg-card p-5"><StepIcon className="h-5 w-5 text-primary" /><p className="mt-7 text-xs font-bold text-muted-foreground">0{index + 1}</p><h3 className="mt-1 font-display text-xl font-bold">{title as string}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{copy as string}</p></div>; })}</div>
        </div>
      </section>

      <section id="discussion" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div><p className="text-sm font-bold uppercase text-primary">Tell us what you’re improving</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Start with your workflow, not a feature list.</h2><p className="mt-4 text-muted-foreground">A few practical details help our team prepare a useful first conversation.</p></div>
          <div className="border border-border bg-card p-5 shadow-sm sm:p-8"><CustomSaasForm /></div>
        </div>
      </section>
    </main>
    <LandingFooter />
    <ChatBot />
  </div>
);

export default CustomSaas;