# Refine product messaging, pricing, and admin access

## Website updates
- Replace the homepage headline with a more relatable business-focused promise.
- Rename the product discovery section to “Our Products” and adjust its supporting text.
- Update every Upcurv Trade destination to `https://upcurvtrade.upcurv.in` and rewrite its positioning as a B2B and D2C platform connecting buyers, suppliers, customers, and service businesses.
- Move the full Custom SaaS proposition, examples, monthly model, and enquiry journey to a dedicated Custom SaaS page.
- Remove the Custom SaaS enquiry form from the homepage and show it in a dismissible popup after 20 seconds instead.

## Pricing
- Create a dedicated pricing page linked from the main navigation.
- Present product-specific pricing and terms:
  - UpcurvHub plans based on the supplied Lister and Complete reference.
  - Upcurv Trade listings are free; promoted and top-featured placement is custom-priced.
  - Custom SaaS starts at ₹699/month.
  - Upcurv Halls is ₹4,999/year, with ₹6,999 shown as the previous price.
  - Upcurv Prints featured placement is ₹999–₹1,999/month; verification is ₹199/month.
- Keep pricing wording clear where charges depend on requirements or placement.

## Admin sign-in
- Correct the app’s Supabase connection if it still points to the previous project.
- Verify the existing admin user’s role lookup and access rules, then test sign-in and the protected dashboard flow.

## Verification
- Check the homepage, Custom SaaS page, pricing page, delayed popup, corrected outbound link, and mobile layouts.
- Confirm a clean build and validate the admin sign-in flow against the connected Supabase project.

## Technical details
- Keep public product names, links, and pricing data centralized for consistent use across pages.
- Keep Custom SaaS requests in the existing `demo_requests` enquiry pipeline.
- Use the existing protected admin routes and server-backed `user_roles` checks; no client-side admin bypasses.
