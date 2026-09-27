import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product, Plan, ProductFormData, PlanFormData, ProductStatus, BillingCycle } from '@/types/database';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Layers, Plus, Clock, Calendar } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showPlanDetail, setShowPlanDetail] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [showDeletePlan, setShowDeletePlan] = useState(false);
  const [productFormData, setProductFormData] = useState<Partial<ProductFormData>>({});
  const [planFormData, setPlanFormData] = useState<Partial<PlanFormData>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [view, setView] = usePersistedView('products');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, plansRes] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('plans').select('*, product:products(name)').order('created_at', { ascending: false }),
      ]);

      if (productsRes.error) throw productsRes.error;
      if (plansRes.error) throw plansRes.error;

      setProducts(productsRes.data || []);
      setPlans(plansRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Product handlers
  const handleAddProduct = () => {
    setProductFormData({ name: '', category: '', status: 'live' });
    setIsEditing(false);
    setShowProductForm(true);
  };

  const handleEditProduct = () => {
    if (selectedProduct) {
      setProductFormData(selectedProduct);
      setIsEditing(true);
      setShowProductDetail(false);
      setShowProductForm(true);
    }
  };

  const handleSaveProduct = async () => {
    try {
      if (isEditing && selectedProduct) {
        const { error } = await supabase
          .from('products')
          .update(productFormData as any)
          .eq('id', selectedProduct.id);
        if (error) throw error;
        toast.success('Product updated');
      } else {
        const { error } = await supabase.from('products').insert(productFormData as any);
        if (error) throw error;
        toast.success('Product created');
      }
      setShowProductForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', selectedProduct.id);
      if (error) throw error;
      toast.success('Product deleted');
      setShowDeleteProduct(false);
      setShowProductDetail(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  // Plan handlers
  const handleAddPlan = () => {
    setPlanFormData({
      product_id: products[0]?.id || '',
      name: '',
      price: 0,
      billing_cycle: 'monthly',
      features: [],
      trial_days: 14,
      grace_days: 7,
    });
    setIsEditing(false);
    setShowPlanForm(true);
  };

  const handleEditPlan = () => {
    if (selectedPlan) {
      setPlanFormData(selectedPlan);
      setIsEditing(true);
      setShowPlanDetail(false);
      setShowPlanForm(true);
    }
  };

  const handleSavePlan = async () => {
    try {
      const dataToSave = {
        ...planFormData,
        price: Number(planFormData.price),
        trial_days: Number(planFormData.trial_days),
        grace_days: Number(planFormData.grace_days),
      };

      if (isEditing && selectedPlan) {
        const { error } = await supabase.from('plans').update(dataToSave as any).eq('id', selectedPlan.id);
        if (error) throw error;
        toast.success('Plan updated');
      } else {
        const { error } = await supabase.from('plans').insert(dataToSave as any);
        if (error) throw error;
        toast.success('Plan created');
      }
      setShowPlanForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save plan');
    }
  };

  const handleDeletePlan = async () => {
    if (!selectedPlan) return;
    try {
      const { error } = await supabase.from('plans').delete().eq('id', selectedPlan.id);
      if (error) throw error;
      toast.success('Plan deleted');
      setShowDeletePlan(false);
      setShowPlanDetail(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete plan');
    }
  };

  const productColumns = [
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category', render: (item: Product) => item.category || '-' },
    {
      key: 'status',
      label: 'Status',
      render: (item: Product) => (
        <Badge
          variant="outline"
          className={
            item.status === 'live'
              ? 'bg-success/10 text-success'
              : item.status === 'beta'
              ? 'bg-warning/10 text-warning'
              : 'bg-muted text-muted-foreground'
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'plans',
      label: 'Plans',
      render: (item: Product) => plans.filter((p) => p.product_id === item.id).length,
    },
  ];

  const planColumns = [
    { key: 'name', label: 'Plan Name' },
    {
      key: 'product',
      label: 'Product',
      render: (item: Plan) => (item as any).product?.name || '-',
    },
    {
      key: 'price',
      label: 'Price',
      render: (item: Plan) => formatCurrency(item.price),
    },
    {
      key: 'billing_cycle',
      label: 'Billing',
      render: (item: Plan) => (
        <Badge variant="outline" className="capitalize">
          {item.billing_cycle.replace('_', ' ')}
        </Badge>
      ),
    },
    { key: 'trial_days', label: 'Trial Days' },
    { key: 'grace_days', label: 'Grace Days' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <PageHeader title="Products & Plans" description="Manage your product catalog and pricing plans" />
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          {view === 'list' ? (
            <DataTable
              data={products}
              columns={productColumns}
              onRowClick={(product) => {
                setSelectedProduct(product);
                setShowProductDetail(true);
              }}
              onAdd={handleAddProduct}
              addLabel="Add Product"
              searchPlaceholder="Search products..."
              searchKeys={['name', 'category']}
              loading={loading}
              emptyMessage="No products found. Add your first product to get started."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setSelectedProduct(product); setShowProductDetail(true); }}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <Badge variant="outline" className={product.status === 'live' ? 'bg-success/10 text-success' : product.status === 'beta' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}>
                        {product.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{product.category || 'No category'}</p>
                    <p className="text-xs text-muted-foreground">{plans.filter(p => p.product_id === product.id).length} plans</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="plans" className="mt-6">
          {view === 'list' ? (
            <DataTable
              data={plans}
              columns={planColumns}
              onRowClick={(plan) => {
                setSelectedPlan(plan);
                setShowPlanDetail(true);
              }}
              onAdd={handleAddPlan}
              addLabel="Add Plan"
              searchPlaceholder="Search plans..."
              searchKeys={['name']}
              loading={loading}
              emptyMessage="No plans found. Add your first plan to get started."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {plans.map((plan) => (
                <Card key={plan.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setSelectedPlan(plan); setShowPlanDetail(true); }}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-sm">{plan.name}</p>
                      <Badge variant="outline" className="capitalize text-[10px]">{plan.billing_cycle.replace('_', ' ')}</Badge>
                    </div>
                    <p className="text-lg font-bold">{formatCurrency(plan.price)}</p>
                    <p className="text-xs text-muted-foreground">{(plan as any).product?.name || 'Unknown'}</p>
                    <div className="flex gap-2 text-[10px] text-muted-foreground">
                      <span>Trial: {plan.trial_days}d</span>
                      <span>Grace: {plan.grace_days}d</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Product Detail */}
      <DetailView
        open={showProductDetail}
        onClose={() => setShowProductDetail(false)}
        title={selectedProduct?.name || ''}
        onEdit={handleEditProduct}
        onDelete={() => setShowDeleteProduct(true)}
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{selectedProduct.category || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {selectedProduct.status}
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Associated Plans</h4>
              <div className="space-y-2">
                {plans
                  .filter((p) => p.product_id === selectedProduct.id)
                  .map((plan) => (
                    <Card key={plan.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{plan.name}</span>
                        <span>{formatCurrency(plan.price)}/{plan.billing_cycle}</span>
                      </div>
                    </Card>
                  ))}
                {plans.filter((p) => p.product_id === selectedProduct.id).length === 0 && (
                  <p className="text-muted-foreground text-sm">No plans for this product</p>
                )}
              </div>
            </div>
          </div>
        )}
      </DetailView>

      {/* Plan Detail */}
      <DetailView
        open={showPlanDetail}
        onClose={() => setShowPlanDetail(false)}
        title={selectedPlan?.name || ''}
        onEdit={handleEditPlan}
        onDelete={() => setShowDeletePlan(true)}
      >
        {selectedPlan && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Product</p>
                <p className="font-medium">{(selectedPlan as any).product?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium text-xl">{formatCurrency(selectedPlan.price)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Billing Cycle</p>
                <Badge variant="outline" className="mt-1 capitalize">
                  {selectedPlan.billing_cycle.replace('_', ' ')}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trial Period</p>
                <p className="font-medium">{selectedPlan.trial_days} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Grace Period</p>
                <p className="font-medium">{selectedPlan.grace_days} days</p>
              </div>
            </div>
          </div>
        )}
      </DetailView>

      {/* Product Form */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Product Name *</Label>
              <Input
                value={productFormData.name || ''}
                onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={productFormData.category || ''}
                onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={productFormData.status}
                onValueChange={(value) => setProductFormData({ ...productFormData, status: value as ProductStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="beta">Beta</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowProductForm(false)}>Cancel</Button>
              <Button onClick={handleSaveProduct}>{isEditing ? 'Update' : 'Create'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Plan Form */}
      <Dialog open={showPlanForm} onOpenChange={setShowPlanForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Plan' : 'Add Plan'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Product *</Label>
              <Select
                value={planFormData.product_id}
                onValueChange={(value) => setPlanFormData({ ...planFormData, product_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Plan Name *</Label>
              <Input
                value={planFormData.name || ''}
                onChange={(e) => setPlanFormData({ ...planFormData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input
                  type="number"
                  value={planFormData.price || ''}
                  onChange={(e) => setPlanFormData({ ...planFormData, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Billing Cycle *</Label>
                <Select
                  value={planFormData.billing_cycle}
                  onValueChange={(value) => setPlanFormData({ ...planFormData, billing_cycle: value as BillingCycle })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="half_yearly">Half Yearly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Trial Days</Label>
                <Input
                  type="number"
                  value={planFormData.trial_days || ''}
                  onChange={(e) => setPlanFormData({ ...planFormData, trial_days: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Grace Days</Label>
                <Input
                  type="number"
                  value={planFormData.grace_days || ''}
                  onChange={(e) => setPlanFormData({ ...planFormData, grace_days: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowPlanForm(false)}>Cancel</Button>
              <Button onClick={handleSavePlan}>{isEditing ? 'Update' : 'Create'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmations */}
      <ConfirmDialog
        open={showDeleteProduct}
        onClose={() => setShowDeleteProduct(false)}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        description={`Delete "${selectedProduct?.name}"? This will also delete all associated plans. This cannot be undone.`}
        confirmLabel="Delete"
        destructive
      />
      <ConfirmDialog
        open={showDeletePlan}
        onClose={() => setShowDeletePlan(false)}
        onConfirm={handleDeletePlan}
        title="Delete Plan"
        description={`Delete "${selectedPlan?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
      />
    </div>
  );
};

export default Products;
