import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { ChatBot } from '@/components/landing/ChatBot';
import { CustomSaasForm } from '@/components/landing/CustomSaasForm';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { Button } from '@/components/ui/button';
import { publicPricing } from '@/lib/publicSolutions';
import { useCasePages, type UseCasePage } from '@/lib/useCasePages';

const UseCase = ({ page }: { page: UseCasePage }) => {
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Service', name: page.name, serviceType: page.name,
      provider: { '@type': 'Organization', name: 'Upcurv Innovations', url: 'https://upcurv.in' },
      areaServed: 'IN', description: page.description,
      offers: { '@type': 'Offer', priceCurrency: 'INR', price: '699', priceSpecification: { '@type': 'UnitPriceSpecification', price: '699', priceCurrency: 'INR', unitText: 'MONTH' } },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://upcurv.in/' },
        { '@type': 'ListItem', position: 2, name: 'Custom SaaS', item: 'https://upcurv.in/custom-saas' },
        { '@type': 'ListItem', position: 3, name: page.name, item: `https://upcurv.in/${page.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={page.title} description={page.description} path={`/${page.slug}`} jsonLd={jsonLd} />
      <PageViewTracker title={page.name} />
      <LandingNavbar />
      <main>
        <section className="bg-foreground py-16 text-primary-foreground sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-primary-foreground/60"><Link to="/">Home</Link> / <Link to="/custom-saas">Custom SaaS</Link> / {page.name}</nav>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">{page.h1}</h1>
            <p className="mt-6 max-w-2xl leading-7 text-primary-foreground/70">{page.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild><a href="#discussion">Discuss my requirements <ArrowRight /></a></Button>
              <p className="text-sm font-semibold text-primary-foreground/70">Monthly subscription from {publicPricing.customSaas.price}</p>
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold">What your {page.name.toLowerCase()} can include</h2>
            <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">{page.examples.map((item) => <div key={item} className="flex items-start gap-3 bg-card p-5 text-sm font-semibold"><Check className="h-4 w-4 shrink-0 text-primary" />{item}</div>)}</div>
            <p className="mt-6 text-sm text-muted-foreground">Every system is scoped to your workflow. Final features and monthly price depend on your requirements.</p>
          </div>
        </section>
        <section className="border-y border-border bg-secondary py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold">Other custom software we build</h2>
            <div className="mt-5 flex flex-wrap gap-3">{useCasePages.filter((p) => p.slug !== page.slug).map((p) => <Button key={p.slug} variant="outline" asChild><Link to={`/${p.slug}`}>{p.name}</Link></Button>)}<Button variant="outline" asChild><Link to="/custom-saas">All custom software</Link></Button></div>
          </div>
        </section>
        <section id="discussion" className="scroll-mt-20 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold">Tell us how you work today</h2>
            <div className="mt-8 border border-border bg-card p-5 sm:p-8"><CustomSaasForm /></div>
          </div>
        </section>
      </main>
      <LandingFooter />
      <ChatBot />
    </div>
  );
};

export default UseCase;
