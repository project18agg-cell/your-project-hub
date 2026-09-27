import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardMetrics {
  activeCustomers: number;
  activeSubscriptions: number;
  mrr: number;
  netProfit: number;
  expiringThisWeek: number;
  graceCustomers: number;
  highRiskCustomers: number;
  totalRevenue: number;
  totalExpenses: number;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentCustomers, setRecentCustomers] = useState<any[]>([]);
  const [expiringSubscriptions, setExpiringSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch metrics in parallel
      const [
        customersRes,
        subscriptionsRes,
        expensesRes,
        expiringRes,
        recentRes,
      ] = await Promise.all([
        supabase.from('customers').select('id, status, risk_tag'),
        supabase.from('subscriptions').select('id, status, amount, end_date, payment_status'),
        supabase.from('expenses').select('amount'),
        supabase
          .from('subscriptions')
          .select('*, customer:customers(business_name), product:products(name)')
          .gte('end_date', new Date().toISOString().split('T')[0])
          .lte('end_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
          .eq('status', 'active')
          .limit(5),
        supabase
          .from('customers')
          .select('id, business_name, owner_name, status, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      const customers = customersRes.data || [];
      const subscriptions = subscriptionsRes.data || [];
      const expenses = expensesRes.data || [];

      const activeCustomers = customers.filter((c) => c.status === 'active').length;
      const graceCustomers = customers.filter((c) => c.status === 'grace').length;
      const highRiskCustomers = customers.filter((c) => c.risk_tag).length;

      const activeSubscriptions = subscriptions.filter((s) => s.status === 'active').length;
      const paidSubscriptions = subscriptions.filter((s) => s.payment_status === 'paid');
      const totalRevenue = paidSubscriptions.reduce((sum, s) => sum + Number(s.amount), 0);
      
      // Calculate MRR from active monthly subscriptions
      const mrr = subscriptions
        .filter((s) => s.status === 'active')
        .reduce((sum, s) => sum + Number(s.amount), 0);

      const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
      const netProfit = totalRevenue - totalExpenses;

      setMetrics({
        activeCustomers,
        activeSubscriptions,
        mrr,
        netProfit,
        expiringThisWeek: expiringRes.data?.length || 0,
        graceCustomers,
        highRiskCustomers,
        totalRevenue,
        totalExpenses,
      });

      setExpiringSubscriptions(expiringRes.data || []);
      setRecentCustomers(recentRes.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendUp,
    color = 'primary',
  }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    trend?: string;
    trendUp?: boolean;
    color?: string;
  }) => (
    <Card className="zoho-card">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-sm ${trendUp ? 'text-success' : 'text-destructive'}`}>
                {trendUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span>{trend}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-${color}/10`}>
            <Icon className={`h-6 w-6 text-${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
              <div className="h-7 w-16 bg-muted animate-pulse rounded" />
              <div className="h-3 w-32 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
              <div className="h-3 w-20 bg-muted animate-pulse rounded" />
              <div className="h-7 w-12 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Business overview at a glance</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Customers"
          value={metrics?.activeCustomers || 0}
          icon={Users}
          color="primary"
        />
        <MetricCard
          title="Active Subscriptions"
          value={metrics?.activeSubscriptions || 0}
          icon={CreditCard}
          color="info"
        />
        <MetricCard
          title="Monthly Revenue (MRR)"
          value={formatCurrency(metrics?.mrr || 0)}
          icon={DollarSign}
          color="success"
        />
        <MetricCard
          title="Net Profit"
          value={formatCurrency(metrics?.netProfit || 0)}
          icon={TrendingUp}
          color={(metrics?.netProfit || 0) >= 0 ? 'success' : 'destructive'}
        />
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="zoho-card border-l-4 border-l-warning">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{metrics?.expiringThisWeek || 0}</p>
                <p className="text-sm text-muted-foreground">Expiring This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card border-l-4 border-l-info">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-info" />
              <div>
                <p className="text-2xl font-bold">{metrics?.graceCustomers || 0}</p>
                <p className="text-sm text-muted-foreground">Grace Period Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card border-l-4 border-l-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{metrics?.highRiskCustomers || 0}</p>
                <p className="text-sm text-muted-foreground">High Risk Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Customers */}
        <Card className="zoho-card">
          <CardHeader>
            <CardTitle className="text-lg">Recent Customers</CardTitle>
          </CardHeader>
          <CardContent>
            {recentCustomers.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No customers yet</p>
            ) : (
              <div className="space-y-3">
                {recentCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{customer.business_name}</p>
                      <p className="text-sm text-muted-foreground">{customer.owner_name}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`status-${customer.status}`}
                    >
                      {customer.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Expiring Subscriptions */}
        <Card className="zoho-card">
          <CardHeader>
            <CardTitle className="text-lg">Expiring This Week</CardTitle>
          </CardHeader>
          <CardContent>
            {expiringSubscriptions.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No subscriptions expiring</p>
            ) : (
              <div className="space-y-3">
                {expiringSubscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{sub.customer?.business_name}</p>
                      <p className="text-sm text-muted-foreground">{sub.product?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(sub.amount)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(sub.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
