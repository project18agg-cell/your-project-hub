import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SystemLog } from '@/types/database';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { formatDateTime } from '@/lib/format';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Activity, User, Calendar } from 'lucide-react';

const SystemLogs = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('create') || action.includes('add')) return 'bg-success/10 text-success';
    if (action.includes('update') || action.includes('edit')) return 'bg-info/10 text-info';
    if (action.includes('delete') || action.includes('remove')) return 'bg-destructive/10 text-destructive';
    return 'bg-muted text-muted-foreground';
  };

  const columns = [
    {
      key: 'created_at',
      label: 'Timestamp',
      render: (item: SystemLog) => (
        <span className="text-sm">{formatDateTime(item.created_at)}</span>
      ),
    },
    {
      key: 'action',
      label: 'Action',
      render: (item: SystemLog) => (
        <Badge variant="outline" className={getActionColor(item.action.toLowerCase())}>
          {item.action}
        </Badge>
      ),
    },
    {
      key: 'entity_type',
      label: 'Entity',
      render: (item: SystemLog) => (
        <span className="capitalize">{item.entity_type}</span>
      ),
    },
    {
      key: 'details',
      label: 'Details',
      render: (item: SystemLog) => (
        <span className="text-sm text-muted-foreground truncate max-w-xs block">
          {item.details ? JSON.stringify(item.details).slice(0, 50) + '...' : '-'}
        </span>
      ),
    },
  ];

  // Calculate summary
  const actionCounts = logs.reduce((acc, log) => {
    const action = log.action.toLowerCase();
    if (action.includes('create')) acc.creates++;
    else if (action.includes('update')) acc.updates++;
    else if (action.includes('delete')) acc.deletes++;
    else acc.others++;
    return acc;
  }, { creates: 0, updates: 0, deletes: 0, others: 0 });

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="System Logs" description="View all admin actions and system events" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Logs</p>
                <p className="text-2xl font-bold">{logs.length}</p>
              </div>
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card border-l-4 border-l-success">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Creates</p>
                <p className="text-2xl font-bold">{actionCounts.creates}</p>
              </div>
              <Activity className="h-6 w-6 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card border-l-4 border-l-info">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Updates</p>
                <p className="text-2xl font-bold">{actionCounts.updates}</p>
              </div>
              <Activity className="h-6 w-6 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="zoho-card border-l-4 border-l-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deletes</p>
                <p className="text-2xl font-bold">{actionCounts.deletes}</p>
              </div>
              <Activity className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={logs}
        columns={columns}
        searchPlaceholder="Search logs..."
        searchKeys={['action', 'entity_type']}
        loading={loading}
        emptyMessage="No system logs found."
      />
    </div>
  );
};

export default SystemLogs;
