export const useCasePages = [
  {
    slug: 'custom-crm-software',
    name: 'Custom CRM Software',
    title: 'Custom CRM Software for Small Business in India',
    h1: 'Custom CRM Software for Small Businesses in India',
    description: 'Affordable custom CRM software built around your sales process. Track leads, follow-ups and customers on a monthly subscription from ₹699/month.',
    intro: 'Stop losing leads in WhatsApp chats and spreadsheets. We build a CRM around how your team actually sells — your stages, your follow-ups, your reports.',
    examples: ['Lead capture from website, calls and WhatsApp', 'Custom sales stages and follow-up reminders', 'Customer history and notes in one place', 'Team-wise performance dashboards', 'Quotation and invoice tracking', 'Role-based access for staff'],
  },
  {
    slug: 'inventory-management-software',
    name: 'Inventory Management Software',
    title: 'Custom Inventory Management Software for Small Business',
    h1: 'Affordable Inventory Management Software Built for Your Business',
    description: 'Custom inventory management software for Indian retailers, distributors and manufacturers. Track stock, purchases and sales from ₹699/month.',
    intro: 'Know exactly what you have, where it is and when to reorder — without forcing your process into generic stock software.',
    examples: ['Multi-location stock tracking', 'Purchase and supplier management', 'Low-stock alerts and reorder levels', 'Sales, returns and stock movement history', 'Barcode-friendly item records', 'Stock valuation and reports'],
  },
  {
    slug: 'property-management-software',
    name: 'Property Management Software',
    title: 'Custom Property Management Software in India',
    h1: 'Custom Property Management Software for Real Estate Businesses',
    description: 'Custom property and real estate management software for Indian businesses. Manage listings, leads, site visits, tenants and payments from ₹699/month.',
    intro: 'Bring properties, enquiries, site visits, documents and payments into one system shaped around how your real estate business works.',
    examples: ['Property and unit listings', 'Lead and site visit tracking', 'Tenant and lease records', 'Rent and payment reminders', 'Document storage per property', 'Owner and agent dashboards'],
  },
] as const;

export type UseCasePage = (typeof useCasePages)[number];
