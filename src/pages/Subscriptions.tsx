import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Subscription, SubscriptionFormData, SubscriptionStatus, PaymentStatus } from '@/types/database';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { DetailView } from '@/components/shared/DetailView';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { MonthTimeline } from '@/components/subscriptions/MonthTimeline';
import { formatDate, formatCurrency } from '@/lib/format';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, DollarSign, RefreshCw, Pause, Play, XCircle, CheckCircle, List, CalendarDays } from 'lucide-react';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [customers, setCustomers] = useState<{ id: string; business_name: string }[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [plans, setPlans] = useState<{ id: string; name: string; price: number; product_id: string; billing_cycle: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [formData, setFormData] = useState<Partial<SubscriptionFormData>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subsRes, custRes, prodRes, plansRes] = await Promise.all([
        supabase
          .from('subscriptions')
          .select('*, customer:customers(business_name, owner_name), product:products(name), plan:plans(name, price, billing_cycle)')
          .order('created_at', { ascending: false }),
        supabase.from('customers').select('id, business_name'),
        supabase.from('products').select('id, name').eq('status', 'live'),
        supabase.from('plans').select('id, name, price, product_id, billing_cycle'),
      ]);

      if (subsRes.error) throw subsRes.error;
      setSubscriptions(subsRes.data || []);
      setCustomers(custRes.data || []);
      setProducts(prodRes.data || []);
      setPlans(plansRes.data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const calculateEndDate = (startDate: string, billingCycle: string): string => {
    const start = new Date(startDate);
    switch (billingCycle) {
      case 'monthly':
        start.setMonth(start.getMonth() + 1);
        break;
      case 'quarterly':
        start.setMonth(start.getMonth() + 3);
        break;
      case 'half_yearly':
        start.setMonth(start.getMonth() + 6);
        break;
      case 'yearly':
        start.setFullYear(start.getFullYear() + 1);
        break;
      default:
        start.setMonth(start.getMonth() + 1);
    }
    return start.toISOString().split('T')[0];
  };

  const handleAdd = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      customer_id: '',
      product_id: '',
      plan_id: '',
      start_date: today,
      end_date: calculateEndDate(today, 'monthly'),
      amount: 0,
      payment_status: 'pending',
      status: 'trial',
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = () => {
    if (selectedSubscription) {
      setFormData(selectedSubscription);
      setIsEditing(true);
      setShowDetail(false);
      setShowForm(true);
    }
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        ...formData,
        amount: Number(formData.amount),
      };

      if (isEditing && selectedSubscription) {
        const { error } = await supabase
          .from('subscriptions')
          .update(dataToSave as any)
          .eq('id', selectedSubscription.id);
        if (error) throw error;
        toast.success('Subscription updated');
      } else {
        const { error } = await supabase.from('subscriptions').insert(dataToSave as any);
        if (error) throw error;
        toast.success('Subscription created');
      }
      setShowForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save subscription');
    }
  };

  const handleDelete = async () => {
    if (!selectedSubscription) return;
    try {
      const { error } = await supabase.from('subscriptions').delete().eq('id', selectedSubscription.id);
      if (error) throw error;
      toast.success('Subscription deleted');
      setShowDelete(false);
      setShowDetail(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete subscription');
    }
  };

  const handleStatusChange = async (subscription: Subscription, newStatus: SubscriptionStatus) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: newStatus })
        .eq('id', subscription.id);
      if (error) throw error;
      toast.success(`Subscription ${newStatus}`);
      if (selectedSubscription?.id === subscription.id) {
        setSelectedSubscription({ ...selectedSubscription, status: newStatus });
      }
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const handleRenew = async (subscription: Subscription) => {
    const plan = plans.find((p) => p.id === subscription.plan_id);
    const billingCycle = plan?.billing_cycle || 'monthly';
    const newEndDate = calculateEndDate(subscription.end_date, billingCycle);
    
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          end_date: newEndDate,
          status: 'active',
          payment_status: 'pending',
        })
        .eq('id', subscription.id);
      if (error) throw error;
      toast.success('Subscription renewed');
      fetchData();
      setShowDetail(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to renew');
    }
  };

  const handleMarkPaid = async (subscription: Subscription) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ payment_status: 'paid' })
        .eq('id', subscription.id);
      if (error) throw error;
      toast.success('Marked as paid');
      if (selectedSubscription?.id === subscription.id) {
        setSelectedSubscription({ ...selectedSubscription, payment_status: 'paid' });
      }
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update payment status');
    }
  };

  const handlePlanChange = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      const startDate = formData.start_date || new Date().toISOString().split('T')[0];
      setFormData({
        ...formData,
        plan_id: planId,
        amount: plan.price,
        end_date: calculateEndDate(startDate, plan.billing_cycle),
      });
    }
  };

  const filteredPlans = formData.product_id
    ? plans.filter((p) => p.product_id === formData.product_id)
    : plans;

  const columns = [
    {
      key: 'customer',
      label: 'Customer',
      render: (item: Subscription) => (
        <div>
          <p className="font-medium">{(item as any).customer?.business_name}</p>
          <p className="text-sm text-muted-foreground">{(item as any).customer?.owner_name}</p>
        </div>
      ),
    },
    {
      key: 'product',
      label: 'Product / Plan',
      render: (item: Subscription) => (
        <div>
          <p className="font-medium">{(item as any).product?.name}</p>
          <p className="text-sm text-muted-foreground">{(item as any).plan?.name}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (item: Subscription) => formatCurrency(item.amount),
    },
    {
      key: 'period',
      label: 'Period',
      render: (item: Subscription) => (
        <div className="text-sm">
          <p>{formatDate(item.start_date)}</p>
          <p className="text-muted-foreground">to {formatDate(item.end_date)}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Subscription) => <StatusBadge status={item.status} />,
    },
    {
      key: 'payment_status',
      label: 'Payment',
      render: (item: Subscription) => (
        <Badge
          variant="outline"
          className={
            item.payment_status === 'paid'
              ? 'bg-success/10 text-success'
              : item.payment_status === 'overdue'
              ? 'bg-destructive/10 text-destructive'
              : 'bg-warning/10 text-warning'
          }
        >
          {item.payment_status}
        </Badge>
      ),
    },
  ];

  // Summary stats
  const stats = {
    active: subscriptions.filter((s) => s.status === 'active').length,
    trial: subscriptions.filter((s) => s.status === 'trial').length,
    grace: subscriptions.filter((s) => s.status === 'grace_period').length,
    pending: subscriptions.filter((s) => s.payment_status === 'pending').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Subscriptions" 
        description="Manage customer subscriptions and billing"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('timeline')}
            >
              <CalendarDays className="h-4 w-4 mr-1" />
              Month View
            </Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">{stats.active}</p>
              </div>
              <Play className="h-6 w-6 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trial</p>
                <p className="text-2xl font-bold text-primary">{stats.trial}</p>
              </div>
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Grace Period</p>
                <p className="text-2xl font-bold text-warning">{stats.grace}</p>
              </div>
              <Pause className="h-6 w-6 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Payment Pending</p>
                <p className="text-2xl font-bold text-destructive">{stats.pending}</p>
              </div>
              <DollarSign className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {viewMode === 'list' ? (
        <DataTable
          data={subscriptions}
          columns={columns}
          onRowClick={(sub) => {
            setSelectedSubscription(sub);
            setShowDetail(true);
          }}
          onAdd={handleAdd}
          addLabel="Add Subscription"
          searchPlaceholder="Search subscriptions..."
          searchKeys={[]}
          loading={loading}
          emptyMessage="No subscriptions found."
        />
      ) : (
        <MonthTimeline
          subscriptions={subscriptions}
          onStatusChange={handleStatusChange}
          onMarkPaid={handleMarkPaid}
          onRenew={handleRenew}
          onSelect={(sub) => {
            setSelectedSubscription(sub);
            setShowDetail(true);
          }}
        />
      )}

      {/* Detail View */}
      <DetailView
        open={showDetail}
        onClose={() => setShowDetail(false)}
        title={`${(selectedSubscription as any)?.customer?.business_name || ''} Subscription`}
        onEdit={handleEdit}
        onDelete={() => setShowDelete(true)}
      >
        {selectedSubscription && (
          <div className="space-y-6">
            {/* Status & Payment */}
            <div className="flex items-center gap-4">
              <StatusBadge status={selectedSubscription.status} />
              <Badge
                variant="outline"
                className={
                  selectedSubscription.payment_status === 'paid'
                    ? 'bg-success/10 text-success'
                    : 'bg-warning/10 text-warning'
                }
              >
                {selectedSubscription.payment_status}
              </Badge>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium text-lg">{formatCurrency(selectedSubscription.amount)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Period</p>
                      <p className="font-medium">
                        {formatDate(selectedSubscription.start_date)} - {formatDate(selectedSubscription.end_date)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product & Plan Info */}
            <div className="p-4 rounded-lg border bg-muted/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Product</p>
                  <p className="font-medium">{(selectedSubscription as any).product?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-medium">{(selectedSubscription as any).plan?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Billing Cycle</p>
                  <p className="font-medium capitalize">{(selectedSubscription as any).plan?.billing_cycle?.replace('_', ' ')}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSubscription.status === 'trial' && (
                  <Button size="sm" onClick={() => handleStatusChange(selectedSubscription, 'active')}>
                    <Play className="h-4 w-4 mr-1" /> Activate
                  </Button>
                )}
                {selectedSubscription.status === 'active' && (
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange(selectedSubscription, 'suspended')}>
                    <Pause className="h-4 w-4 mr-1" /> Suspend
                  </Button>
                )}
                {selectedSubscription.status === 'suspended' && (
                  <Button size="sm" onClick={() => handleStatusChange(selectedSubscription, 'active')}>
                    <Play className="h-4 w-4 mr-1" /> Reactivate
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => handleRenew(selectedSubscription)}>
                  <RefreshCw className="h-4 w-4 mr-1" /> Renew
                </Button>
                {selectedSubscription.payment_status !== 'paid' && (
                  <Button size="sm" variant="outline" onClick={() => handleMarkPaid(selectedSubscription)}>
                    <CheckCircle className="h-4 w-4 mr-1" /> Mark Paid
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                  onClick={() => handleStatusChange(selectedSubscription, 'cancelled')}
                >
                  <XCircle className="h-4 w-4 mr-1" /> Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </DetailView>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Subscription' : 'Add Subscription'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Customer *</Label>
              <Select
                value={formData.customer_id}
                onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.business_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Product *</Label>
                <Select
                  value={formData.product_id}
                  onValueChange={(value) => setFormData({ ...formData, product_id: value, plan_id: '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Plan *</Label>
                <Select
                  value={formData.plan_id}
                  onValueChange={handlePlanChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredPlans.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} - {formatCurrency(p.price)} / {p.billing_cycle?.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="date"
                  value={formData.start_date || ''}
                  onChange={(e) => {
                    const plan = plans.find((p) => p.id === formData.plan_id);
                    setFormData({
                      ...formData,
                      start_date: e.target.value,
                      end_date: plan ? calculateEndDate(e.target.value, plan.billing_cycle) : formData.end_date,
                    });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date (Auto-calculated)</Label>
                <Input
                  type="date"
                  value={formData.end_date || ''}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Amount (from plan)</Label>
                <Input
                  type="number"
                  value={formData.amount || ''}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label>Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as SubscriptionStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="grace_period">Grace Period</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Status *</Label>
              <Select
                value={formData.payment_status}
                onValueChange={(value) => setFormData({ ...formData, payment_status: value as PaymentStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSave}>{isEditing ? 'Update' : 'Create'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Subscription"
        description={`Delete this subscription? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
      />
    </div>
  );
};

export default Subscriptions;
