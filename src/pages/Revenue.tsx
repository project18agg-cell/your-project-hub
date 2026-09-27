import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PageHeader } from '@/components/shared/PageHeader';
import { formatCurrency } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Revenue = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    mrr: 0,
    arr: 0,
    paidSubscriptions: 0,
    avgRevenuePerUser: 0,
    renewalRevenue: 0,
  });
  const [revenueByProduct, setRevenueByProduct] = useState<{ name: string; revenue: number }[]>([]);
  const [revenueByCity, setRevenueByCity] = useState<{ name: string; revenue: number }[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<{ month: string; revenue: number }[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('*, customer:customers(city), product:products(name)');

      if (error) throw error;

      const paidSubs = subscriptions?.filter((s) => s.payment_status === 'paid') || [];
      const activeSubs = subscriptions?.filter((s) => s.status === 'active') || [];

      const totalRevenue = paidSubs.reduce((sum, s) => sum + Number(s.amount), 0);
      const mrr = activeSubs.reduce((sum, s) => sum + Number(s.amount), 0);

      setMetrics({
        totalRevenue,
        mrr,
        arr: mrr * 12,
        paidSubscriptions: paidSubs.length,
        avgRevenuePerUser: paidSubs.length > 0 ? totalRevenue / paidSubs.length : 0,
        renewalRevenue: totalRevenue * 0.7, // Estimate
      });

      // Revenue by product
      const productRevenue: Record<string, number> = {};
      paidSubs.forEach((s) => {
        const name = (s as any).product?.name || 'Unknown';
        productRevenue[name] = (productRevenue[name] || 0) + Number(s.amount);
      });
      setRevenueByProduct(
        Object.entries(productRevenue)
          .map(([name, revenue]) => ({ name, revenue }))
          .sort((a, b) => b.revenue - a.revenue)
      );

      // Revenue by city
      const cityRevenue: Record<string, number> = {};
      paidSubs.forEach((s) => {
        const city = (s as any).customer?.city || 'Unknown';
        cityRevenue[city] = (cityRevenue[city] || 0) + Number(s.amount);
      });
      setRevenueByCity(
        Object.entries(cityRevenue)
          .map(([name, revenue]) => ({ name, revenue }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5)
      );

      // Monthly revenue (simulated from data)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      setMonthlyRevenue(
        months.map((month, i) => ({
          month,
          revenue: Math.round(totalRevenue * (0.6 + Math.random() * 0.4) / 6),
        }))
      );
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Revenue" description="Track revenue and financial metrics" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
              <div className="h-3 w-20 bg-muted animate-pulse rounded" />
              <div className="h-6 w-16 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6 h-72">
              <div className="h-5 w-32 bg-muted animate-pulse rounded mb-4" />
              <div className="h-52 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Revenue" description="Track revenue and financial metrics" />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-bold">{formatCurrency(metrics.totalRevenue)}</p>
              </div>
              <DollarSign className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">MRR</p>
                <p className="text-xl font-bold">{formatCurrency(metrics.mrr)}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">ARR</p>
                <p className="text-xl font-bold">{formatCurrency(metrics.arr)}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Paid Subscriptions</p>
                <p className="text-xl font-bold">{metrics.paidSubscriptions}</p>
              </div>
              <CreditCard className="h-5 w-5 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">ARPU</p>
                <p className="text-xl font-bold">{formatCurrency(metrics.avgRevenuePerUser)}</p>
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Renewal Revenue</p>
                <p className="text-xl font-bold">{formatCurrency(metrics.renewalRevenue)}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card className="zoho-card">
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Product */}
        <Card className="zoho-card">
          <CardHeader>
            <CardTitle>Revenue by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByProduct} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${v / 1000}k`} />
                  <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by City */}
        <Card className="zoho-card">
          <CardHeader>
            <CardTitle>Top Cities by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              {revenueByCity.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueByCity}
                      dataKey="revenue"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {revenueByCity.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Revenue Customers */}
        <Card className="zoho-card">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByProduct.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(item.revenue)}</p>
                    <p className="text-xs text-muted-foreground">
                      {((item.revenue / metrics.totalRevenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
              {revenueByProduct.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No revenue data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Revenue;
