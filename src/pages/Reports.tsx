import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PageHeader } from '@/components/shared/PageHeader';
import { formatCurrency, formatDate, capitalizeFirst } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DollarSign,
  Users,
  CreditCard,
  Handshake,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  RefreshCw,
  Calendar,
  Target,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ComposedChart,
} from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, eachMonthOfInterval, parseISO, isWithinInterval } from 'date-fns';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('monthly');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [rawData, setRawData] = useState<{
    subscriptions: any[];
    customers: any[];
    partners: any[];
    payouts: any[];
    expenses: any[];
    plans: any[];
  }>({
    subscriptions: [],
    customers: [],
    partners: [],
    payouts: [],
    expenses: [],
    plans: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        productsRes,
        subscriptionsRes,
        customersRes,
        partnersRes,
        payoutsRes,
        expensesRes,
        plansRes,
      ] = await Promise.all([
        supabase.from('products').select('id, name'),
        supabase.from('subscriptions').select('*, product:products(name), plan:plans(name, billing_cycle), customer:customers(business_name, city, business_type)'),
        supabase.from('customers').select('*'),
        supabase.from('partners').select('*'),
        supabase.from('partner_payouts').select('*, partner:partners(name)'),
        supabase.from('expenses').select('*, product:products(name)'),
        supabase.from('plans').select('*'),
      ]);

      setProducts(productsRes.data || []);
      setRawData({
        subscriptions: subscriptionsRes.data || [],
        customers: customersRes.data || [],
        partners: partnersRes.data || [],
        payouts: payoutsRes.data || [],
        expenses: expensesRes.data || [],
        plans: plansRes.data || [],
      });
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate date range
  const getDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case 'weekly':
        return { start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), end: now };
      case 'monthly':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'quarterly':
        return { start: subMonths(startOfMonth(now), 2), end: endOfMonth(now) };
      case 'yearly':
        return { start: subMonths(startOfMonth(now), 11), end: endOfMonth(now) };
      default:
        return { start: startOfMonth(now), end: endOfMonth(now) };
    }
  };

  // All cities from customers
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    rawData.customers.forEach((c) => {
      if (c.city) citySet.add(c.city);
    });
    return Array.from(citySet).sort();
  }, [rawData.customers]);

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    const { start, end } = getDateRange();
    
    let subs = rawData.subscriptions;
    
    // Filter by product
    if (selectedProduct !== 'all') {
      subs = subs.filter((s) => s.product_id === selectedProduct);
    }
    
    // Filter by city
    if (selectedCity !== 'all') {
      subs = subs.filter((s) => (s as any).customer?.city === selectedCity);
    }

    // Filter by date range
    subs = subs.filter((s) => {
      const subDate = parseISO(s.created_at);
      return isWithinInterval(subDate, { start, end });
    });

    return subs;
  }, [rawData, selectedProduct, selectedCity, dateRange]);

  // Calculate all metrics from real data
  const metrics = useMemo(() => {
    const { start, end } = getDateRange();
    const { subscriptions, customers, partners, payouts, expenses } = rawData;

    // Revenue metrics
    const paidSubs = filteredData.filter((s) => s.payment_status === 'paid');
    const activeSubs = subscriptions.filter((s) => s.status === 'active');
    const totalRevenue = paidSubs.reduce((sum, s) => sum + Number(s.amount), 0);
    const mrr = activeSubs.reduce((sum, s) => sum + Number(s.amount), 0);

    // Calculate actual renewal revenue (subscriptions renewed in period)
    const renewedSubs = subscriptions.filter((s) => {
      const updated = parseISO(s.updated_at);
      const created = parseISO(s.created_at);
      return isWithinInterval(updated, { start, end }) && updated > created && s.status === 'active';
    });
    const renewalRevenue = renewedSubs.reduce((sum, s) => sum + Number(s.amount), 0);

    // Churned revenue
    const churnedSubs = subscriptions.filter((s) => 
      s.status === 'cancelled' || s.status === 'expired'
    );
    const churnedRevenue = churnedSubs.reduce((sum, s) => sum + Number(s.amount), 0);

    // Subscription metrics
    const trialSubs = subscriptions.filter((s) => s.status === 'trial');
    const graceSubs = subscriptions.filter((s) => s.status === 'grace_period');
    const suspendedSubs = subscriptions.filter((s) => s.status === 'suspended');
    const expiredSubs = subscriptions.filter((s) => s.status === 'expired');
    
    // Conversion rate (paid subscriptions / total that ever went to trial)
    const everTrial = subscriptions.filter((s) => 
      s.status === 'trial' || s.status === 'active' || s.payment_status === 'paid'
    );
    const converted = subscriptions.filter((s) => s.payment_status === 'paid');
    const conversionRate = everTrial.length > 0 ? (converted.length / everTrial.length) * 100 : 0;

    // Customer metrics
    const activeCustomers = customers.filter((c) => c.status === 'active');
    const churnedCustomers = customers.filter((c) => c.status === 'churned');
    const newCustomers = customers.filter((c) => {
      const created = parseISO(c.created_at);
      return isWithinInterval(created, { start, end });
    });

    // Partner metrics
    const activePartners = partners.filter((p) => p.status === 'active');
    const paidPayouts = payouts.filter((p) => p.status === 'paid');
    const pendingPayouts = payouts.filter((p) => p.status === 'pending');
    const partnerRevenue = paidPayouts.reduce((sum, p) => sum + Number(p.amount), 0);
    const pendingPayoutsAmount = pendingPayouts.reduce((sum, p) => sum + Number(p.amount), 0);

    // Expense metrics
    const periodExpenses = expenses.filter((e) => {
      const date = parseISO(e.date);
      return isWithinInterval(date, { start, end });
    });
    const totalExpenses = periodExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const allTimeExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const allTimeRevenue = subscriptions
      .filter((s) => s.payment_status === 'paid')
      .reduce((sum, s) => sum + Number(s.amount), 0);

    return {
      revenue: {
        total: totalRevenue,
        mrr,
        arr: mrr * 12,
        renewal: renewalRevenue,
        churned: churnedRevenue,
        arpu: activeSubs.length > 0 ? mrr / activeSubs.length : 0,
      },
      subscriptions: {
        total: subscriptions.length,
        active: activeSubs.length,
        trial: trialSubs.length,
        grace: graceSubs.length,
        suspended: suspendedSubs.length,
        expired: expiredSubs.length,
        conversionRate,
      },
      customers: {
        total: customers.length,
        active: activeCustomers.length,
        churned: churnedCustomers.length,
        new: newCustomers.length,
        netGrowth: newCustomers.length - churnedCustomers.length,
      },
      partners: {
        total: partners.length,
        active: activePartners.length,
        revenue: partnerRevenue,
        pending: pendingPayoutsAmount,
      },
      expenses: {
        period: totalExpenses,
        allTime: allTimeExpenses,
        netProfit: allTimeRevenue - allTimeExpenses,
        margin: allTimeRevenue > 0 ? ((allTimeRevenue - allTimeExpenses) / allTimeRevenue) * 100 : 0,
      },
    };
  }, [rawData, filteredData, dateRange]);

  // Chart data calculations
  const chartData = useMemo(() => {
    const { subscriptions, customers, expenses, payouts } = rawData;

    // Revenue by product
    const productRevenue: Record<string, number> = {};
    subscriptions
      .filter((s) => s.payment_status === 'paid')
      .forEach((s) => {
        const name = (s as any).product?.name || 'Unknown';
        productRevenue[name] = (productRevenue[name] || 0) + Number(s.amount);
      });
    const revenueByProduct = Object.entries(productRevenue)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue);

    // Revenue by city
    const cityRevenue: Record<string, number> = {};
    subscriptions
      .filter((s) => s.payment_status === 'paid')
      .forEach((s) => {
        const city = (s as any).customer?.city || 'Unknown';
        cityRevenue[city] = (cityRevenue[city] || 0) + Number(s.amount);
      });
    const revenueByCity = Object.entries(cityRevenue)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Subscriptions by status
    const statusCounts: Record<string, number> = {};
    subscriptions.forEach((s) => {
      statusCounts[s.status] = (statusCounts[s.status] || 0) + 1;
    });
    const subscriptionsByStatus = Object.entries(statusCounts)
      .map(([name, value]) => ({ name: capitalizeFirst(name.replace('_', ' ')), value }))
      .filter((s) => s.value > 0);

    // Customers by type
    const typeCount: Record<string, number> = {};
    customers.forEach((c) => {
      typeCount[c.business_type] = (typeCount[c.business_type] || 0) + 1;
    });
    const customersByType = Object.entries(typeCount)
      .map(([name, value]) => ({ name: capitalizeFirst(name), value }))
      .sort((a, b) => b.value - a.value);

    // Customers by acquisition source
    const sourceCount: Record<string, number> = {};
    customers.forEach((c) => {
      sourceCount[c.acquisition_source] = (sourceCount[c.acquisition_source] || 0) + 1;
    });
    const customersBySource = Object.entries(sourceCount)
      .map(([name, value]) => ({ name: capitalizeFirst(name), value }))
      .sort((a, b) => b.value - a.value);

    // Expenses by category
    const categoryTotals: Record<string, number> = {};
    expenses.forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + Number(e.amount);
    });
    const expensesByCategory = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name: capitalizeFirst(name.replace(/_/g, ' ')), value }))
      .sort((a, b) => b.value - a.value);

    // Monthly trend (last 6 months)
    const last6Months = eachMonthOfInterval({
      start: subMonths(new Date(), 5),
      end: new Date(),
    });
    
    const monthlyTrend = last6Months.map((month) => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      
      const monthRevenue = subscriptions
        .filter((s) => {
          const date = parseISO(s.created_at);
          return s.payment_status === 'paid' && isWithinInterval(date, { start: monthStart, end: monthEnd });
        })
        .reduce((sum, s) => sum + Number(s.amount), 0);
      
      const monthExpenses = expenses
        .filter((e) => {
          const date = parseISO(e.date);
          return isWithinInterval(date, { start: monthStart, end: monthEnd });
        })
        .reduce((sum, e) => sum + Number(e.amount), 0);

      const monthCustomers = customers.filter((c) => {
        const date = parseISO(c.created_at);
        return isWithinInterval(date, { start: monthStart, end: monthEnd });
      }).length;

      return {
        month: format(month, 'MMM yyyy'),
        revenue: monthRevenue,
        expenses: monthExpenses,
        profit: monthRevenue - monthExpenses,
        customers: monthCustomers,
      };
    });

    // Partner performance
    const partnerPerformance = rawData.partners.map((partner) => {
      const partnerPayouts = payouts.filter((p) => p.partner_id === partner.id);
      const paidAmount = partnerPayouts
        .filter((p) => p.status === 'paid')
        .reduce((sum, p) => sum + Number(p.amount), 0);
      const customerCount = customers.filter((c) => c.partner_id === partner.id).length;
      
      return {
        name: partner.name,
        customers: customerCount,
        commission: paidAmount,
        status: partner.status,
      };
    }).filter((p) => p.customers > 0 || p.commission > 0);

    // Top customers by revenue
    const customerRevenue: Record<string, { name: string; revenue: number; city: string }> = {};
    subscriptions
      .filter((s) => s.payment_status === 'paid')
      .forEach((s) => {
        const id = s.customer_id;
        const name = (s as any).customer?.business_name || 'Unknown';
        const city = (s as any).customer?.city || '';
        if (!customerRevenue[id]) {
          customerRevenue[id] = { name, revenue: 0, city };
        }
        customerRevenue[id].revenue += Number(s.amount);
      });
    const topCustomers = Object.values(customerRevenue)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 20);

    // Expiring subscriptions
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expiringThisWeek = subscriptions.filter((s) => {
      const endDate = parseISO(s.end_date);
      return s.status === 'active' && endDate >= now && endDate <= nextWeek;
    });

    return {
      revenueByProduct,
      revenueByCity,
      subscriptionsByStatus,
      customersByType,
      customersBySource,
      expensesByCategory,
      monthlyTrend,
      partnerPerformance,
      topCustomers,
      expiringThisWeek,
    };
  }, [rawData]);

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const MetricCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendUp,
    subtitle,
    className,
  }: {
    title: string;
    value: string | number;
    icon: typeof DollarSign;
    trend?: string;
    trendUp?: boolean;
    subtitle?: string;
    className?: string;
  }) => (
    <Card className={`zoho-card ${className || ''}`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-sm ${trendUp ? 'text-success' : 'text-destructive'}`}>
                {trendUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{trend}</span>
              </div>
            )}
          </div>
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Reports" description="Comprehensive business analytics" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
              <div className="h-7 w-16 bg-muted animate-pulse rounded" />
              <div className="h-3 w-32 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Reports"
        description="Comprehensive business analytics and insights from real data"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={fetchData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        }
      />

      {/* Global Filters */}
      <Card className="zoho-card">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Period:</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Product:</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">City:</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full max-w-3xl">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <MetricCard title="Total Revenue" value={formatCurrency(metrics.revenue.total)} icon={DollarSign} subtitle="This period" />
            <MetricCard title="MRR" value={formatCurrency(metrics.revenue.mrr)} icon={TrendingUp} />
            <MetricCard title="ARR" value={formatCurrency(metrics.revenue.arr)} icon={TrendingUp} />
            <MetricCard title="ARPU" value={formatCurrency(metrics.revenue.arpu)} icon={Target} subtitle="Per active sub" />
            <MetricCard title="Renewal Revenue" value={formatCurrency(metrics.revenue.renewal)} icon={RefreshCw} />
            <MetricCard title="Churned Revenue" value={formatCurrency(metrics.revenue.churned)} icon={TrendingDown} className="border-destructive/30" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Revenue by Product</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {chartData.revenueByProduct.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.revenueByProduct} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${v / 1000}k`} />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" width={100} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">No revenue data</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Revenue by City (Top 10)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {chartData.revenueByCity.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.revenueByCity}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} angle={-45} textAnchor="end" height={60} />
                        <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${v / 1000}k`} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="revenue" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">No city data</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Customers */}
          <Card className="zoho-card">
            <CardHeader>
              <CardTitle>Top 20 Customers by Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2 font-medium">#</th>
                      <th className="text-left py-2 px-2 font-medium">Customer</th>
                      <th className="text-left py-2 px-2 font-medium">City</th>
                      <th className="text-right py-2 px-2 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.topCustomers.map((customer, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-2 text-muted-foreground">{index + 1}</td>
                        <td className="py-2 px-2 font-medium">{customer.name}</td>
                        <td className="py-2 px-2 text-muted-foreground">{customer.city || '-'}</td>
                        <td className="py-2 px-2 text-right font-medium">{formatCurrency(customer.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <MetricCard title="Total" value={metrics.subscriptions.total} icon={CreditCard} />
            <MetricCard title="Active" value={metrics.subscriptions.active} icon={CreditCard} />
            <MetricCard title="Trial" value={metrics.subscriptions.trial} icon={CreditCard} />
            <MetricCard title="Grace" value={metrics.subscriptions.grace} icon={CreditCard} />
            <MetricCard title="Suspended" value={metrics.subscriptions.suspended} icon={CreditCard} />
            <MetricCard title="Conversion %" value={`${metrics.subscriptions.conversionRate.toFixed(1)}%`} icon={Target} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Subscriptions by Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  {chartData.subscriptionsByStatus.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.subscriptionsByStatus}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {chartData.subscriptionsByStatus.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No subscription data</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Expiring This Week */}
            <Card className="zoho-card border-warning/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Expiring This Week ({chartData.expiringThisWeek.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-56">
                  {chartData.expiringThisWeek.length > 0 ? (
                    <div className="space-y-2">
                      {chartData.expiringThisWeek.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between p-2 rounded border">
                          <div>
                            <p className="font-medium">{(sub as any).customer?.business_name}</p>
                            <p className="text-sm text-muted-foreground">{(sub as any).product?.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(sub.amount)}</p>
                            <p className="text-xs text-muted-foreground">Expires: {formatDate(sub.end_date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No subscriptions expiring this week
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard title="Total Customers" value={metrics.customers.total} icon={Users} />
            <MetricCard title="Active" value={metrics.customers.active} icon={Users} />
            <MetricCard title="New (Period)" value={metrics.customers.new} icon={TrendingUp} trendUp />
            <MetricCard title="Churned" value={metrics.customers.churned} icon={TrendingDown} />
            <MetricCard 
              title="Net Growth" 
              value={metrics.customers.netGrowth} 
              icon={metrics.customers.netGrowth >= 0 ? TrendingUp : TrendingDown}
              trendUp={metrics.customers.netGrowth >= 0}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Customers by Business Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  {chartData.customersByType.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.customersByType}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {chartData.customersByType.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No customer data</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Customers by Acquisition Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  {chartData.customersBySource.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.customersBySource}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip />
                        <Bar dataKey="value" name="Customers" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No source data</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard title="Total Partners" value={metrics.partners.total} icon={Handshake} />
            <MetricCard title="Active Partners" value={metrics.partners.active} icon={Handshake} />
            <MetricCard title="Commissions Paid" value={formatCurrency(metrics.partners.revenue)} icon={DollarSign} />
            <MetricCard title="Pending Payouts" value={formatCurrency(metrics.partners.pending)} icon={DollarSign} className="border-warning/30" />
          </div>

          <Card className="zoho-card">
            <CardHeader>
              <CardTitle>Partner Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {chartData.partnerPerformance.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData.partnerPerformance.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="customers" name="Customers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="commission" name="Commission" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">No partner data</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard title="Period Expenses" value={formatCurrency(metrics.expenses.period)} icon={DollarSign} />
            <MetricCard title="Total Expenses" value={formatCurrency(metrics.expenses.allTime)} icon={DollarSign} />
            <MetricCard 
              title="Net Profit" 
              value={formatCurrency(metrics.expenses.netProfit)} 
              icon={metrics.expenses.netProfit >= 0 ? TrendingUp : TrendingDown}
              trendUp={metrics.expenses.netProfit >= 0}
            />
            <MetricCard title="Profit Margin" value={`${metrics.expenses.margin.toFixed(1)}%`} icon={Target} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  {chartData.expensesByCategory.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.expensesByCategory}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {chartData.expensesByCategory.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No expense data</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {chartData.expensesByCategory.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.expensesByCategory} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${v / 1000}k`} />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" width={120} fontSize={12} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="value" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">No expense data</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="zoho-card">
            <CardHeader>
              <CardTitle>Revenue vs Expenses (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${v / 1000}k`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" name="Revenue" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" />
                    <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--destructive) / 0.8)" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="profit" name="Profit" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: 'hsl(var(--success))' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="zoho-card">
            <CardHeader>
              <CardTitle>Customer Growth Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Area type="monotone" dataKey="customers" name="New Customers" fill="hsl(var(--chart-3) / 0.3)" stroke="hsl(var(--chart-3))" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
