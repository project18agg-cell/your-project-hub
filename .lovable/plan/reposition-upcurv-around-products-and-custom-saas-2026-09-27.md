# Reposition Upcurv around products and Custom SaaS

## Goal
Replace the current cloud-software-company presentation with a mobile-first commercial website focused on Upcurv Trade, Upcurv Prints, UpcurvHub, Custom SaaS, and the retained Upcurv Halls product.

## Public website
- Rebuild the homepage around the headline “Software that fits your business—not the other way around.” with direct product and Custom SaaS actions.
- Replace the current decorative dashboard cards with a responsive Upcurv product ecosystem showing small workflow previews for Trade, Prints, Hub, Custom SaaS, and Halls.
- Add a “What are you trying to solve?” section with outcome-led cards and specific actions for each offering.
- Add a substantial Custom SaaS section covering:
  - the workflow-led proposition;
  - the four-step process from problem to maintained monthly system;
  - examples such as CRM, inventory, billing, orders, employees, property, service management, automation, portals, dashboards, and industry-specific ERP;
  - the monthly subscription model without inventing exact prices.
- Add an interactive “Find your solution” selector for business type and route its result into the relevant next action.
- Add a progressive Custom SaaS enquiry form for business type, current tools, desired workflow, team size, name, and WhatsApp/phone.
- Keep resources secondary and concise rather than making the homepage blog-heavy.
- Preserve Upcurv Halls as the only detailed Upcurv product page and surface it without competing with the four primary routes.

## Navigation and destinations
- Change primary navigation to: Products, Custom SaaS, Solutions, Pricing, Resources.
- Add “Talk to Us” as the principal right-side action; keep About, Careers, and legal links in the footer.
- Use contextual actions:
  - UpcurvHub → `https://upcurvhub.upcurv.in`
  - Upcurv Trade → `https://upcurvtrades.upcurv.in`
  - Upcurv Prints → `https://upcurvprints.upcurv.in`
  - Custom SaaS → the progressive enquiry flow
  - Upcurv Halls → `/upcurv-halls`
- Remove old public product routes and redirect legacy URLs to the most relevant new destination or homepage section.
- Keep admin routes and authentication unchanged.

## Lead capture
- Save Custom SaaS qualification responses into the existing enquiry system, formatted so the sales team can see all answers in one lead.
- Update the chat assistant to offer Trade, Prints, Hub, Custom SaaS, and Halls rather than the retired products.
- Keep existing support, complaint, grievance, and franchise records functional, but remove franchise promotion from the primary homepage journey.

## Product catalogue cleanup
- The connected `products` table currently contains no rows, so there are no product, plan, subscription, or expense records to delete.
- Seed the admin catalogue with Upcurv Trade, Upcurv Prints, UpcurvHub, Custom SaaS, and Upcurv Halls, without making unconfirmed prices or plans.
- Do not change the database structure or existing access rules.

## Visual direction
- Use a crisp editorial/product-workflow style with warm neutral surfaces, Upcurv red as the action color, and distinct supporting colors for each offering.
- Replace generic floating cards, decorative blobs, and inflated statistics with concrete mini workflows and clear business outcomes.
- Keep the first mobile screen compact: logo/menu, headline, two actions, and an immediate hint of the solution choices.
- Use subtle directional motion for workflow steps and respect reduced-motion preferences.
- Apply semantic design tokens throughout and refresh the site metadata for the new positioning.

## Technical notes
- Consolidate public product data and destination URLs so navigation, homepage, footer, chatbot, and redirects remain consistent.
- Remove retired product page modules and obsolete product-specific legal routes from the public router while preserving general legal pages.
- Keep existing Supabase tables and RLS policies; use the existing public `demo_requests` pathway for qualified leads.
- Verify the homepage and Halls page at desktop and mobile sizes, external destinations, lead submission behavior, legacy redirects, and a clean build.
