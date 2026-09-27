import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Customer, CustomerFormData, CustomerStatus, BusinessType, AcquisitionSource } from '@/types/database';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { DetailView } from '@/components/shared/DetailView';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ViewToggle, usePersistedView } from '@/components/shared/ViewToggle';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Building2, Calendar, AlertTriangle, Flag, Plus } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [formData, setFormData] = useState<Partial<CustomerFormData>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = usePersistedView('customers');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customersRes, partnersRes] = await Promise.all([
        supabase.from('customers').select('*').order('created_at', { ascending: false }),
        supabase.from('partners').select('id, name').eq('status', 'active'),
      ]);

      if (customersRes.error) throw customersRes.error;
      if (partnersRes.error) throw partnersRes.error;

      setCustomers(customersRes.data || []);
      setPartners(partnersRes.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      business_name: '',
      owner_name: '',
      phone: '',
      email: null,
      gst: null,
      city: null,
      district: null,
      state: null,
      business_type: 'other',
      status: 'trial',
      acquisition_source: 'direct',
      priority_flag: false,
      risk_tag: null,
      notes: null,
      partner_id: null,
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = () => {
    if (selectedCustomer) {
      setFormData(selectedCustomer);
      setIsEditing(true);
      setShowDetail(false);
      setShowForm(true);
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing && selectedCustomer) {
        const { error } = await supabase
          .from('customers')
          .update(formData as any)
          .eq('id', selectedCustomer.id);

        if (error) throw error;
        toast.success('Customer updated successfully');
      } else {
        const { error } = await supabase.from('customers').insert(formData as any);
        if (error) throw error;
        toast.success('Customer created successfully');
      }

      setShowForm(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving customer:', error);
      toast.error(error.message || 'Failed to save customer');
    }
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', selectedCustomer.id);

      if (error) throw error;

      toast.success('Customer deleted successfully');
      setShowDelete(false);
      setShowDetail(false);
      setSelectedCustomer(null);
      fetchData();
    } catch (error: any) {
      console.error('Error deleting customer:', error);
      toast.error(error.message || 'Failed to delete customer');
    }
  };

  const columns = [
    {
      key: 'business_name',
      label: 'Business Name',
      render: (item: Customer) => (
        <div>
          <p className="font-medium">{item.business_name}</p>
          <p className="text-sm text-muted-foreground">{item.owner_name}</p>
        </div>
      ),
    },
    { key: 'phone', label: 'Phone' },
    {
      key: 'city',
      label: 'Location',
      render: (item: Customer) => (
        <span>{[item.city, item.state].filter(Boolean).join(', ') || '-'}</span>
      ),
    },
    {
      key: 'business_type',
      label: 'Type',
      render: (item: Customer) => (
        <Badge variant="outline" className="capitalize">
          {item.business_type}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Customer) => <StatusBadge status={item.status} />,
    },
    {
      key: 'priority_flag',
      label: 'Priority',
      render: (item: Customer) =>
        item.priority_flag ? (
          <Flag className="h-4 w-4 text-warning" />
        ) : null,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Customers"
          description="Manage your customer base"
        />
        <div className="flex items-center gap-2">
          <ViewToggle view={view} onViewChange={setView} />
          <Button onClick={handleAdd}><Plus className="h-4 w-4 mr-2" />Add Customer</Button>
        </div>
      </div>

      {view === 'list' ? (
      <DataTable
        data={customers}
        columns={columns}
        onRowClick={(customer) => {
          setSelectedCustomer(customer);
          setShowDetail(true);
        }}
        searchPlaceholder="Search customers..."
        searchKeys={['business_name', 'owner_name', 'phone', 'email', 'city']}
        loading={loading}
        emptyMessage="No customers found. Add your first customer to get started."
      />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {customers.map((customer) => (
            <Card
              key={customer.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => { setSelectedCustomer(customer); setShowDetail(true); }}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{customer.business_name}</p>
                    <p className="text-xs text-muted-foreground">{customer.owner_name}</p>
                  </div>
                  <StatusBadge status={customer.status} />
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{customer.phone}</div>
                  {customer.city && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{[customer.city, customer.state].filter(Boolean).join(', ')}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize text-[10px]">{customer.business_type}</Badge>
                  {customer.priority_flag && <Flag className="h-3 w-3 text-warning" />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail View */}
      <DetailView
        open={showDetail}
        onClose={() => setShowDetail(false)}
        title={selectedCustomer?.business_name || ''}
        description={`Customer since ${selectedCustomer ? formatDate(selectedCustomer.created_at) : ''}`}
        onEdit={handleEdit}
        onDelete={() => setShowDelete(true)}
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Status & Flags */}
            <div className="flex items-center gap-4">
              <StatusBadge status={selectedCustomer.status} />
              {selectedCustomer.priority_flag && (
                <Badge className="bg-warning text-warning-foreground">Priority</Badge>
              )}
              {selectedCustomer.risk_tag && (
                <Badge variant="destructive">{selectedCustomer.risk_tag}</Badge>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-muted-foreground">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  {selectedCustomer.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                  )}
                  {(selectedCustomer.city || selectedCustomer.state) && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {[selectedCustomer.city, selectedCustomer.district, selectedCustomer.state]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-muted-foreground">Business Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">{selectedCustomer.business_type}</span>
                  </div>
                  {selectedCustomer.gst && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">GST:</span>
                      <span>{selectedCustomer.gst}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Acquisition:</span>
                    <span className="capitalize">{selectedCustomer.acquisition_source}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedCustomer.notes && (
              <div className="space-y-2">
                <h4 className="font-medium text-muted-foreground">Internal Notes</h4>
                <p className="text-sm bg-muted p-3 rounded-lg">{selectedCustomer.notes}</p>
              </div>
            )}
          </div>
        )}
      </DetailView>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business_name">Business Name *</Label>
                <Input
                  id="business_name"
                  value={formData.business_name || ''}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner_name">Owner Name *</Label>
                <Input
                  id="owner_name"
                  value={formData.owner_name || ''}
                  onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value || null })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gst">GST Number</Label>
                <Input
                  id="gst"
                  value={formData.gst || ''}
                  onChange={(e) => setFormData({ ...formData, gst: e.target.value || null })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business_type">Business Type *</Label>
                <Select
                  value={formData.business_type}
                  onValueChange={(value) => setFormData({ ...formData, business_type: value as BusinessType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dealer">Dealer</SelectItem>
                    <SelectItem value="grocery">Grocery</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value || null })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={formData.district || ''}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value || null })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state || ''}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value || null })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as CustomerStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="grace">Grace</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="churned">Churned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="acquisition_source">Acquisition Source *</Label>
                <Select
                  value={formData.acquisition_source}
                  onValueChange={(value) => setFormData({ ...formData, acquisition_source: value as AcquisitionSource })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner_id">Assigned Partner</Label>
                <Select
                  value={formData.partner_id || 'none'}
                  onValueChange={(value) => setFormData({ ...formData, partner_id: value === 'none' ? null : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select partner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {partners.map((partner) => (
                      <SelectItem key={partner.id} value={partner.id}>
                        {partner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="risk_tag">Risk Tag</Label>
                <Input
                  id="risk_tag"
                  value={formData.risk_tag || ''}
                  onChange={(e) => setFormData({ ...formData, risk_tag: e.target.value || null })}
                  placeholder="e.g., Late payer, Support heavy"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="priority_flag"
                  checked={formData.priority_flag || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, priority_flag: checked })}
                />
                <Label htmlFor="priority_flag">Priority Customer</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Internal Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value || null })}
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {isEditing ? 'Update' : 'Create'} Customer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Customer"
        description={`Are you sure you want to delete "${selectedCustomer?.business_name}"? This will also delete all associated subscriptions and data. This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
      />
    </div>
  );
};

export default Customers;
