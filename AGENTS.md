# Project Architecture

- Keep all public product names, keys, and destination URLs in `src/lib/publicSolutions.ts` so every public touchpoint stays consistent.
- Keep public pricing in `src/lib/publicSolutions.ts` so the pricing page and product pages cannot drift apart.
- Store Custom SaaS qualification leads in the existing `demo_requests` table because the admin already manages that shared enquiry pipeline.
- Use environment-provided Supabase settings in the generated client so authentication and data requests always reach the currently connected project.
- Keep SEO use-case landing pages as data in `src/lib/useCasePages.ts` rendered by one UseCase page, so new pages need no new layout code.
- Keep public blog article content and metadata in `src/lib/blogPosts.ts`, rendered by shared blog pages, so metadata, navigation, and article structure stay consistent.
