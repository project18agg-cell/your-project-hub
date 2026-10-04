import { ArrowRight, BadgeCheck, Check, Crown, Megaphone, Printer, Sparkles, Store } from 'lucide-react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { Button } from '@/components/ui/button';
import { externalDestinations, publicPricing } from '@/lib/publicSolutions';

const hubPlans = [
  { name: 'Lister', icon: Sparkles, price: publicPricing.hub.lister.price, previous: publicPricing.hub.lister.previousPrice, term: publicPricing.hub.lister.term, description: 'Get your stock live on UpcurvHub', action: 'Start listing', features: ['Unlimited marketplace listings', 'Dealer catalogue page with your branding', 'Vehicle photos, badges and pricing control', 'Buyer enquiries and lead inbox', 'Listing and catalogue analytics', 'WhatsApp and call actions on every vehicle'] },
  { name: 'Complete', icon: Crown, price: publicPricing.hub.complete.price, previous: publicPricing.hub.complete.previousPrice, term: publicPricing.hub.complete.term, description: 'Run your entire dealership on one platform', action: 'Go complete', features: ['Everything in Lister', 'Sales, purchases, payments and expenses', 'Customer and vendor management with ledgers', 'GST-ready invoices and documents vault', 'Enterprise reports and business dashboards', 'Follow-ups, alerts, audit logs and team access'] },
];

const Pricing = () => (
  <div className="public-site min-h-screen bg-background text-foreground">
    <SEOHead title="Product Pricing" description="Compare pricing for UpcurvHub, Upcurv Trade, Upcurv Prints, Custom SaaS and Upcurv Halls." path="/pricing" />
    <PageViewTracker title="Pricing" />
    <LandingNavbar />
    <main>
      <section className="border-b border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="text-sm font-bold uppercase text-primary">Simple, practical pricing</p><h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-6xl">Choose the product that matches how you work.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Start with a ready-to-use product or talk to us about pricing for your exact workflow and visibility needs.</p></div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div><p className="text-sm font-bold uppercase text-solution-hub">UpcurvHub</p><h2 className="mt-2 font-display text-3xl font-bold">Plans for vehicle dealers</h2></div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {hubPlans.map((plan, index) => <article key={plan.name} className="flex flex-col border border-border bg-card p-5 sm:p-8">
              <div className="flex items-start gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-solution-hub/10 text-solution-hub"><plan.icon /></span><div><h3 className="font-display text-2xl font-bold">{plan.name}</h3><p className="text-sm text-muted-foreground">{plan.description}</p></div></div>
              <div className="mt-7 flex items-end gap-2"><span className="font-display text-4xl font-bold">{plan.price}</span><span className="pb-1 text-muted-foreground">/ {plan.term}</span></div><p className="mt-1 text-sm text-muted-foreground"><span className="line-through">{plan.previous}</span> · 17% off</p>
              {index === 0 ? <div className="mt-6 border border-solution-hub/20 bg-solution-hub/5 p-4"><p className="font-bold text-solution-hub">New to online selling? We do it all for you.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">We create and manage your dealer profile, refresh listings, send buyer leads to WhatsApp and call, and provide onboarding support.</p></div> : null}
              <ul className="mt-6 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-solution-hub" />{feature}</li>)}</ul>
              <Button className="mt-8 w-full" asChild><a href={externalDestinations.hub}>{plan.action} <ArrowRight /></a></Button>
            </article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p className="text-sm font-bold uppercase text-primary">More Upcurv products</p><div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { icon: Store, title: 'Upcurv Trade', price: publicPricing.trade.price, copy: 'List your business, products or services at no charge. Promoted and top-featured placement is custom-priced.', action: 'Explore Upcurv Trade', href: externalDestinations.trade },
            { icon: Printer, title: 'Upcurv Prints', price: publicPricing.prints.featured, copy: `Featured placement for print shops. Add a verified tick for ${publicPricing.prints.verified}.`, action: 'Get featured', href: externalDestinations.prints },
            { icon: Sparkles, title: 'Custom SaaS', price: `From ${publicPricing.customSaas.price}`, copy: 'A maintained business system shaped around your workflow and improved as your needs evolve.', action: 'Discuss my workflow', href: '/custom-saas' },
            { icon: BadgeCheck, title: 'Upcurv Halls', price: publicPricing.halls.price, previous: publicPricing.halls.previousPrice, copy: 'Venue bookings, payments, guests and day-to-day hall operations in one system.', action: 'Explore Upcurv Halls', href: '/upcurv-halls' },
          ].map((item) => <article key={item.title} className="border border-border bg-card p-6 sm:p-8"><item.icon className="h-7 w-7 text-primary" /><h3 className="mt-6 font-display text-2xl font-bold">{item.title}</h3><div className="mt-3 flex flex-wrap items-baseline gap-2"><p className="font-display text-3xl font-bold">{item.price}</p>{item.previous ? <p className="text-sm text-muted-foreground line-through">{item.previous}</p> : null}</div><p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">{item.copy}</p><Button className="mt-7" variant="outline" asChild><a href={item.href}>{item.action} <ArrowRight /></a></Button></article>)}
        </div></div>
      </section>
    </main>
    <LandingFooter />
    <ChatBot />
  </div>
);

export default Pricing;