import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Users, Clock, MousePointer, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays, startOfDay } from 'date-fns';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const periodDays: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };

const Analytics = () => {
  const [period, setPeriod] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [dailyViews, setDailyViews] = useState<any[]>([]);
  const [pageViews, setPageViews] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const days = periodDays[period] || 7;
      const since = startOfDay(subDays(new Date(), days)).toISOString();

      const { data: raw } = await supabase
        .from('page_views' as any)
        .select('*')
        .gte('created_at', since)
        .order('created_at', { ascending: true });

      const rows: any[] = raw || [];
      setTotalViews(rows.length);

      const uniqueVisitors = new Set(rows.map(r => r.visitor_id)).size;
      setTotalVisitors(uniqueVisitors);
      const uniqueSessions = new Set(rows.map(r => r.session_id)).size;
      setTotalSessions(uniqueSessions);

      // Daily views
      const byDay: Record<string, { views: number; visitors: Set<string> }> = {};
      rows.forEach(r => {
        const day = format(new Date(r.created_at), 'MMM dd');
        if (!byDay[day]) byDay[day] = { views: 0, visitors: new Set() };
        byDay[day].views++;
        byDay[day].visitors.add(r.visitor_id);
      });
      setDailyViews(Object.entries(byDay).map(([day, d]) => ({ day, views: d.views, visitors: d.visitors.size })));

      // Page views
      const byPage: Record<string, number> = {};
      rows.forEach(r => { byPage[r.page_path] = (byPage[r.page_path] || 0) + 1; });
      setPageViews(Object.entries(byPage).map(([page, views]) => ({ page: page === '/' ? 'Home' : page.replace(/^\//, '').replace(/-/g, ' '), views })).sort((a, b) => b.views - a.views));

      // Devices
      const deviceMap: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
      rows.forEach(r => {
        const w = r.screen_width || 1024;
        if (w < 768) deviceMap.Mobile++;
        else if (w < 1024) deviceMap.Tablet++;
        else deviceMap.Desktop++;
      });
      setDevices(Object.entries(deviceMap).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value })));

      // Sources (from referrer)
      const srcMap: Record<string, number> = {};
      rows.forEach(r => {
        let src = 'Direct';
        if (r.referrer) {
          try {
            const host = new URL(r.referrer).hostname;
            if (host.includes('google')) src = 'Google';
            else if (host.includes('facebook') || host.includes('instagram') || host.includes('twitter') || host.includes('linkedin')) src = 'Social';
            else src = host;
          } catch { src = 'Other'; }
        }
        srcMap[src] = (srcMap[src] || 0) + 1;
      });
      setSources(Object.entries(srcMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 6));

      setLoading(false);
    };

    fetchAnalytics();
  }, [period]);

  const ShimmerCard = () => (
    <div className="rounded-lg border bg-card p-6 space-y-3">
      <div className="h-3 w-24 bg-muted animate-pulse rounded" />
      <div className="h-7 w-16 bg-muted animate-pulse rounded" />
    </div>
  );

  const ShimmerChart = () => (
    <div className="rounded-lg border bg-card p-6 h-72 flex items-center justify-center">
      <div className="h-40 w-full bg-muted animate-pulse rounded" />
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Page Analytics" description="Public website visitor insights" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <ShimmerCard key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <ShimmerChart key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Page Analytics"
        description="Real-time public website visitor insights"
        actions={
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Page Views</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-bold">{totalVisitors.toLocaleString()}</p>
              </div>
              <Users className="h-6 w-6 text-info" />
            </div>
          </CardContent>
        </Card>
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sessions</p>
                <p className="text-2xl font-bold">{totalSessions.toLocaleString()}</p>
              </div>
              <Clock className="h-6 w-6 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pages Tracked</p>
                <p className="text-2xl font-bold">{pageViews.length}</p>
              </div>
              <MousePointer className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="zoho-card">
          <CardHeader><CardTitle>Daily Views & Visitors</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              {dailyViews.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyViews}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" strokeWidth={2} />
                    <Area type="monotone" dataKey="visitors" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2) / 0.1)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No data yet. Visit public pages to start tracking.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardHeader><CardTitle>Device Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              {devices.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={devices} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      {devices.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-sm">No data yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="zoho-card">
          <CardHeader><CardTitle>Traffic Sources</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              {sources.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sources}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No data yet</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card">
          <CardHeader><CardTitle>Top Pages</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pageViews.length > 0 ? pageViews.slice(0, 8).map((page, i) => (
                <div key={page.page} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground w-4">{i + 1}</span>
                    <p className="font-medium text-sm capitalize">{page.page}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{page.views} views</Badge>
                </div>
              )) : (
                <p className="text-muted-foreground text-sm text-center py-8">No data yet. Visit public pages to start tracking.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
