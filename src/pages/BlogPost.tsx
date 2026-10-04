import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { getBlogPost } from '@/lib/blogPosts';

const BASE = 'https://upcurv.in';

const BlogPostPage = () => {
  const { slug = '' } = useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SEOHead title="Article not found" description="This article could not be found." path={`/blog/${slug}`} />
        <LandingNavbar />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Article not found</h1>
          <p className="mt-3 text-muted-foreground">It may have moved. Browse all guides instead.</p>
          <Button className="mt-6" asChild><Link to="/blog">View the blog</Link></Button>
        </main>
        <LandingFooter />
      </div>
    );
  }

  const url = `${BASE}/blog/${post.slug}`;
  const related = post.relatedSlugs.map(getBlogPost).filter(Boolean);
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, datePublished: post.publishedAt, dateModified: post.updatedAt, mainEntityOfPage: url, articleSection: post.category,
      author: { '@type': 'Organization', name: 'Upcurv Innovations', url: BASE }, publisher: { '@type': 'Organization', name: 'Upcurv Innovations', url: BASE } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ] },
  ];
  const date = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="public-site min-h-screen bg-background text-foreground">
      <SEOHead title={post.title} description={post.description} path={`/blog/${post.slug}`} jsonLd={jsonLd} />
      <LandingNavbar />
      <main>
        <article>
          <header className="border-b border-border bg-secondary py-12 sm:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <nav aria-label="Breadcrumb" className="text-xs font-semibold text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link> / <Link to="/blog" className="hover:text-primary">Blog</Link> / <span>{post.category}</span></nav>
              <p className="mt-5 text-xs font-bold uppercase text-primary">{post.category}</p>
              <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
              <p className="mt-5 text-sm text-muted-foreground">By Upcurv Innovations · Published {date(post.publishedAt)} · Updated {date(post.updatedAt)} · {post.readingMinutes} min read</p>
            </div>
          </header>
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <p className="text-lg leading-8">{post.intro}</p>
            {post.sections.map((s) => (
              <section key={s.heading} className="mt-10">
                <h2 className="font-display text-2xl font-bold">{s.heading}</h2>
                {s.paragraphs.map((p) => <p key={p} className="mt-4 leading-7 text-muted-foreground">{p}</p>)}
                {s.bullets && <ul className="mt-4 space-y-2">{s.bullets.map((b) => <li key={b} className="flex gap-3 text-sm font-semibold"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{b}</li>)}</ul>}
              </section>
            ))}
            <aside className="mt-12 border border-primary/25 bg-primary/5 p-6">
              <p className="font-display text-xl font-bold">Want software shaped around your workflow?</p>
              <p className="mt-2 text-sm text-muted-foreground">Upcurv Custom SaaS starts from ₹699/month, with maintenance included.</p>
              <Button className="mt-4" asChild><Link to="/custom-saas">Explore Custom SaaS <ArrowRight /></Link></Button>
            </aside>
          </div>
        </article>
        {related.length > 0 && (
          <section className="border-t border-border py-12">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <h2 className="font-display text-xl font-bold">Related guides</h2>
              <div className="mt-4 grid gap-3">{related.map((r) => <Link key={r!.slug} to={`/blog/${r!.slug}`} className="flex items-center justify-between gap-4 border border-border bg-card p-4 text-sm font-semibold hover:border-primary">{r!.title}<ArrowRight className="h-4 w-4 shrink-0 text-primary" /></Link>)}</div>
            </div>
          </section>
        )}
      </main>
      <LandingFooter />
    </div>
  );
};

export default BlogPostPage;
