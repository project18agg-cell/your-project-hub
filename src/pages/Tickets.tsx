import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Ticket, TicketFormData, TicketType, TicketPriority, TicketStatus } from '@/types/database';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { DetailView } from '@/components/shared/DetailView';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { ViewToggle, usePersistedView } from '@/components/shared/ViewToggle';
import { formatDate, capitalizeFirst } from '@/lib/format';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Ticket as TicketIcon, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle,
  User,
  Calendar,
  MessageSquare,
  DollarSign,
  Wrench
} from 'lucide-react';

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [customers, setCustomers] = useState<{ id: string; business_name: string }[]>([]);
  const [subscriptions, setSubscriptions] = useState<{ id: string; customer_id: string }[]>([]);
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [formData, setFormData] = useState<Partial<TicketFormData>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [view, setView] = usePersistedView('tickets');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ticketsRes, customersRes, subscriptionsRes, partnersRes] = await Promise.all([
        supabase
          .from('tickets')
          .select('*, customer:customers(business_name), subscription:subscriptions(id), partner:partners(name)')
          .order('created_at', { ascending: false }),
        supabase.from('customers').select('id, business_name'),
        supabase.from('subscriptions').select('id, customer_id'),
        supabase.from('partners').select('id, name'),
      ]);

      if (ticketsRes.error) throw ticketsRes.error;
      setTickets(ticketsRes.data || []);
      setCustomers(customersRes.data || []);
      setSubscriptions(subscriptionsRes.data || []);
      setPartners(partnersRes.data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (type?: TicketType) => {
    setFormData({
      ticket_type: type || 'support',
      priority: 'medium',
      status: 'open',
      title: '',
      description: '',
      customer_id: null,
      subscription_id: null,
      assigned_partner_id: null,
      due_date: null,
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = () => {
    if (selectedTicket) {
      setFormData(selectedTicket);
      setIsEditing(true);
      setShowDetail(false);
      setShowForm(true);
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing && selectedTicket) {
        const { error } = await supabase
          .from('tickets')
          .update(formData as any)
          .eq('id', selectedTicket.id);
        if (error) throw error;
        toast.success('Ticket updated');
      } else {
        const { error } = await supabase.from('tickets').insert(formData as any);
        if (error) throw error;
        toast.success('Ticket created');
      }
      setShowForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save ticket');
    }
  };

  const handleDelete = async () => {
    if (!selectedTicket) return;
    try {
      const { error } = await supabase.from('tickets').delete().eq('id', selectedTicket.id);
      if (error) throw error;
      toast.success('Ticket deleted');
      setShowDelete(false);
      setShowDetail(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete ticket');
    }
  };

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!selectedTicket) return;
    try {
      const updates: any = { status: newStatus };
      if (newStatus === 'resolved' || newStatus === 'closed') {
        updates.resolved_at = new Date().toISOString();
      }
      const { error } = await supabase
        .from('tickets')
        .update(updates)
        .eq('id', selectedTicket.id);
      if (error) throw error;
      toast.success(`Ticket ${newStatus}`);
      setSelectedTicket({ ...selectedTicket, ...updates });
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive/10 text-destructive';
      case 'high': return 'bg-warning/10 text-warning';
      case 'medium': return 'bg-primary/10 text-primary';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return '';
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'open': return 'bg-destructive/10 text-destructive';
      case 'in_progress': return 'bg-warning/10 text-warning';
      case 'resolved': return 'bg-success/10 text-success';
      case 'closed': return 'bg-muted text-muted-foreground';
      default: return '';
    }
  };

  const getTypeIcon = (type: TicketType) => {
    switch (type) {
      case 'support': return <MessageSquare className="h-4 w-4" />;
      case 'internal': return <Wrench className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      default: return <TicketIcon className="h-4 w-4" />;
    }
  };

  const filteredTickets = activeTab === 'all' 
    ? tickets 
    : tickets.filter((t) => t.ticket_type === activeTab);

  const ticketCounts = {
    all: tickets.length,
    support: tickets.filter((t) => t.ticket_type === 'support').length,
    internal: tickets.filter((t) => t.ticket_type === 'internal').length,
    payment: tickets.filter((t) => t.ticket_type === 'payment').length,
  };

  const columns = [
    {
      key: 'title',
      label: 'Ticket',
      render: (item: Ticket) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
            {getTypeIcon(item.ticket_type)}
          </div>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground capitalize">{item.ticket_type}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (item: Ticket) => (item as any).customer?.business_name || '-',
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (item: Ticket) => (
        <Badge variant="outline" className={getPriorityColor(item.priority)}>
          {item.priority}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Ticket) => (
        <Badge variant="outline" className={getStatusColor(item.status)}>
          {item.status.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'due_date',
      label: 'Due Date',
      render: (item: Ticket) => item.due_date ? formatDate(item.due_date) : '-',
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (item: Ticket) => formatDate(item.created_at),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Tickets" 
        description="Manage support, internal, and payment tickets"
        actions={
          <div className="flex items-center gap-2">
            <ViewToggle view={view} onViewChange={setView} />
            <Button variant="outline" onClick={() => handleAdd('support')}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Support
            </Button>
            <Button variant="outline" onClick={() => handleAdd('internal')}>
              <Wrench className="h-4 w-4 mr-2" />
              Internal
            </Button>
            <Button variant="outline" onClick={() => handleAdd('payment')}>
              <DollarSign className="h-4 w-4 mr-2" />
              Payment
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
                <p className="text-sm text-muted-foreground">Open</p>
                <p className="text-2xl font-bold">{tickets.filter((t) => t.status === 'open').length}</p>
              </div>
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{tickets.filter((t) => t.status === 'in_progress').length}</p>
              </div>
              <Clock className="h-6 w-6 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">{tickets.filter((t) => t.status === 'resolved').length}</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="zoho-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Closed</p>
                <p className="text-2xl font-bold">{tickets.filter((t) => t.status === 'closed').length}</p>
              </div>
              <XCircle className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <TicketIcon className="h-4 w-4" />
            All ({ticketCounts.all})
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Support ({ticketCounts.support})
          </TabsTrigger>
          <TabsTrigger value="internal" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Internal ({ticketCounts.internal})
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Payment ({ticketCounts.payment})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {view === 'list' ? (
            <DataTable
              data={filteredTickets}
              columns={columns}
              onRowClick={(ticket) => {
                setSelectedTicket(ticket);
                setShowDetail(true);
              }}
              onAdd={() => handleAdd()}
              addLabel="Add Ticket"
              searchPlaceholder="Search tickets..."
              searchKeys={['title']}
              loading={loading}
              emptyMessage="No tickets found."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTickets.map((ticket) => (
                <Card key={ticket.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setSelectedTicket(ticket); setShowDetail(true); }}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(ticket.ticket_type)}
                        <p className="font-semibold text-sm line-clamp-1">{ticket.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</Badge>
                      <Badge variant="outline" className={`text-[10px] ${getStatusColor(ticket.status)}`}>{ticket.status.replace('_', ' ')}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      {(ticket as any).customer?.business_name && <p>{(ticket as any).customer.business_name}</p>}
                      <p>{formatDate(ticket.created_at)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Detail View */}
      <DetailView
        open={showDetail}
        onClose={() => setShowDetail(false)}
        title={selectedTicket?.title || ''}
        onEdit={handleEdit}
        onDelete={() => setShowDelete(true)}
      >
        {selectedTicket && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className={getStatusColor(selectedTicket.status)}>
                {selectedTicket.status.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(selectedTicket.priority)}>
                {selectedTicket.priority} priority
              </Badge>
              <Badge variant="outline" className="capitalize">
                {selectedTicket.ticket_type}
              </Badge>
            </div>

            {selectedTicket.description && (
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{selectedTicket.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {(selectedTicket as any).customer && (
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">{(selectedTicket as any).customer.business_name}</p>
                  </div>
                </div>
              )}
              {selectedTicket.due_date && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{formatDate(selectedTicket.due_date)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTicket.status === 'open' && (
                  <Button size="sm" onClick={() => handleStatusChange('in_progress')}>
                    <Clock className="h-4 w-4 mr-1" /> Start Progress
                  </Button>
                )}
                {selectedTicket.status === 'in_progress' && (
                  <Button size="sm" onClick={() => handleStatusChange('resolved')}>
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Mark Resolved
                  </Button>
                )}
                {selectedTicket.status === 'resolved' && (
                  <Button size="sm" onClick={() => handleStatusChange('closed')}>
                    <XCircle className="h-4 w-4 mr-1" /> Close Ticket
                  </Button>
                )}
                {selectedTicket.status !== 'open' && selectedTicket.status !== 'closed' && (
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange('open')}>
                    Reopen
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DetailView>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Ticket' : 'Create Ticket'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter ticket title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select
                  value={formData.ticket_type}
                  onValueChange={(value) => setFormData({ ...formData, ticket_type: value as TicketType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority *</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as TicketPriority })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the issue or task"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Customer</Label>
                <Select
                  value={formData.customer_id || 'none'}
                  onValueChange={(value) => setFormData({ ...formData, customer_id: value === 'none' ? null : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.business_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Assign to Partner</Label>
                <Select
                  value={formData.assigned_partner_id || 'none'}
                  onValueChange={(value) => setFormData({ ...formData, assigned_partner_id: value === 'none' ? null : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select partner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {partners.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={formData.due_date || ''}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value || null })}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as TicketStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
        title="Delete Ticket"
        description={`Delete "${selectedTicket?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
      />
    </div>
  );
};

export default Tickets;
