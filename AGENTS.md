# Project Architecture

- Keep all public product names, keys, and destination URLs in `src/lib/publicSolutions.ts` so every public touchpoint stays consistent.
- Store Custom SaaS qualification leads in the existing `demo_requests` table because the admin already manages that shared enquiry pipeline.