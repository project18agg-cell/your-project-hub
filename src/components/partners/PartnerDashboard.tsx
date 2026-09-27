import { useState, useEffect, useMemo } from 'react';
import { Partner, PartnerPayout, Customer, Subscription } from '@/types/database';
import { formatCurrency } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  MapPin,
  Wallet,
  Target
} from 'lucide-react';

interface PartnerDashboardProps {
  partners: Partner[];
  payouts: PartnerPayout[];
  customers: Customer[];
  subscriptions: Subscription[];
}

export const PartnerDashboard = ({ 
  partners, 
  payouts, 
  customers, 
  subscriptions 
}: PartnerDashboardProps) => {
  const activePartners = partners.filter((p) => p.status === 'active');
  
  // Calculate metrics
  const metrics = useMemo(() => {
    const totalRevenue = payouts
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + Number(p.amount), 0);
    
    const pendingPayouts = payouts
      .filter((p) => p.status === 'pending')
      .reduce((sum, p) => sum + Number(p.amount), 0);
    
    const customersByPartner: Record<string, number> = {};
    customers.forEach((c) => {
      if (c.partner_id) {
        customersByPartner[c.partner_id] = (customersByPartner[c.partner_id] || 0) + 1;
      }
    });

    const partnerPerformance = partners.map((partner) => {
      const partnerPayouts = payouts.filter((p) => p.partner_id === partner.id);
      const paidAmount = partnerPayouts
        .filter((p) => p.status === 'paid')
        .reduce((sum, p) => sum + Number(p.amount), 0);
      const pendingAmount = partnerPayouts
        .filter((p) => p.status === 'pending')
        .reduce((sum, p) => sum + Number(p.amount), 0);
      const customerCount = customersByPartner[partner.id] || 0;
      
      // Calculate partner's generated revenue (based on their customers' subscriptions)
      const partnerCustomerIds = customers
        .filter((c) => c.partner_id === partner.id)
        .map((c) => c.id);
      const generatedRevenue = subscriptions
        .filter((s) => partnerCustomerIds.includes(s.customer_id) && s.payment_status === 'paid')
        .reduce((sum, s) => sum + Number(s.amount), 0);
      
      const expectedCommission = generatedRevenue * (partner.revenue_share_percent / 100);

      return {
        id: partner.id,
        name: partner.name,
        type: partner.partner_type,
        city: partner.city,
        status: partner.status,
        revenueShare: partner.revenue_share_percent,
        customers: customerCount,
        generatedRevenue,
        paidAmount,
        pendingAmount,
        expectedCommission,
        assignedCities: partner.assigned_cities?.length || 0,
      };
    }).sort((a, b) => b.generatedRevenue - a.generatedRevenue);

    // Revenue by partner type
    const revenueByType: Record<string, number> = {};
    partnerPerformance.forEach((p) => {
      revenueByType[p.type] = (revenueByType[p.type] || 0) + p.generatedRevenue;
    });

    // Territory coverage
    const cityCoverage: Record<string, string[]> = {};
    partners.forEach((p) => {
      (p.assigned_cities || []).forEach((city) => {
        if (!cityCoverage[city]) {
          cityCoverage[city] = [];
        }
        cityCoverage[city].push(p.name);
      });
    });

    return {
      totalRevenue,
      pendingPayouts,
      partnerPerformance,
      revenueByType: Object.entries(revenueByType).map(([name, value]) => ({ name, value })),
      cityCoverage,
      totalPartners: partners.length,
      activePartners: activePartners.length,
      totalCustomersViaPartners: Object.values(customersByPartner).reduce((a, b) => a + b, 0),
    };
  }, [partners, payouts, customers, subscriptions]);

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  const topPartners = metrics.partnerPerformance.slice(0, 5);
  const partnerChartData = topPartners.map((p) => ({
    name: p.name.slice(0, 15),
    revenue: p.generatedRevenue,
    commission: p.paidAmount,
  }));

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Partners</p>
                <p className="text-2xl font-bold mt-1">{metrics.activePartners}</p>
                <p className="text-xs text-muted-foreground mt-1">of {metrics.totalPartners} total</p>
              </div>
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Commissions Paid</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(metrics.totalRevenue)}</p>
              </div>
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payouts</p>
                <p className="text-2xl font-bold mt-1 text-warning">{formatCurrency(metrics.pendingPayouts)}</p>
              </div>
              <Wallet className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Customers via Partners</p>
                <p className="text-2xl font-bold mt-1">{metrics.totalCustomersViaPartners}</p>
              </div>
              <Target className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="commissions">Commission Calculator</TabsTrigger>
          <TabsTrigger value="territory">Territory Management</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Top Partners by Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={partnerChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${v / 1000}k`} />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="revenue" name="Generated Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="commission" name="Commission Paid" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Revenue by Partner Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  {metrics.revenueByType.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={metrics.revenueByType}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {metrics.revenueByType.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No revenue data</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partner Rankings */}
          <Card className="zoho-card">
            <CardHeader>
              <CardTitle>Partner Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.partnerPerformance.slice(0, 10).map((partner, index) => (
                  <div key={partner.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{partner.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {partner.customers} customers • {partner.city || 'No city'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(partner.generatedRevenue)}</p>
                          <p className="text-sm text-muted-foreground">
                            {partner.revenueShare}% share
                          </p>
                        </div>
                      </div>
                      <Progress 
                        value={(partner.generatedRevenue / (topPartners[0]?.generatedRevenue || 1)) * 100} 
                        className="h-1.5 mt-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commission Calculator Tab */}
        <TabsContent value="commissions" className="space-y-6">
          <Card className="zoho-card">
            <CardHeader>
              <CardTitle>Commission Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Partner</th>
                      <th className="text-left py-3 px-2 font-medium">Type</th>
                      <th className="text-right py-3 px-2 font-medium">Revenue Generated</th>
                      <th className="text-right py-3 px-2 font-medium">Share %</th>
                      <th className="text-right py-3 px-2 font-medium">Expected Commission</th>
                      <th className="text-right py-3 px-2 font-medium">Paid</th>
                      <th className="text-right py-3 px-2 font-medium">Pending</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.partnerPerformance.map((partner) => (
                      <tr key={partner.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <div>
                            <p className="font-medium">{partner.name}</p>
                            <p className="text-sm text-muted-foreground">{partner.city || '-'}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline" className="capitalize">{partner.type}</Badge>
                        </td>
                        <td className="py-3 px-2 text-right font-medium">
                          {formatCurrency(partner.generatedRevenue)}
                        </td>
                        <td className="py-3 px-2 text-right">{partner.revenueShare}%</td>
                        <td className="py-3 px-2 text-right font-medium">
                          {formatCurrency(partner.expectedCommission)}
                        </td>
                        <td className="py-3 px-2 text-right text-success">
                          {formatCurrency(partner.paidAmount)}
                        </td>
                        <td className="py-3 px-2 text-right text-warning">
                          {formatCurrency(partner.pendingAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Territory Management Tab */}
        <TabsContent value="territory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>City Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(metrics.cityCoverage).map(([city, partnerNames]) => (
                    <div key={city} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{city}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {partnerNames.map((name) => (
                          <Badge key={name} variant="secondary" className="text-xs">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  {Object.keys(metrics.cityCoverage).length === 0 && (
                    <p className="text-muted-foreground text-center py-8">No territories assigned yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="zoho-card">
              <CardHeader>
                <CardTitle>Partner Territories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activePartners.map((partner) => (
                    <div key={partner.id} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{partner.name}</span>
                        <Badge variant="outline" className="capitalize">{partner.partner_type}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(partner.assigned_cities || []).length > 0 ? (
                          partner.assigned_cities?.map((city) => (
                            <Badge key={city} variant="secondary" className="text-xs">
                              {city}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">No cities assigned</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
