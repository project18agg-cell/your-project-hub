import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  RefreshCw, 
  Play, 
  Pause, 
  DollarSign,
  Clock 
} from 'lucide-react';

interface ActivityLog {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  old_value: any;
  new_value: any;
  created_at: string;
}

interface ActivityTimelineProps {
  entityType?: string;
  entityId?: string;
  limit?: number;
  showCard?: boolean;
}

export const ActivityTimeline = ({ 
  entityType, 
  entityId, 
  limit = 20,
  showCard = true 
}: ActivityTimelineProps) => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [entityType, entityId]);

  const fetchActivities = async () => {
    try {
      let query = supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (entityType) {
        query = query.eq('entity_type', entityType);
      }
      if (entityId) {
        query = query.eq('entity_id', entityId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('created')) return <Plus className="h-4 w-4 text-success" />;
    if (action.includes('updated')) return <Pencil className="h-4 w-4 text-primary" />;
    if (action.includes('deleted')) return <Trash2 className="h-4 w-4 text-destructive" />;
    if (action.includes('renewed')) return <RefreshCw className="h-4 w-4 text-primary" />;
    if (action.includes('activated')) return <Play className="h-4 w-4 text-success" />;
    if (action.includes('suspended')) return <Pause className="h-4 w-4 text-warning" />;
    if (action.includes('paid')) return <DollarSign className="h-4 w-4 text-success" />;
    return <Clock className="h-4 w-4 text-muted-foreground" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('created')) return 'bg-success/10 text-success';
    if (action.includes('updated')) return 'bg-primary/10 text-primary';
    if (action.includes('deleted')) return 'bg-destructive/10 text-destructive';
    if (action.includes('renewed') || action.includes('activated')) return 'bg-success/10 text-success';
    if (action.includes('suspended')) return 'bg-warning/10 text-warning';
    return 'bg-muted text-muted-foreground';
  };

  const formatAction = (activity: ActivityLog) => {
    const entityLabel = activity.entity_type.replace('_', ' ');
    return `${activity.action} ${entityLabel}`;
  };

  const content = (
    <ScrollArea className={showCard ? "h-[400px]" : "h-full"}>
      {loading ? (
        <div className="space-y-4 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          No activity recorded yet
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4 p-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 relative">
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-background border">
                  {getActionIcon(activity.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={getActionColor(activity.action)}>
                      {formatAction(activity)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  {activity.new_value && (
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {typeof activity.new_value === 'object' 
                        ? JSON.stringify(activity.new_value).slice(0, 100)
                        : String(activity.new_value).slice(0, 100)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ScrollArea>
  );

  if (!showCard) return content;

  return (
    <Card className="zoho-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {content}
      </CardContent>
    </Card>
  );
};
