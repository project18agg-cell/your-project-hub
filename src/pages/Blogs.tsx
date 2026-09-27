import { useState } from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { AnimatedSection, AnimatedCard } from '@/components/landing/AnimatedSection';
import { ChatBot } from '@/components/landing/ChatBot';
import { SEOHead } from '@/components/SEOHead';
import { PageViewTracker } from '@/components/landing/PageViewTracker';
import { ArrowRight, ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import blogRetailSaas from '@/assets/blog-retail-saas.png';
import blogFranchiseModel from '@/assets/blog-franchise-model.png';
import blogCarDealer from '@/assets/blog-car-dealer.png';

type BlogPost = {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tag: string;
  readTime: string;
  author: string;
  img?: string;
};

const blogPosts: BlogPost[] = [
  {
    title: 'How SaaS is Transforming Indian Retail',
    excerpt: 'Discover how cloud-based solutions are reshaping the retail landscape across tier-2 and tier-3 cities in India.',
    date: 'Feb 10, 2026', tag: 'Industry', readTime: '5 min read', author: 'Upcurv Team', img: blogRetailSaas,
    content: `The retail sector in India is undergoing a once-in-a-generation transformation. While large metropolitan stores have had access to enterprise software for years, the real revolution is now happening in tier-2 and tier-3 cities — and SaaS is leading the charge.

**The Problem with Traditional Retail Software**

For decades, small and mid-sized retailers relied on basic accounting tools or expensive on-premise software that required dedicated hardware, IT staff, and annual maintenance contracts. A billing machine alone could cost ₹50,000+, and upgrading required physical visits from technicians.

**Cloud Changes Everything**

SaaS platforms have fundamentally changed this dynamic. Today, a grocery store owner in Nashik can access the same quality of inventory management, billing, and analytics that a large supermarket chain uses — for a fraction of the cost.

**What's Driving the Shift?**

1. **Affordable smartphones**: India now has 800M+ smartphone users. Store owners are comfortable managing their business from their phone.

2. **4G/5G penetration**: Reliable internet connectivity even in smaller towns makes cloud-based systems viable.

3. **GST compliance pressure**: Since the rollout of GST, every retailer needs compliant billing software. SaaS solutions come with built-in GST filing support.

4. **COVID-19 acceleration**: The pandemic forced many traditional retailers to digitize quickly — and those who did are now significantly more competitive.

**Real-World Impact**

Retailers who've adopted cloud-based systems report:
- 30-40% reduction in billing errors
- 50% less time spent on end-of-day cash reconciliation
- Better inventory accuracy with real-time stock updates
- Improved customer retention through loyalty programs

**The Road Ahead**

India has 63 million SMBs, and less than 15% have adopted any form of digital retail management. The opportunity is enormous. Platforms like Upcurv Retail are designed specifically for this market — with offline capabilities for power cuts, support for local languages, and pricing that makes sense for Indian businesses.

The retailers who adopt SaaS in the next 2-3 years will have a significant competitive advantage over those who wait.`,
  },
  {
    title: 'The Rise of City Franchise Models in SaaS',
    excerpt: "Learn why city-based franchise partnerships are the next big thing in India's SaaS ecosystem.",
    date: 'Feb 5, 2026', tag: 'Business', readTime: '7 min read', author: 'Upcurv Team', img: blogFranchiseModel,
    content: `The SaaS industry has traditionally relied on inside sales teams, digital marketing, and product-led growth to acquire customers. But for SMB-focused SaaS companies targeting smaller Indian cities, these approaches often fall short. Enter the city franchise model.

**What is a SaaS City Franchise?**

Unlike traditional franchises that require physical stores and product inventory, a SaaS city franchise gives a local partner exclusive rights to sell and support a software product within a defined geographic territory — typically a city or district.

The franchisee earns a recurring revenue share from every subscription they bring in. As long as the customer remains subscribed, the partner earns — month after month.

**Why It Works for India**

India's SMB market is deeply relationship-driven. A local entrepreneur who speaks the same language, understands the local business culture, and can offer in-person demonstrations dramatically outperforms a remote salesperson.

Consider this: A software sales call from Bangalore to a grocery store owner in Varanasi often fails because of language barriers, trust deficits, and the inability to demonstrate the product physically.

A city franchise partner in Varanasi, on the other hand, can:
- Meet the prospect at their store
- Demonstrate the software in Hindi or Bhojpuri
- Provide on-site training
- Be available for support calls in local time zones

**The Economics of SaaS Franchises**

Traditional franchise models require significant upfront investment — a restaurant franchise might cost ₹30-50 lakh to set up. A SaaS franchise, by contrast, requires minimal capital:

- Low setup costs (training, marketing materials)
- No inventory or physical premises required
- Revenue starts from the first customer
- Monthly recurring income grows as the customer base grows

**Upcurv's City Partner Model**

Upcurv has pioneered this model in India with its City Partner Program. Partners get exclusive city rights, complete product training, marketing support, and a competitive revenue share percentage.

Early partners in cities like Kochi, Coimbatore, and Nashik are already generating meaningful monthly income while building a sustainable local SaaS business.

**The Future**

As Indian SMBs continue to digitize, the demand for local SaaS implementation and support partners will only grow. City franchise models solve the last-mile problem of SaaS distribution in ways that traditional sales teams simply cannot.`,
  },
  {
    title: '5 Features Every Car Dealer Needs in 2026',
    excerpt: 'From real-time inventory to public marketplace listings — the must-have tools for modern auto dealers.',
    date: 'Jan 28, 2026', tag: 'Product', readTime: '4 min read', author: 'Upcurv Team', img: blogCarDealer,
    content: `The automobile dealership business in India is more competitive than ever. With OEM portals, used car aggregators, and social media reshaping how buyers discover vehicles, dealers need to level up their digital game. Here are the 5 non-negotiable features every modern dealer needs in 2026.

**1. Real-Time Digital Inventory**

Gone are the days of manually updating Excel sheets or calling the lot to check stock. Modern dealers need a live inventory system where every vehicle — new, used, or demo — is tracked with photos, specifications, pricing, and availability status.

The best systems include:
- Mobile app for quick stock updates
- Automatic low-stock alerts
- QR codes for physical lot management
- Integration with OEM portals for new vehicle arrival updates

**2. Personal Dealer Catalogue**

Every dealership needs its own shareable digital catalogue — a clean, mobile-friendly link that shows current inventory with real-time availability. This link should be shareable on WhatsApp, Instagram, and other platforms.

When a customer asks "what do you have in stock?", the answer should be a single link, not a phone call.

**3. Online Lead Capture & CRM**

Modern buyers research online before they visit. Dealers need to capture these digital leads from:
- Their dealer catalogue/website
- WhatsApp enquiries
- Marketplace listings
- Walk-ins and phone calls

All leads should flow into a central CRM where sales staff can track follow-ups, schedule calls, and monitor the conversion pipeline.

**4. Public Marketplace Listing**

Beyond a private catalogue, dealers benefit enormously from listing on a public marketplace where buyers are actively searching. Vahanhub's public marketplace does exactly this — giving dealers visibility to buyers who haven't heard of them yet.

Marketplace features to look for:
- Verified dealer badges
- Customer review integration
- Advanced search filters by make, model, year, budget
- Lead routing to the dealer's CRM

**5. Performance Analytics Dashboard**

Data-driven dealerships consistently outperform those relying on gut feel. Essential metrics include:
- Sales velocity by model
- Lead-to-conversion rates by source
- Inventory aging (vehicles unsold for 30/60/90 days)
- Revenue per sales executive
- Test drive scheduling and conversion rates

Dealers who have these 5 systems in place enter 2026 with a significant operational and competitive advantage. Those still running on spreadsheets and notebooks are at serious risk of losing customers to more digitally sophisticated competitors.`,
  },
  {
    title: 'Why Indian SMBs Are Moving to Cloud-Based Billing',
    excerpt: "Paper receipts are out. GST-compliant thermal printing with cloud sync is in. Here's why SMBs are making the switch.",
    date: 'Jan 20, 2026', tag: 'Retail', readTime: '6 min read', author: 'Upcurv Team',
    content: `Walk into any traditional Indian grocery store or clothing shop from a decade ago and you'd likely see a manual carbon-copy receipt book, a standalone cash register, and at best, a basic desktop billing software. Fast forward to 2026, and the transformation in small business billing is remarkable.

**The GST Catalyst**

The single biggest driver of billing software adoption in India has been GST. Since its rollout in 2017, businesses need to track input tax credits, generate HSN-coded invoices, and file monthly returns. Manual systems simply cannot keep up with these requirements efficiently.

Cloud billing platforms have become the default solution because they:
- Auto-calculate CGST, SGST, and IGST correctly every time
- Generate GSTR-1-ready reports with one click
- Maintain a digital audit trail for tax inspections
- Update tax rates automatically when the government changes them

**The Problem with Legacy Solutions**

Traditional desktop billing software has several critical limitations:

1. **Data loss risk**: Software installed on a single PC means a hardware failure = losing all your business data
2. **No remote access**: Owners can't monitor sales while they're away from the store
3. **Manual backup required**: Most SMB owners never back up regularly
4. **No scalability**: Adding a second counter or location means buying a new license and complex networking
5. **Outdated compliance**: Tax law changes require paid software updates

**Why Cloud Wins**

Cloud-based retail systems solve all of these problems:

- **Automatic backup**: Data is saved to the cloud in real-time. A stolen laptop doesn't affect your data
- **Access from anywhere**: Check today's sales from your phone while you're at home
- **Instant multi-location**: Opening a second store? Add it in the same dashboard
- **Automatic updates**: Tax changes, new features — all updates happen automatically without any action from you
- **Thermal + A4 printing**: Modern cloud systems support both 80mm thermal receipt printers (for fast customer receipts) and A4 PDF invoices (for B2B customers who need formal invoices)

**The Cost Reality**

Many SMB owners assume cloud software is expensive. The reality is the opposite. A cloud retail system costs ₹500-3,000/month — often less than what businesses were paying for annual desktop software licenses plus IT maintenance.

The return on investment is clear: reduced billing errors, faster checkout, better inventory accuracy, and time saved on accounting — typically 5-10 hours per week for a medium-sized store.

**What to Look for in a Cloud Billing System**

1. Works offline (for power/internet outages)
2. Thermal and A4 billing support
3. GST compliance built in
4. Mobile app for the owner
5. Inventory with low-stock alerts
6. Customer loyalty program
7. Daily and monthly sales reports

Upcurv Retail ticks all these boxes and is specifically designed for the demands of Indian retail businesses.`,
  },
  {
    title: 'Building a Recurring Revenue Business with SaaS Franchises',
    excerpt: 'A deep dive into how franchise partners can build predictable monthly income through SaaS subscriptions.',
    date: 'Jan 15, 2026', tag: 'Franchise', readTime: '8 min read', author: 'Upcurv Team',
    content: `One of the most compelling business models of the modern era is building a recurring revenue stream through SaaS subscriptions. For individual entrepreneurs and small business owners in India, the Upcurv City Partner Program offers a practical path to building exactly this kind of predictable, scalable income.

**Understanding Recurring Revenue**

Traditional businesses earn revenue linearly — you sell a product or complete a project, and you earn once. Recurring revenue models are fundamentally different. When you onboard a customer onto a SaaS subscription, you earn a percentage of their subscription fee every single month they remain on the platform.

This creates a compounding income curve:
- Month 1: Onboard 5 customers → Earn ₹X
- Month 2: Onboard 5 more → Earn ₹2X (old + new customers)
- Month 6: 30 customers → Earn ₹6X
- Month 12: 60 customers → Earn ₹12X+

**The City Partner Math**

Let's run through a realistic scenario for an Upcurv City Partner:

Assumptions:
- City: Tier-2 city (population 500K)
- Target market: Retail stores and auto dealers
- Avg subscription value: ₹2,000/month per customer
- Revenue share: 25%

Year 1 projections:
- Q1: 10 customers × ₹2,000 × 25% = ₹5,000/month
- Q2: 25 customers × ₹2,000 × 25% = ₹12,500/month
- Q3: 45 customers × ₹2,000 × 25% = ₹22,500/month
- Q4: 70 customers × ₹2,000 × 25% = ₹35,000/month

By end of year 1, a dedicated partner can realistically build ₹35,000+ per month in recurring income — and it continues to grow in Year 2 without starting from zero.

**Customer Retention is Key**

The beauty of SaaS is that customers rarely churn if they're using the product actively. Unlike project-based work where you finish a job and need to find the next client, SaaS subscriptions renew automatically.

Keys to retention:
1. Thorough onboarding so customers adopt the software fully
2. Regular check-in calls to address any issues early
3. Sharing new feature updates and training for new employees
4. Helping customers get visible results (e.g., showing them their inventory savings)

**Scaling Beyond Solo**

The most successful city partners eventually build small teams:
- A sales executive focused on new customer acquisition
- A customer success person handling training and support
- The partner focuses on strategy and key account relationships

With this structure, a city partner can scale to 200+ customers and ₹1-2L/month in recurring revenue within 2-3 years.

**Comparing to Traditional Businesses**

A traditional franchise (restaurant, retail shop) might require:
- ₹20-50L upfront investment
- 10-20 employees
- Physical premises with rent
- Inventory management
- 3-5 years to break even

An Upcurv City Partnership requires:
- ₹50K-2L initial investment (training, marketing materials, working capital)
- 1-3 people to start
- No physical premises required
- No inventory
- 6-18 months to positive cash flow

The risk-adjusted returns strongly favor the SaaS franchise model for the modern entrepreneur.`,
  },
  {
    title: 'E-commerce for Beginners: Setting Up Your First Online Store',
    excerpt: 'A step-by-step guide to launching your branded online store using Upcurv Ecom — no coding required.',
    date: 'Jan 10, 2026', tag: 'E-commerce', readTime: '5 min read', author: 'Upcurv Team',
    content: `The idea of launching an online store can feel overwhelming for first-time entrepreneurs. Questions like "How do I accept payments?", "What about delivery?", and "Do I need a developer?" make many people postpone the idea indefinitely. This guide walks you through the entire process of setting up your first online store using Upcurv Ecom — in plain language, no tech jargon.

**Step 1: Choose Your Template**

Upcurv Ecom provides 10+ professionally designed templates across categories like fashion, electronics, food products, handmade crafts, and more. Choose the one closest to your business — you'll customize it next.

What makes a good template choice:
- Clean product display
- Mobile-first layout
- Simple checkout flow
- Matches your brand's general feel

**Step 2: Set Up Your Store Identity**

Before adding products, set up your brand:
- Upload your logo
- Choose your brand colors (use your existing packaging colors if you have them)
- Write a short "About Us" description
- Add your business address and GST number

This takes 20-30 minutes and makes your store look professional from day one.

**Step 3: Add Your Products**

This is where most first-time sellers spend the most time — and it's worth it. For each product:

- **Photos**: Use natural light, white background. Take 3-5 images per product. This is the most important factor in online sales.
- **Product name**: Be descriptive. "Red Cotton Kurta - Size M" is better than just "Kurta".
- **Description**: Mention fabric, size, care instructions, or key features. Answer the question customers would ask a salesperson.
- **Price**: List your selling price and optionally a "strikethrough" MRP to show the discount.
- **Inventory**: Set stock quantity so the system auto-marks "Out of Stock" when you're sold out.

**Step 4: Set Up Payments**

Upcurv Ecom integrates with Razorpay, which accepts UPI, credit/debit cards, and net banking. Setup takes about 30 minutes:
1. Create a Razorpay account (free)
2. Complete KYC (Aadhaar, PAN, bank account)
3. Enter your API keys in Upcurv Ecom settings

Once done, customers can pay instantly at checkout. Money settles to your bank account in 2-3 business days.

**Step 5: Configure Delivery**

Options for delivery:
- **Self-delivery**: For local orders, you deliver yourself. Mark orders as delivered when done.
- **Shiprocket or Delhivery integration**: For pan-India shipping. Enter your shipper account credentials and rates auto-calculate.
- **Flat rate shipping**: Charge a fixed delivery fee (e.g., ₹50 anywhere).

**Step 6: Go Live!**

Before launching:
- Place a test order yourself to check the flow
- Share the store link with 2-3 trusted friends for feedback
- Check that your store looks good on mobile (crucial — 80%+ of traffic will be mobile)

Once you're satisfied, share your store link everywhere:
- WhatsApp status and groups
- Instagram bio and stories
- Facebook page
- Google My Business profile

**First 30 Days Tips**

- Respond to enquiries within 1 hour during working hours
- Share new product photos twice a week on Instagram Stories
- Create a "Grand Opening" coupon code to generate initial sales and reviews
- Ask your first customers to review on Google

Your first online store won't be perfect — and that's okay. Focus on getting your first 10 orders, then iterate based on customer feedback.`,
  },
  {
    title: 'Managing Multi-Location Retail: Challenges & Solutions',
    excerpt: "Running multiple retail stores? Here's how technology can centralize operations and reduce overhead.",
    date: 'Jan 5, 2026', tag: 'Retail', readTime: '6 min read', author: 'Upcurv Team',
    content: `Growing from one retail store to two, three, or more locations is a significant milestone — but it also introduces a new set of operational challenges that can overwhelm business owners who aren't prepared.

**The Multi-Location Management Problem**

When you run a single store, everything is visible and manageable. You're physically present most of the time, you know your inventory, and you can check the cash register at end of day.

Add a second store and suddenly you're dealing with:
- Two separate inventory systems that don't talk to each other
- Staff you can't monitor directly
- Cash reconciliation happening at two different locations
- No easy way to compare performance between stores
- Product transfers between locations tracked manually (or not at all)

Add a third store and the complexity multiplies. Most multi-location retail failures happen not because of poor sales, but because of poor operational control.

**Common Mistakes Multi-Location Retailers Make**

1. **Separate software for each store**: Using different billing systems at each location means no consolidated view. You get reports from three different places and manually try to add them up.

2. **No inter-store transfer system**: When Store A runs out of a product that Store B has excess of, transfers are tracked on paper and often forgotten.

3. **Staff accountability gaps**: Without individual staff logins and transaction tracking, it's hard to identify discrepancies.

4. **Delayed reporting**: If you only get sales reports at end of month, you're always reacting to problems after they've already affected your business.

**The Technology Solution**

Modern cloud retail systems like Upcurv Retail are built for multi-location management from the ground up.

Key capabilities:
- **Centralized dashboard**: See all stores' live sales data in one place, from any device
- **Unified inventory**: One product catalog across all stores, with location-specific stock quantities
- **Inter-store transfers**: Record a transfer request in the app, receiving store confirms — automatic stock adjustment in both locations
- **Individual staff accounts**: Each cashier logs in with their own credentials. Every transaction is linked to their account
- **Comparative analytics**: "Which store had the best margin this month?" answered in seconds
- **Centralized purchase orders**: Raise POs from headquarters, receive stock at individual stores

**Staff Management Across Locations**

One of the biggest concerns for multi-location owners is staff trust and accountability. Cloud retail systems address this by:
- Showing every transaction with timestamp and staff ID
- Flagging unusual patterns (e.g., high discount usage by one cashier)
- Enabling managers to view shift reports without being physically present
- Allowing owners to lock/unlock specific features per staff role

**Practical Steps for Going Multi-Location**

1. Get one centralized system before you open your second store
2. Standardize your product catalog and pricing rules across locations
3. Define clear inter-store transfer procedures
4. Train each location's staff on their specific system access
5. Set up automated daily summary reports to your phone/email
6. Review comparative location analytics weekly

The technology exists today to manage 10 stores as efficiently as one — if you use it correctly.`,
  },
  {
    title: 'The Future of Vehicle Marketplaces in India',
    excerpt: 'How digital marketplaces are connecting dealers with buyers faster and more efficiently than ever.',
    date: 'Dec 28, 2025', tag: 'Automotive', readTime: '5 min read', author: 'Upcurv Team',
    content: `India's used vehicle market is one of the largest in the world — estimated at ₹2 lakh crore and growing at 15%+ annually. Yet despite this scale, the buying and selling experience for most customers remains fragmented, opaque, and inefficient. Digital marketplaces are changing that — and the pace of change is accelerating.

**The Traditional Vehicle Buying Journey**

Traditionally, a buyer looking for a used car in India would:
1. Ask friends and family for recommendations
2. Visit 3-5 dealers in the city
3. Rely entirely on the dealer's word for the vehicle's history
4. Negotiate without any price benchmark
5. Complete extensive paperwork manually

This process takes days or weeks, and buyers often end up uncertain about whether they got a fair deal.

**How Digital Marketplaces Are Changing This**

Platforms that aggregate dealer inventories and present them to buyers in a searchable, filterable format are solving several of these pain points simultaneously.

**For Buyers:**
- Search across hundreds of vehicles from verified dealers without visiting each location
- Filter by make, model, year, price range, fuel type, transmission, and location
- See multiple photos and detailed specifications
- Compare similar vehicles side by side
- Contact the dealer directly for test drives or negotiations

**For Dealers:**
- Get discovered by buyers actively searching — not just people who walk past your showroom
- Receive qualified leads (buyers who've already seen the vehicle online and are interested)
- Build credibility through dealer verification badges and customer reviews
- Reach buyers in neighboring cities who might prefer to drive 2-3 hours for the right vehicle

**The Role of DMS Integration**

The next evolution is the integration of dealer management systems (DMS) with marketplace platforms. When a dealer's inventory management system is connected to a marketplace, new vehicles are listed automatically the moment they're added to inventory — and removed automatically when sold.

This is exactly what Vahanhub does. Dealers manage their inventory in Vahanhub, and vehicles automatically appear on the Upcurv marketplace with all specifications, photos, and pricing.

**Trust and Transparency**

The biggest barrier to digital vehicle transactions in India remains trust. Buyers want assurance about a vehicle's history, service records, and genuine condition.

The direction the market is heading:
- Vehicle history reports integrated at the point of listing
- Inspection-verified badges from certified third-party inspectors
- Dealer rating systems based on buyer reviews
- Digital RC transfer and payment escrow for seamless transactions

**What This Means for Dealers**

Dealers who embrace digital marketplace presence today are positioning themselves for a market where the majority of initial discovery will happen online. Those who wait are ceding valuable digital real estate to competitors who listed first.

The future Indian vehicle marketplace will look very different from today — more transparent, more efficient, and decisively digital.`,
  },
  {
    title: 'Loyalty Programs That Actually Work for Small Businesses',
    excerpt: 'Learn how to implement simple yet effective loyalty programs that drive repeat customers.',
    date: 'Dec 20, 2025', tag: 'Marketing', readTime: '4 min read', author: 'Upcurv Team',
    content: `Customer loyalty programs have been a staple of large retail chains for decades — but small businesses have historically struggled to implement them effectively due to complexity and cost. Modern cloud retail systems have changed this, making powerful loyalty programs accessible to any retailer regardless of size.

**Why Loyalty Programs Matter**

The math behind customer loyalty is compelling:
- Acquiring a new customer costs 5-7x more than retaining an existing one
- Loyal customers spend 67% more than new customers
- A 5% increase in customer retention can increase profits by 25-95% (Harvard Business Review)

For a small grocery store or clothing boutique, a loyal base of 200-300 regular customers generating repeat purchases can be the difference between a struggling and thriving business.

**What Makes a Loyalty Program Actually Work?**

Most small business loyalty programs fail because they're complicated, inconsistently applied, or don't offer rewards customers actually care about. Here's what the research shows about effective programs:

**1. Simplicity is Everything**

Customers shouldn't need to read instructions to participate. The best programs follow a simple rule: "Spend ₹100, earn 10 points. Redeem 100 points for ₹10 off."

The moment you add complex tiers, blackout dates, or product exclusions, participation drops dramatically.

**2. Make Progress Visible**

Customers are far more likely to return when they can see how close they are to a reward. A digital system that shows "You have 847 points — 153 more until your next reward" is far more motivating than a paper punch card.

**3. Immediate Gratification Beats Delayed Rewards**

Programs that offer points redeemable on the current visit are more effective than programs where rewards take months to accumulate. Consider offering milestone bonuses for early engagement.

**4. Personalize When Possible**

A general "birthday discount" sent to all customers still outperforms generic promotions. Modern retail systems store customer purchase history — use it to send relevant promotions based on what customers actually buy.

**5. Train Your Staff**

A loyalty program that cashiers forget to mention or struggle to explain won't get adopted. Brief daily reminders and simple scripts ("Would you like to add your loyalty number to earn points today?") dramatically increase enrollment.

**Implementing in Upcurv Retail**

Upcurv Retail has a built-in loyalty system that:
- Automatically calculates points at the time of billing
- Stores customer profiles with total points and redemption history
- Allows customers to redeem points at checkout with one click
- Sends WhatsApp notifications when customers reach reward milestones
- Generates loyalty analytics showing top customers by points earned

Setup takes less than 30 minutes, and you can start enrolling customers immediately.

**Results to Expect**

Retailers who implement simple digital loyalty programs typically see:
- 15-25% increase in repeat visit frequency within 60 days
- 10-20% increase in average transaction value from loyal customers
- 30-50% of enrolled customers making an additional purchase within 30 days

The key is consistency — run the program month after month, and the compounding effect of repeat customer behavior becomes a significant revenue driver.`,
  },
];

export default function Blogs() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title="Blog" description="Insights on SaaS, retail technology, e-commerce, and franchise opportunities from Upcurv Technologies." path="/blogs" />
      <PageViewTracker title="Blog" />
      <LandingNavbar />

      {selectedPost ? (
        // Article Detail View
        <div>
          <section className="bg-gradient-to-br from-[#F9423A]/5 to-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-[#F9423A] text-sm font-medium mb-8 hover:gap-3 transition-all">
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </button>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#F9423A]/10 text-[#F9423A] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1"><Tag className="h-3 w-3" />{selectedPost.tag}</span>
                <span className="text-muted-foreground text-xs flex items-center gap-1"><Calendar className="h-3 w-3" />{selectedPost.date}</span>
                <span className="text-muted-foreground text-xs flex items-center gap-1"><Clock className="h-3 w-3" />{selectedPost.readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{selectedPost.title}</h1>
              <p className="text-lg text-muted-foreground">{selectedPost.excerpt}</p>
            </div>
          </section>
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                {selectedPost.content.split('\n\n').map((block, i) => {
                  if (block.startsWith('**') && block.endsWith('**')) {
                    return <h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">{block.replace(/\*\*/g, '')}</h2>;
                  }
                  if (block.match(/^\*\*/)) {
                    const formatted = block.split('\n').map((line, j) => {
                      if (line.startsWith('- ')) return <li key={j} className="ml-4 list-disc text-muted-foreground">{line.slice(2).replace(/\*\*(.*?)\*\*/g, (_, m) => m)}</li>;
                      if (line.match(/^\d+\./)) return <li key={j} className="ml-4 list-decimal text-muted-foreground">{line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, (_, m) => m)}</li>;
                      if (line.startsWith('**') && line.endsWith('**')) return <h3 key={j} className="text-xl font-bold text-foreground mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>;
                      const parts = line.split(/\*\*(.*?)\*\*/g);
                      return <p key={j} className="text-muted-foreground leading-relaxed mb-3">{parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="text-foreground font-semibold">{p}</strong> : p)}</p>;
                    });
                    return <div key={i}>{formatted}</div>;
                  }
                  const lines = block.split('\n');
                  return (
                    <div key={i} className="mb-4">
                      {lines.map((line, j) => {
                        if (line.startsWith('- ')) return <li key={j} className="ml-6 list-disc text-muted-foreground mb-1">{line.slice(2).replace(/\*\*(.*?)\*\*/g, (_, m) => m)}</li>;
                        if (line.match(/^\d+\./)) return <li key={j} className="ml-6 list-decimal text-muted-foreground mb-1">{line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, (_, m) => m)}</li>;
                        const parts = line.split(/\*\*(.*?)\*\*/g);
                        return line ? <p key={j} className="text-muted-foreground leading-relaxed mb-2">{parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="text-foreground font-semibold">{p}</strong> : p)}</p> : null;
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="mt-12 pt-8 border-t border-border">
                <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-[#F9423A] text-sm font-medium hover:gap-3 transition-all">
                  <ArrowLeft className="h-4 w-4" /> Back to All Posts
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        // Blog List
        <>
          <section className="bg-gradient-to-br from-[#F9423A]/5 to-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Upcurv Blog</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Insights, strategies, and updates for growing your business with SaaS
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, i) => (
                  <AnimatedCard key={post.title} delay={i * 0.05}>
                    <button onClick={() => setSelectedPost(post)} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col text-left w-full group">
                      <div className="h-44 overflow-hidden">
                        {post.img ? (
                          <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#F9423A]/10 to-[#F9423A]/5 flex items-center justify-center">
                            <span className="text-[#F9423A] text-sm font-medium bg-[#F9423A]/10 px-3 py-1 rounded-full">{post.tag}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                        </div>
                        <h3 className="font-bold text-foreground mb-2 text-lg group-hover:text-[#F9423A] transition-colors">{post.title}</h3>
                        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{post.excerpt}</p>
                        <div className="mt-4 flex items-center text-[#F9423A] text-sm font-medium group-hover:gap-2 transition-all gap-1">
                          Read Article <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </button>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <LandingFooter />
      <ChatBot />
    </div>
  );
}
