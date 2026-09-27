import { useState, useMemo } from 'react';
import { Subscription, SubscriptionStatus } from '@/types/database';
import { formatDate, formatCurrency } from '@/lib/format';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Play,
  Pause,
  RefreshCw,
  CheckCircle
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachWeekOfInterval, startOfWeek, endOfWeek, isSameMonth, isWithinInterval, parseISO } from 'date-fns';

interface MonthTimelineProps {
  subscriptions: Subscription[];
  onStatusChange: (subscription: Subscription, newStatus: SubscriptionStatus) => void;
  onMarkPaid: (subscription: Subscription) => void;
  onRenew: (subscription: Subscription) => void;
  onSelect: (subscription: Subscription) => void;
}

export const MonthTimeline = ({ 
  subscriptions, 
  onStatusChange, 
  onMarkPaid, 
  onRenew,
  onSelect 
}: MonthTimelineProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const weeks = useMemo(() => {
    return eachWeekOfInterval({ start: monthStart, end: monthEnd }, { weekStartsOn: 1 });
  }, [currentMonth]);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      // Check if subscription overlaps with current month
      const subStart = parseISO(sub.start_date);
      const subEnd = parseISO(sub.end_date);
      
      const overlapsMonth = 
        isWithinInterval(subStart, { start: monthStart, end: monthEnd }) ||
        isWithinInterval(subEnd, { start: monthStart, end: monthEnd }) ||
        (subStart <= monthStart && subEnd >= monthEnd);

      if (!overlapsMonth) return false;
      if (statusFilter === 'all') return true;
      return sub.status === statusFilter;
    });
  }, [subscriptions, currentMonth, statusFilter]);

  const getWeekSubscriptions = (weekStart: Date) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    
    return filteredSubscriptions.filter((sub) => {
      const subEnd = parseISO(sub.end_date);
      return isWithinInterval(subEnd, { start: weekStart, end: weekEnd });
    });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getStatusCounts = () => {
    const counts: Record<string, number> = {
      active: 0,
      trial: 0,
      grace_period: 0,
      suspended: 0,
      cancelled: 0,
      expired: 0,
    };
    
    filteredSubscriptions.forEach((sub) => {
      counts[sub.status] = (counts[sub.status] || 0) + 1;
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Month Navigation & Filters */}
      <Card className="zoho-card">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">
                  {format(currentMonth, 'MMMM yyyy')}
                </h2>
              </div>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="grace_period">Grace Period</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status Summary */}
          <div className="flex flex-wrap gap-3 mt-4">
            {Object.entries(statusCounts).filter(([_, count]) => count > 0).map(([status, count]) => (
              <Badge 
                key={status} 
                variant="outline" 
                className="cursor-pointer hover:bg-muted"
                onClick={() => setStatusFilter(status === statusFilter ? 'all' : status)}
              >
                {status.replace('_', ' ')}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Timeline */}
      <div className="space-y-4">
        {weeks.map((weekStart, index) => {
          const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
          const weekSubs = getWeekSubscriptions(weekStart);
          
          // Only show weeks that have at least one day in the current month
          if (!isSameMonth(weekStart, currentMonth) && !isSameMonth(weekEnd, currentMonth)) {
            return null;
          }

          return (
            <Card key={index} className="zoho-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Week {index + 1}: {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weekSubs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No subscriptions ending this week</p>
                ) : (
                  <div className="space-y-3">
                    {weekSubs.map((sub) => (
                      <div 
                        key={sub.id}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => onSelect(sub)}
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{(sub as any).customer?.business_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(sub as any).product?.name} • {(sub as any).plan?.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(sub.amount)}</p>
                            <p className="text-xs text-muted-foreground">
                              Ends: {formatDate(sub.end_date)}
                            </p>
                          </div>

                          <StatusBadge status={sub.status} />

                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {sub.status === 'trial' && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => onStatusChange(sub, 'active')}
                                title="Activate"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            {sub.status === 'active' && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => onStatusChange(sub, 'suspended')}
                                title="Suspend"
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                            )}
                            {sub.status === 'suspended' && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => onStatusChange(sub, 'active')}
                                title="Reactivate"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => onRenew(sub)}
                              title="Renew"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            {sub.payment_status !== 'paid' && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => onMarkPaid(sub)}
                                title="Mark Paid"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
