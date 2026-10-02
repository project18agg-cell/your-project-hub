# Mobile polish, Custom SaaS comparison, and SEO blog

## What will change

- Fix the four compact product previews on mobile so their workflow labels wrap or reflow instead of being cut off.
- Add the confirmed Upcurv Instagram profile to the public footer and Organization structured data.
- Add a `/blog` resource hub with useful category filters and article pages focused on business software, workflow improvement, and pricing questions.
- Add a marriage-hall use-case comparison to Custom SaaS with an interactive left/right reveal:
  - **Before:** manual booking records, missed enquiries, date conflicts, scattered payment follow-up.
  - **After:** one booking calendar, captured enquiries, conflict prevention, payment and event status visibility.
- Keep the public visual system warm white, red-led, structured, and information-dense in an enterprise Zoho-style direction.

## Blog content and discovery

- Publish an initial set of practical, internally linked articles using only verified Upcurv pricing and capabilities.
- Include category navigation for pricing, business software, and workflow guides.
- Add clear links from the homepage Resources section, navigation, footer, related articles, and relevant Custom SaaS pages.
- Add each public article and the blog index to the sitemap.

## Search metadata

- Give every article a specific title, description, canonical URL, and social metadata.
- Add `Article` and `BreadcrumbList` structured data to each article.
- Add visible breadcrumbs, author/publisher attribution to Upcurv Innovations, publish/update dates, and reading time.
- Preserve the existing Custom SaaS landing pages and avoid duplicating their sales copy in the blog.

## Technical details

- Store article content and metadata in one typed data module and render it through shared blog index/article layouts.
- Use semantic design tokens and existing shared navigation, footer, buttons, and SEO helpers.
- Keep routes readable at `/blog/<article-slug>` and render a useful not-found state for unknown article slugs.
- The current React app remains JavaScript-rendered. Google can render these linked pages, while fully pre-rendered HTML for all crawlers still requires the separate TanStack Start migration already noted in the roadmap.

## Verification

- Check the homepage, blog index, one article, and Custom SaaS page at mobile and desktop sizes.
- Verify the comparison control works by touch, no product text is clipped, social links are correct, structured data is present, and the current build is healthy.