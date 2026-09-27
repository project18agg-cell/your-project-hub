// Database Types for Internal SaaS Management System
// Using 'any' for joined data to avoid strict typing issues with Supabase queries

export type CustomerStatus = 'trial' | 'active' | 'grace' | 'suspended' | 'churned';
export type BusinessType = 'dealer' | 'grocery' | 'restaurant' | 'clothing' | 'other';
export type AcquisitionSource = 'direct' | 'partner' | 'referral';
export type ProductStatus = 'live' | 'beta' | 'disabled';
export type BillingCycle = 'monthly' | 'quarterly' | 'half_yearly' | 'yearly';
export type SubscriptionStatus = 'trial' | 'active' | 'grace_period' | 'suspended' | 'cancelled' | 'expired';
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'refunded';
export type PartnerType = 'sales' | 'implementor' | 'franchise';
export type PartnerStatus = 'active' | 'inactive';
export type PayoutStatus = 'pending' | 'paid';
export type ExpenseCategory = 'server_infra' | 'marketing' | 'partner_payouts' | 'salaries' | 'office_travel' | 'misc';
export type TicketType = 'support' | 'internal' | 'payment';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Customer {
  id: string;
  business_name: string;
  owner_name: string;
  phone: string;
  email: string | null;
  gst: string | null;
  city: string | null;
  district: string | null;
  state: string | null;
  business_type: BusinessType;
  status: CustomerStatus;
  risk_tag: string | null;
  priority_flag: boolean;
  notes: string | null;
  acquisition_source: AcquisitionSource;
  partner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  category: string | null;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  product_id: string;
  name: string;
  price: number;
  billing_cycle: BillingCycle;
  features: any;
  trial_days: number;
  grace_days: number;
  created_at: string;
  updated_at: string;
  product?: any;
}

export interface Partner {
  id: string;
  name: string;
  phone: string | null;
  city: string | null;
  district: string | null;
  partner_type: PartnerType;
  revenue_share_percent: number;
  status: PartnerStatus;
  assigned_cities: string[];
  allowed_products: string[];
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  customer_id: string;
  product_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  amount: number;
  payment_status: PaymentStatus;
  status: SubscriptionStatus;
  created_at: string;
  updated_at: string;
  customer?: any;
  product?: any;
  plan?: any;
}

export interface PartnerPayout {
  id: string;
  partner_id: string;
  subscription_id: string | null;
  amount: number;
  payout_date: string | null;
  status: PayoutStatus;
  created_at: string;
  updated_at: string;
  partner?: any;
  subscription?: any;
}

export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  amount: number;
  description: string | null;
  product_id: string | null;
  created_at: string;
  updated_at: string;
  product?: any;
}

export interface Ticket {
  id: string;
  ticket_type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  title: string;
  description: string | null;
  customer_id: string | null;
  subscription_id: string | null;
  assigned_partner_id: string | null;
  due_date: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  customer?: any;
  subscription?: any;
  partner?: any;
}

export interface ActivityLog {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  old_value: any;
  new_value: any;
  created_at: string;
}

export interface SystemLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  created_at: string;
}

// Form types for CRUD operations
export type CustomerFormData = Omit<Customer, 'id' | 'created_at' | 'updated_at'>;
export type ProductFormData = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type PlanFormData = Omit<Plan, 'id' | 'created_at' | 'updated_at' | 'product'>;
export type PartnerFormData = Omit<Partner, 'id' | 'created_at' | 'updated_at'>;
export type SubscriptionFormData = Omit<Subscription, 'id' | 'created_at' | 'updated_at' | 'customer' | 'product' | 'plan'>;
export type ExpenseFormData = Omit<Expense, 'id' | 'created_at' | 'updated_at' | 'product'>;
export type TicketFormData = Omit<Ticket, 'id' | 'created_at' | 'updated_at' | 'resolved_at' | 'customer' | 'subscription' | 'partner'>;
