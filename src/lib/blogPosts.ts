export type BlogCategory = 'Pricing' | 'Business Software' | 'Workflow Guides';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  intro: string;
  sections: BlogSection[];
  relatedSlugs: string[];
}

export const blogCategories: BlogCategory[] = ['Pricing', 'Business Software', 'Workflow Guides'];

export const blogPosts: BlogPost[] = [
  {
    slug: 'custom-software-development-cost-india',
    title: 'Custom Software Development Cost in India: What Small Businesses Should Compare',
    description: 'A practical guide to custom software pricing in India, including scope, users, integrations, maintenance and monthly subscription options.',
    category: 'Pricing',
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    readingMinutes: 7,
    intro: 'The useful answer to “How much does custom software cost?” starts with the work the system must manage. A focused internal tool and a multi-team ERP are not the same project, even when both are called custom software.',
    sections: [
      {
        heading: 'What changes the price of custom software?',
        paragraphs: ['The number of screens is only one part of the scope. Pricing is shaped by the business rules behind those screens: who can approve an order, when stock should change, which records must be private and what happens when a payment or integration fails.'],
        bullets: ['Modules and workflow complexity', 'Number of users and access roles', 'Connections to payment, accounting or messaging tools', 'Existing data that must be cleaned and moved', 'Reports, approvals and audit history', 'Support and improvements after launch'],
      },
      {
        heading: 'Compare the full operating cost, not only the build quote',
        paragraphs: ['A one-time quote may exclude hosting, fixes, backups and later changes. A per-user product may look inexpensive until a growing team needs several paid add-ons. Compare what happens after launch as carefully as the initial price.', 'Upcurv Custom SaaS starts from ₹699 per month. The final monthly amount depends on modules, users and integrations, and is shared after the workflow is understood.'],
      },
      {
        heading: 'When a monthly model can make sense',
        paragraphs: ['A maintained monthly system can suit a small business that needs to replace spreadsheets, paper or disconnected tools without funding a large traditional project at once. It also keeps maintenance and gradual improvement in the same relationship.', 'Custom software is not automatically the right choice. If a ready-made product already handles your workflow well, adopting it may be faster. A custom system becomes more useful when repeated workarounds, missed follow-ups or duplicate data are affecting daily operations.'],
      },
      {
        heading: 'Prepare for a useful pricing conversation',
        paragraphs: ['Document one real process from beginning to end. Include who starts it, what information they collect, who approves it and where delays happen. This gives a software team enough context to propose a focused first phase instead of an oversized feature list.'],
        bullets: ['What are you managing today?', 'Which step causes the most delay or error?', 'Who needs access?', 'Which existing tools must remain?', 'What result would make the first version worthwhile?'],
      },
    ],
    relatedSlugs: ['small-business-crm-india-guide', 'manual-workflow-to-business-software'],
  },
  {
    slug: 'small-business-crm-india-guide',
    title: 'CRM Software for Small Businesses in India: A Practical Selection Guide',
    description: 'Learn what a small-business CRM should manage, when a ready-made CRM works and when a custom CRM may be a better fit.',
    category: 'Business Software',
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    readingMinutes: 6,
    intro: 'A useful CRM should make the next customer action obvious. It should reduce missed follow-ups, show where each opportunity stands and give the team one reliable customer history.',
    sections: [
      {
        heading: 'Start with the sales process, not the feature list',
        paragraphs: ['Write down how a new enquiry arrives, who responds, how qualification happens and what turns it into an order. This exposes the stages and reminders the CRM actually needs.'],
        bullets: ['Lead source and contact details', 'Owner and next follow-up date', 'Stage, value and probability', 'Notes, calls and shared documents', 'Quotation or order outcome', 'Reason for a lost opportunity'],
      },
      {
        heading: 'When a ready-made CRM is enough',
        paragraphs: ['Choose a standard CRM when your team can follow common lead and deal stages, and when the integrations you need are already available. Configuration is usually faster than building a new system.', 'Avoid adding fields simply because they are available. Every required field creates work for the person entering data. Keep only information that helps someone make a decision or complete the next step.'],
      },
      {
        heading: 'When a custom CRM is worth considering',
        paragraphs: ['A custom CRM can help when sales is tightly connected to a specialised operation such as property visits, dealer allocation, service scheduling or multi-step approvals. In these cases, forcing the team to copy data between a CRM and separate operational sheets creates another problem.', 'The first version can focus on leads, follow-ups and one important handoff. Inventory, billing or customer portals can be added when the core process is working.'],
      },
      {
        heading: 'Questions to ask before choosing',
        paragraphs: ['Test the software with a real enquiry rather than a polished demo. Confirm what the salesperson sees on mobile, how managers find overdue work and how records are exported if you later move.'],
        bullets: ['Can the team update it quickly from a phone?', 'Can managers see overdue follow-ups?', 'Can permissions match real responsibilities?', 'Can existing contacts be imported cleanly?', 'Does pricing still work as the team grows?'],
      },
    ],
    relatedSlugs: ['custom-software-development-cost-india', 'manual-workflow-to-business-software'],
  },
  {
    slug: 'marriage-hall-booking-management-software',
    title: 'Marriage Hall Booking Management Software: From Enquiry to Event Day',
    description: 'See how marriage hall management software can organise enquiries, booking dates, payments and event coordination in one workflow.',
    category: 'Workflow Guides',
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    readingMinutes: 6,
    intro: 'Venue teams often manage calls, WhatsApp messages, paper diaries and payment notes at the same time. The risk is not the paper itself; it is that no single view shows the latest enquiry, confirmed date, balance and event requirements together.',
    sections: [
      {
        heading: 'Where manual venue booking breaks down',
        paragraphs: ['A date may look available in one diary while another staff member has already promised it to a customer. Enquiries can be missed when they stay inside one person’s phone, and payment follow-ups become difficult when receipts and notes are separated.'],
        bullets: ['Missed enquiries and delayed callbacks', 'Date collisions or uncertain availability', 'Scattered customer and event details', 'Advance and balance payments tracked separately', 'Last-minute coordination without a shared checklist'],
      },
      {
        heading: 'What one booking workflow should show',
        paragraphs: ['A venue system should connect the customer enquiry to a tentative date, confirmed booking, payment schedule and event checklist. Staff should be able to see what changed and what needs attention without searching several places.'],
        bullets: ['Live calendar with tentative and confirmed statuses', 'Customer, event and package details', 'Advance, balance and due-date tracking', 'Task ownership for event preparation', 'Clear notes and history for every booking'],
      },
      {
        heading: 'Prevent conflicts without slowing the team',
        paragraphs: ['Conflict prevention should happen at the point of booking. The system can warn the user when a requested hall, room or time slot overlaps an existing commitment. A clear hold policy also prevents tentative enquiries from blocking dates forever.', 'Access roles matter too. A receptionist may create enquiries, while only an authorised manager confirms discounts, cancellations or refunds.'],
      },
      {
        heading: 'Begin with the calendar and enquiry handoff',
        paragraphs: ['The most useful first phase is often smaller than a complete venue ERP. Start by bringing enquiries and bookings into one calendar, then connect payments and event preparation after the team consistently uses the core workflow.', 'Upcurv builds custom venue workflows and also offers Upcurv Halls for venue operations. The right starting point depends on how your hall currently handles bookings.'],
      },
    ],
    relatedSlugs: ['manual-workflow-to-business-software', 'custom-software-development-cost-india'],
  },
  {
    slug: 'manual-workflow-to-business-software',
    title: 'How to Turn a Manual Business Workflow into Useful Software',
    description: 'A step-by-step guide to mapping WhatsApp, Excel and paper-based work before building business management software.',
    category: 'Workflow Guides',
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    readingMinutes: 7,
    intro: 'Good business software does not begin with a dashboard. It begins with a clear picture of the work people already do, the decisions they make and the information that gets lost between steps.',
    sections: [
      {
        heading: 'Choose one workflow with a visible problem',
        paragraphs: ['Do not start by trying to digitise the whole company. Pick one process where delay, duplicate entry, missed follow-up or unclear ownership is easy to observe. Orders, enquiries, stock requests and service jobs are common starting points.'],
      },
      {
        heading: 'Map the current process honestly',
        paragraphs: ['Record the actual process, including the WhatsApp message, spreadsheet and informal approval that people use today. Designing around an ideal process that nobody follows produces software the team will avoid.'],
        bullets: ['Trigger: what starts the work?', 'Inputs: what information is required?', 'Owner: who acts at each step?', 'Decision: what changes the path?', 'Output: what marks the work complete?', 'Exception: what usually goes wrong?'],
      },
      {
        heading: 'Design the smallest complete loop',
        paragraphs: ['A first release should complete a useful loop. For example, an enquiry system might capture a lead, assign an owner, schedule the next action and record the outcome. A collection of disconnected forms is not yet a workflow.', 'Measure whether the new process reduces missed work or makes status easier to see. That evidence should guide the next module.'],
      },
      {
        heading: 'Plan adoption as part of the software',
        paragraphs: ['People need to understand what the system replaces and which record is now the source of truth. Keep mobile entry short, use familiar terms and make overdue actions visible. Managers should reinforce the workflow instead of asking for separate spreadsheet reports.'],
      },
      {
        heading: 'Improve after real use',
        paragraphs: ['Real usage reveals exceptions that workshops miss. Review feedback after the team has completed enough real transactions, then improve the highest-friction step. This is more reliable than trying to predict every feature before launch.'],
      },
    ],
    relatedSlugs: ['small-business-crm-india-guide', 'marriage-hall-booking-management-software'],
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);