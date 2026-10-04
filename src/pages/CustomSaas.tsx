import { ArrowRight, Check, ClipboardList, Gauge, Layers3, RefreshCw } from 'lucide-react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { ChatBot } from '@/components/landing/ChatBot';
import { BeforeAfterWorkflow } from '@/components/landing/BeforeAfterWorkflow';
import { CustomSaasForm } from '@/components/landing/CustomSaasForm';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { publicPricing } from '@/lib/publicSolutions';
import { useCasePages } from '@/lib/useCasePages';

const faqs = [
  ['How much does custom software cost in India with Upcurv?', 'Our custom SaaS plans start from ₹699/month. The final monthly price depends on the modules, users and integrations your workflow needs, and we share it before we start.'],
  ['Do I have to pay a large upfront development fee?', 'No. Instead of a large one-time project fee, you use a continuously maintained system through a monthly subscription.'],
  ['What kind of software can you build?', 'CRM, inventory, billing, order management, employee management, property management, customer portals, internal dashboards and industry-specific ERP systems.'],
  ['Is this suitable for small businesses?', 'Yes. The monthly model is designed for small and growing businesses that have outgrown WhatsApp, Excel or paper but cannot justify an expensive agency project.'],
  ['Who maintains the software after launch?', 'We do. Hosting, fixes and ongoing improvements are part of the subscription.'],
  ['Can the software grow with my business?', 'Yes. We keep improving the system each month as your workflow changes.'],
  ['How is custom software different from off-the-shelf software?', 'Off-the-shelf tools make you adapt your process to them. Custom software is shaped around how your team already works, so there is less workaround and less wasted data entry.'],
  ['How do we get started?', 'Fill the short form on this page. Our team will contact you to understand your workflow and suggest the right setup.'],
];

const included = ['Workflow mapping with our team', 'Web app usable on mobile and desktop', 'Secure hosting and data backups', 'User logins and role-based access', 'Ongoing fixes and maintenance', 'Monthly improvements as you grow'];

const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'Service', name: 'Custom SaaS Development', serviceType: 'Custom software development', areaServed: 'IN', provider: { '@type': 'Organization', name: 'Upcurv Innovations', url: 'https://upcurv.in' }, offers: { '@type': 'Offer', priceCurrency: 'INR', price: '699', priceSpecification: { '@type': 'UnitPriceSpecification', price: '699', priceCurrency: 'INR', unitText: 'MONTH' } } },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
];

const buildTypes = [
  'CRM & Lead Management', 'Inventory Management', 'Billing & Operations',
  'Order Management', 'Employee Management', 'Dealer Management',
  'Property Management', 'Service Management', 'Workflow Automation',
  'Customer Portals', 'Internal Dashboards', 'Industry-specific ERP',
];

const CustomSaas = () => (
  <div className="public-site min-h-screen bg-background text-foreground">
    <SEOHead title="Affordable Custom Software Development in India – From ₹699/Month" description="Affordable custom software and SaaS development for small businesses in India. CRM, inventory, billing and ERP built around your workflow on a monthly subscription from ₹699/month — no big upfront cost." path="/custom-saas" jsonLd={jsonLd} />
    <PageViewTracker title="Custom SaaS" />
    <LandingNavbar />
    <main>
      <section className="border-b border-border bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-primary">Custom SaaS</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">Affordable Custom Software &amp; SaaS Development in India – From ₹699/Month</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">Your business is unique — your software can be too. Stop forcing your workflow into generic software. We build web applications, dashboards and business management systems around the way your company actually operates.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild><a href="#discussion">Discuss my workflow <ArrowRight /></a></Button>
              <p className="text-sm font-semibold text-muted-foreground">Starting from {publicPricing.customSaas.price}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px border border-border bg-border shadow-sm">
            {[
              ['01', 'Tell us the problem'], ['02', 'We map your workflow'],
              ['03', 'We build the system'], ['04', 'You use it monthly'],
            ].map(([number, label]) => <div key={number} className="min-h-32 bg-card p-5 sm:p-7"><p className="font-display text-3xl font-bold text-primary">{number}</p><p className="mt-4 text-sm font-semibold text-foreground">{label}</p></div>)}
          </div>
        </div>
      </section>

      <BeforeAfterWorkflow />

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

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div><p className="text-sm font-bold uppercase text-primary">What's included from {publicPricing.customSaas.price}</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Low-cost custom software on a monthly subscription</h2><ul className="mt-6 space-y-3">{included.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold"><Check className="h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul><p className="mt-5 text-xs text-muted-foreground">Final monthly price depends on your modules, users and integrations.</p></div>
          <div><p className="text-sm font-bold uppercase text-primary">Popular solutions</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Custom software by use case</h2><div className="mt-6 grid gap-3">{useCasePages.map((p) => <Link key={p.slug} to={`/${p.slug}`} className="flex items-center justify-between border border-border bg-card p-5 font-semibold hover:border-primary">{p.name}<ArrowRight className="h-4 w-4 text-primary" /></Link>)}</div></div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase text-primary">FAQs</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Custom software development cost and process</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">{faqs.map(([q, a]) => <details key={q} className="group py-5"><summary className="cursor-pointer list-none font-semibold">{q}</summary><p className="mt-3 text-sm leading-6 text-muted-foreground">{a}</p></details>)}</div>
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