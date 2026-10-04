import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { SEOHead } from '@/components/SEOHead';
import { blogCategories, blogPosts, type BlogCategory } from '@/lib/blogPosts';
import { cn } from '@/lib/utils';

const jsonLd = [
  { '@context': 'https://schema.org', '@type': 'Blog', name: 'Upcurv Innovations Blog', url: 'https://upcurv.in/blog', publisher: { '@type': 'Organization', name: 'Upcurv Innovations' } },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://upcurv.in/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://upcurv.in/blog' },
  ] },
];

const Blog = () => {
  const [category, setCategory] = useState<BlogCategory | 'All'>('All');
  const posts = category === 'All' ? blogPosts : blogPosts.filter((p) => p.category === category);

  return (
    <div className="public-site min-h-screen bg-background text-foreground">
      <SEOHead title="Business Software & Pricing Guides" description="Practical guides on custom software cost in India, CRM for small businesses, booking management and turning manual workflows into useful software." path="/blog" jsonLd={jsonLd} />
      <LandingNavbar />
      <main>
        <section className="border-b border-border bg-secondary py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="text-xs font-semibold text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link> / <span>Blog</span></nav>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold sm:text-5xl">Business software and pricing guides</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">Practical reading for owners deciding how to run their work with less chasing and fewer spreadsheets.</p>
          </div>
        </section>
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
              {(['All', ...blogCategories] as const).map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={cn('border px-4 py-2 text-sm font-semibold transition-colors', category === c ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary')}>{c}</button>
              ))}
            </div>
            <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
              {posts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col bg-card p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase text-primary">{post.category}</p>
                  <h2 className="mt-3 font-display text-xl font-bold group-hover:text-primary sm:text-2xl">{post.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{post.description}</p>
                  <div className="mt-6 flex items-center justify-between text-xs font-semibold text-muted-foreground"><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingMinutes} min read</span><ArrowRight className="h-4 w-4 text-primary" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Blog;
