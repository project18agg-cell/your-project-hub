import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Partner, PartnerPayout, PartnerFormData, PartnerType, PartnerStatus, PayoutStatus, Customer, Subscription } from '@/types/database';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { DetailView } from '@/components/shared/DetailView';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { PartnerDashboard } from '@/components/partners/PartnerDashboard';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Wallet, Phone, MapPin, Percent, CheckCircle, BarChart3, List } from 'lucide-react';

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [payouts, setPayouts] = useState<PartnerPayout[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<PartnerPayout | null>(null);
  const [showPartnerDetail, setShowPartnerDetail] = useState(false);
  const [showPayoutDetail, setShowPayoutDetail] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [showDeletePartner, setShowDeletePartner] = useState(false);
  const [partnerFormData, setPartnerFormData] = useState<Partial<PartnerFormData>>({});
  const [payoutFormData, setPayoutFormData] = useState<Partial<PartnerPayout>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assignedCitiesInput, setAssignedCitiesInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [partnersRes, payoutsRes, customersRes, subscriptionsRes] = await Promise.all([
        supabase.from('partners').select('*').order('created_at', { ascending: false }),
        supabase.from('partner_payouts').select('*, partner:partners(name)').order('created_at', { ascending: false }),
        supabase.from('customers').select('*'),
        supabase.from('subscriptions').select('*'),
      ]);

      if (partnersRes.error) throw partnersRes.error;
      if (payoutsRes.error) throw payoutsRes.error;

      setPartners(partnersRes.data || []);
      setPayouts(payoutsRes.data || []);
      setCustomers(customersRes.data || []);
      setSubscriptions(subscriptionsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPartner = () => {
    setPartnerFormData({
      name: '',
      phone: '',
      city: '',
      district: '',
      partner_type: 'sales',
      revenue_share_percent: 10,
      status: 'active',
      assigned_cities: [],
      allowed_products: [],
    });
    setAssignedCitiesInput('');
    setIsEditing(false);
    setShowPartnerForm(true);
  };

  const handleEditPartner = () => {
    if (selectedPartner) {
      setPartnerFormData(selectedPartner);
      setAssignedCitiesInput(selectedPartner.assigned_cities?.join(', ') || '');
      setIsEditing(true);
      setShowPartnerDetail(false);
      setShowPartnerForm(true);
    }
  };

  const handleSavePartner = async () => {
    try {
      const assignedCities = assignedCitiesInput
        .split(',')
        .map((c) => c.trim())
        .filter((c) => c.length > 0);

      const dataToSave = {
        ...partnerFormData,
        revenue_share_percent: Number(partnerFormData.revenue_share_percent),
        assigned_cities: assignedCities,
      };

      if (isEditing && selectedPartner) {
        const { error } = await supabase.from('partners').update(dataToSave as any).eq('id', selectedPartner.id);
        if (error) throw error;
        toast.success('Partner updated');
      } else {
        const { error } = await supabase.from('partners').insert(dataToSave as any);
        if (error) throw error;
        toast.success('Partner created');
      }
      setShowPartnerForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save partner');
    }
  };

  const handleDeletePartner = async () => {
    if (!selectedPartner) return;
    try {
      const { error } = await supabase.from('partners').delete().eq('id', selectedPartner.id);
      if (error) throw error;
      toast.success('Partner deleted');
      setShowDeletePartner(false);
      setShowPartnerDetail(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete partner');
    }
  };

  const handleAddPayout = () => {
    setPayoutFormData({
      partner_id: partners[0]?.id || '',
      amount: 0,
      status: 'pending',
    });
    setIsEditing(false);
    setShowPayoutForm(true);
  };

  const handleSavePayout = async () => {
    try {
      const dataToSave = {
        partner_id: payoutFormData.partner_id,
        amount: Number(payoutFormData.amount),
        status: payoutFormData.status,
        payout_date: payoutFormData.status === 'paid' ? new Date().toISOString().split('T')[0] : null,
      };

      const { error } = await supabase.from('partner_payouts').insert(dataToSave);
      if (error) throw error;
      toast.success('Payout created');
      setShowPayoutForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save payout');
    }
  };

  const handleMarkPaid = async (payout: PartnerPayout) => {
    try {
      const { error } = await supabase
        .from('partner_payouts')
        .update({ status: 'paid', payout_date: new Date().toISOString().split('T')[0] })
        .eq('id', payout.id);
      if (error) throw error;
      toast.success('Payout marked as paid');
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update payout');
    }
  };

  const partnerColumns = [
    { key: 'name', label: 'Name' },
    {
      key: 'partner_type',
      label: 'Type',
      render: (item: Partner) => (
        <Badge variant="outline" className="capitalize">
          {item.partner_type}
        </Badge>
      ),
    },
    { key: 'city', label: 'City', render: (item: Partner) => item.city || '-' },
    {
      key: 'revenue_share_percent',
      label: 'Revenue Share',
      render: (item: Partner) => `${item.revenue_share_percent}%`,
    },
    {
      key: 'customers',
      label: 'Customers',
      render: (item: Partner) => customers.filter((c) => c.partner_id === item.id).length,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Partner) => (
        <Badge
          variant="outline"
          className={item.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}
        >
          {item.status}
        </Badge>
      ),
    },
  ];

  const payoutColumns = [
    {
      key: 'partner',
      label: 'Partner',
      render: (item: PartnerPayout) => (item as any).partner?.name || '-',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (item: PartnerPayout) => formatCurrency(item.amount),
    },
    {
      key: 'payout_date',
      label: 'Date',
      render: (item: PartnerPayout) => (item.payout_date ? formatDate(item.payout_date) : '-'),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: PartnerPayout) => (
        <Badge
          variant="outline"
          className={item.status === 'paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (item: PartnerPayout) =>
        item.status === 'pending' ? (
          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleMarkPaid(item); }}>
            <CheckCircle className="h-4 w-4 mr-1" /> Mark Paid
          </Button>
        ) : null,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Partners" description="Manage partners, implementors, and payouts" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex items-center gap-2">
            <Handshake className="h-4 w-4" />
            Partners
          </TabsTrigger>
          <TabsTrigger value="payouts" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Payouts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <PartnerDashboard
            partners={partners}
            payouts={payouts}
            customers={customers}
            subscriptions={subscriptions}
          />
        </TabsContent>

        <TabsContent value="partners" className="mt-6">
          <DataTable
            data={partners}
            columns={partnerColumns}
            onRowClick={(partner) => {
              setSelectedPartner(partner);
              setShowPartnerDetail(true);
            }}
            onAdd={handleAddPartner}
            addLabel="Add Partner"
            searchPlaceholder="Search partners..."
            searchKeys={['name', 'city']}
            loading={loading}
            emptyMessage="No partners found."
          />
        </TabsContent>

        <TabsContent value="payouts" className="mt-6">
          <DataTable
            data={payouts}
            columns={payoutColumns}
            onRowClick={(payout) => {
              setSelectedPayout(payout);
              setShowPayoutDetail(true);
            }}
            onAdd={handleAddPayout}
            addLabel="Add Payout"
            searchPlaceholder="Search payouts..."
            searchKeys={[]}
            loading={loading}
            emptyMessage="No payouts found."
          />
        </TabsContent>
      </Tabs>

      {/* Partner Detail */}
      <DetailView
        open={showPartnerDetail}
        onClose={() => setShowPartnerDetail(false)}
        title={selectedPartner?.name || ''}
        onEdit={handleEditPartner}
        onDelete={() => setShowDeletePartner(true)}
      >
        {selectedPartner && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="capitalize">
                {selectedPartner.partner_type}
              </Badge>
              <Badge
                variant="outline"
                className={selectedPartner.status === 'active' ? 'bg-success/10 text-success' : ''}
              >
                {selectedPartner.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {selectedPartner.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedPartner.phone}</span>
                </div>
              )}
              {(selectedPartner.city || selectedPartner.district) && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{[selectedPartner.city, selectedPartner.district].filter(Boolean).join(', ')}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span>{selectedPartner.revenue_share_percent}% Revenue Share</span>
              </div>
            </div>

            {/* Partner Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-4 text-center">
                  <p className="text-2xl font-bold">{customers.filter((c) => c.partner_id === selectedPartner.id).length}</p>
                  <p className="text-sm text-muted-foreground">Customers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 text-center">
                  <p className="text-2xl font-bold">
                    {formatCurrency(
                      payouts
                        .filter((p) => p.partner_id === selectedPartner.id && p.status === 'paid')
                        .reduce((sum, p) => sum + Number(p.amount), 0)
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">Paid Commissions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 text-center">
                  <p className="text-2xl font-bold text-warning">
                    {formatCurrency(
                      payouts
                        .filter((p) => p.partner_id === selectedPartner.id && p.status === 'pending')
                        .reduce((sum, p) => sum + Number(p.amount), 0)
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Payouts</p>
                </CardContent>
              </Card>
            </div>

            {selectedPartner.assigned_cities && selectedPartner.assigned_cities.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Assigned Cities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.assigned_cities.map((city) => (
                    <Badge key={city} variant="secondary">{city}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DetailView>

      {/* Partner Form */}
      <Dialog open={showPartnerForm} onOpenChange={setShowPartnerForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Partner' : 'Add Partner'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={partnerFormData.name || ''}
                onChange={(e) => setPartnerFormData({ ...partnerFormData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={partnerFormData.phone || ''}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Partner Type *</Label>
                <Select
                  value={partnerFormData.partner_type}
                  onValueChange={(value) => setPartnerFormData({ ...partnerFormData, partner_type: value as PartnerType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="implementor">Implementor</SelectItem>
                    <SelectItem value="franchise">Franchise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={partnerFormData.city || ''}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>District</Label>
                <Input
                  value={partnerFormData.district || ''}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, district: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Revenue Share %</Label>
                <Input
                  type="number"
                  value={partnerFormData.revenue_share_percent || ''}
                  onChange={(e) => setPartnerFormData({ ...partnerFormData, revenue_share_percent: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Status *</Label>
                <Select
                  value={partnerFormData.status}
                  onValueChange={(value) => setPartnerFormData({ ...partnerFormData, status: value as PartnerStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Assigned Cities (comma-separated)</Label>
              <Input
                value={assignedCitiesInput}
                onChange={(e) => setAssignedCitiesInput(e.target.value)}
                placeholder="Chennai, Mumbai, Delhi"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowPartnerForm(false)}>Cancel</Button>
              <Button onClick={handleSavePartner}>{isEditing ? 'Update' : 'Create'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payout Form */}
      <Dialog open={showPayoutForm} onOpenChange={setShowPayoutForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payout</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Partner *</Label>
              <Select
                value={payoutFormData.partner_id}
                onValueChange={(value) => setPayoutFormData({ ...payoutFormData, partner_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select partner" />
                </SelectTrigger>
                <SelectContent>
                  {partners.filter((p) => p.status === 'active').map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount *</Label>
              <Input
                type="number"
                value={payoutFormData.amount || ''}
                onChange={(e) => setPayoutFormData({ ...payoutFormData, amount: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={payoutFormData.status}
                onValueChange={(value) => setPayoutFormData({ ...payoutFormData, status: value as PayoutStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowPayoutForm(false)}>Cancel</Button>
              <Button onClick={handleSavePayout}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showDeletePartner}
        onClose={() => setShowDeletePartner(false)}
        onConfirm={handleDeletePartner}
        title="Delete Partner"
        description={`Delete "${selectedPartner?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
      />
    </div>
  );
};

export default Partners;
