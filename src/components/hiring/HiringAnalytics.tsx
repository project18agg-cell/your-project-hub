import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList, PieChart, Pie, Cell } from 'recharts';
import { CandidateApp } from './CandidateCard';
import { PIPELINE_STAGES } from './KanbanBoard';
import { Users, UserCheck, Calendar, Award, TrendingUp } from 'lucide-react';

interface HiringAnalyticsProps {
  apps: CandidateApp[];
}

const COLORS = ['hsl(220, 70%, 55%)', 'hsl(260, 60%, 55%)', 'hsl(40, 90%, 50%)', 'hsl(180, 60%, 45%)', 'hsl(280, 50%, 55%)', 'hsl(150, 60%, 45%)', 'hsl(120, 60%, 40%)', 'hsl(0, 60%, 50%)'];

export const HiringAnalytics = ({ apps }: HiringAnalyticsProps) => {
  const total = apps.length;
  const shortlisted = apps.filter(a => ['shortlisted', 'interview_scheduled', 'interview_completed', 'offer_sent', 'hired'].includes(a.pipeline_stage)).length;
  const interviews = apps.filter(a => ['interview_scheduled', 'interview_completed', 'offer_sent', 'hired'].includes(a.pipeline_stage)).length;
  const hired = apps.filter(a => a.pipeline_stage === 'hired').length;
  const conversionRate = total > 0 ? ((hired / total) * 100).toFixed(1) : '0';

  // Funnel data
  const funnelData = PIPELINE_STAGES.filter(s => s.key !== 'rejected').map(stage => ({
    name: stage.label,
    value: apps.filter(a => a.pipeline_stage === stage.key).length,
  }));

  // University distribution
  const uniCounts: Record<string, number> = {};
  apps.forEach(a => { uniCounts[a.college] = (uniCounts[a.college] || 0) + 1; });
  const uniData = Object.entries(uniCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name: name.length > 20 ? name.slice(0, 20) + '...' : name, value }));

  // Applications per day (last 14 days)
  const dayMap: Record<string, number> = {};
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dayMap[d.toISOString().split('T')[0]] = 0;
  }
  apps.forEach(a => {
    const day = a.created_at.split('T')[0];
    if (day in dayMap) dayMap[day]++;
  });
  const dailyData = Object.entries(dayMap).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    count,
  }));

  const metrics = [
    { label: 'Total Applications', value: total, icon: Users, color: 'text-blue-600' },
    { label: 'Shortlisted', value: shortlisted, icon: Award, color: 'text-amber-600' },
    { label: 'Interviews', value: interviews, icon: Calendar, color: 'text-cyan-600' },
    { label: 'Hired', value: hired, icon: UserCheck, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(m => (
          <Card key={m.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <m.icon className={`h-8 w-8 ${m.color}`} />
              <div>
                <div className="text-2xl font-bold text-foreground">{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <TrendingUp className="h-4 w-4" />
        <span>Conversion Rate: <strong className="text-foreground">{conversionRate}%</strong></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-sm">Applications per Day</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(220, 70%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Top Universities</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={uniData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={120} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(260, 60%, 55%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-sm">Hiring Funnel</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 h-[200px]">
              {funnelData.map((d, i) => {
                const maxVal = Math.max(...funnelData.map(f => f.value), 1);
                const height = (d.value / maxVal) * 180;
                return (
                  <div key={d.name} className="flex-1 flex flex-col items-center justify-end gap-1">
                    <span className="text-xs font-medium text-foreground">{d.value}</span>
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{ height: Math.max(height, 4), backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-[10px] text-muted-foreground text-center">{d.name}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
