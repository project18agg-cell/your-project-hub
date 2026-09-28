import { Building2, CarFront, ChartNoAxesCombined, Printer, Sparkles } from 'lucide-react';

export const externalDestinations = {
  hub: 'https://upcurvhub.upcurv.in',
  trade: 'https://upcurvtrade.upcurv.in',
  prints: 'https://upcurvprints.upcurv.in',
} as const;

export const publicPricing = {
  hub: {
    lister: { price: '₹999', term: '3 months', previousPrice: '₹1,197' },
    complete: { price: '₹2,999', term: '3 months', previousPrice: '₹3,597' },
  },
  trade: { price: 'Free', note: 'Promoted and top-featured placement is custom-priced.' },
  prints: { featured: '₹999–₹1,999/month', verified: '₹199/month' },
  customSaas: { price: '₹699/month' },
  halls: { price: '₹4,999/year', previousPrice: '₹6,999/year' },
} as const;

export const publicSolutions = [
  {
    key: 'upcurvhub',
    name: 'UpcurvHub',
    eyebrow: 'Automotive marketplace',
    prompt: 'Buy or sell used vehicles',
    description: 'Explore vehicles, connect with sellers and grow your vehicle listings.',
    action: 'Explore vehicles',
    href: externalDestinations.hub,
    icon: CarFront,
    tone: 'hub',
    workflow: ['List vehicle', 'Connect', 'Move forward'],
  },
  {
    key: 'upcurv_prints',
    name: 'Upcurv Prints',
    eyebrow: 'Print workflow',
    prompt: 'Manage your printing business',
    description: 'Make printing orders easier to receive, process and manage.',
    action: 'Get your shop started',
    href: externalDestinations.prints,
    icon: Printer,
    tone: 'prints',
    workflow: ['File received', 'Print queue', 'Completed'],
  },
  {
    key: 'upcurv_trade',
    name: 'Upcurv Trade',
    eyebrow: 'B2B and D2C marketplace',
    prompt: 'Connect your business to more opportunities',
    description: 'A B2B and D2C platform connecting buyers, suppliers, customers and service businesses across a wide range of categories.',
    action: 'Explore Upcurv Trade',
    href: externalDestinations.trade,
    icon: ChartNoAxesCombined,
    tone: 'trade',
    workflow: ['List', 'Connect', 'Trade'],
  },
  {
    key: 'custom_saas',
    name: 'Custom SaaS',
    eyebrow: 'Built around your workflow',
    prompt: 'Need software built for you?',
    description: "Tell us how your business works. We'll design software around your workflow.",
    action: 'Talk to an expert',
    href: '/custom-saas',
    icon: Sparkles,
    tone: 'saas',
    workflow: ['Map workflow', 'Build system', 'Improve monthly'],
  },
  {
    key: 'upcurv_halls',
    name: 'Upcurv Halls',
    eyebrow: 'Venue management',
    prompt: 'Run your venue in one place',
    description: 'Manage bookings, events, payments and venue operations with clarity.',
    action: 'Explore Upcurv Halls',
    href: '/upcurv-halls',
    icon: Building2,
    tone: 'halls',
    workflow: ['Book', 'Coordinate', 'Host'],
  },
] as const;
