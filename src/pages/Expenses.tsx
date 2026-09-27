import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Expense, ExpenseFormData, ExpenseCategory } from '@/types/database';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { DetailView } from '@/components/shared/DetailView';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { formatDate, formatCurrency, capitalizeFirst } from '@/lib/format';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, TrendingDown, Server, Megaphone, Users, Building, Briefcase, MoreHorizontal } from 'lucide-react';

const categoryIcons: Record<ExpenseCategory, typeof Server> = {
  server_infra: Server,
  marketing: Megaphone,
  partner_payouts: Users,
  salaries: Briefcase,
  office_travel: Building,
  misc: MoreHorizontal,
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [formData, setFormData] = useState<Partial<ExpenseFormData>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expensesRes, productsRes] = await Promise.all([
        supabase.from('expenses').select('*, product:products(name)').order('date', { ascending: false }),
        supabase.from('products').select('id, name'),
      ]);

      if (expensesRes.error) throw expensesRes.error;
      setExpenses(expensesRes.data || []);
      setProducts(productsRes.data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: 'misc',
      amount: 0,
      description: '',
      product_id: null,
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = () => {
    if (selectedExpense) {
      setFormData(selectedExpense);
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

      if (isEditing && selectedExpense) {
        const { error } = await supabase.from('expenses').update(dataToSave as any).eq('id', selectedExpense.id);
        if (error) throw error;
        toast.success('Expense updated');
      } else {
        const { error } = await supabase.from('expenses').insert(dataToSave as any);
        if (error) throw error;
        toast.success('Expense created');
      }
      setShowForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save expense');
    }
  };

  const handleDelete = async () => {
    if (!selectedExpense) return;
    try {
      const { error } = await supabase.from('expenses').delete().eq('id', selectedExpense.id);
      if (error) throw error;
      toast.success('Expense deleted');
      setShowDelete(false);
      setShowDetail(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete expense');
    }
  };

  // Calculate summary
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {} as Record<string, number>);

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (item: Expense) => formatDate(item.date),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item: Expense) => {
        const Icon = categoryIcons[item.category];
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{item.category.replace('_', ' ')}</span>
          </div>
        );
      },
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (item: Expense) => (
        <span className="font-medium text-destructive">{formatCurrency(item.amount)}</span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (item: Expense) => (
        <span className="text-muted-foreground truncate max-w-xs block">
          {item.description || '-'}
        </span>
      ),
    },
    {
      key: 'product',
      label: 'Product',
      render: (item: Expense) => (item as any).product?.name || '-',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Expenses" description="Track and manage business expenses" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="zoho-card border-l-4 border-l-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        {Object.entries(categoryTotals)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([category, amount]) => {
            const Icon = categoryIcons[category as ExpenseCategory] || Receipt;
            return (
              <Card key={category} className="zoho-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground capitalize">{category.replace('_', ' ')}</p>
                      <p className="text-xl font-bold">{formatCurrency(amount)}</p>
                    </div>
                    <Icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      <DataTable
        data={expenses}
        columns={columns}
        onRowClick={(expense) => {
          setSelectedExpense(expense);
          setShowDetail(true);
        }}
        onAdd={handleAdd}
        addLabel="Add Expense"
        searchPlaceholder="Search expenses..."
        searchKeys={['description']}
        loading={loading}
        emptyMessage="No expenses found."
      />

      {/* Detail View */}
      <DetailView
        open={showDetail}
        onClose={() => setShowDetail(false)}
        title={`Expense - ${selectedExpense ? formatDate(selectedExpense.date) : ''}`}
        onEdit={handleEdit}
        onDelete={() => setShowDelete(true)}
      >
        {selectedExpense && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="capitalize">
                {selectedExpense.category.replace('_', ' ')}
              </Badge>
              <span className="text-2xl font-bold text-destructive">
                {formatCurrency(selectedExpense.amount)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{formatDate(selectedExpense.date)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Product</p>
                <p className="font-medium">{(selectedExpense as any).product?.name || '-'}</p>
              </div>
            </div>

            {selectedExpense.description && (
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-1">{selectedExpense.description}</p>
              </div>
            )}
          </div>
        )}
      </DetailView>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as ExpenseCategory })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="server_infra">Server / Infra</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="partner_payouts">Partner Payouts</SelectItem>
                    <SelectItem value="salaries">Salaries</SelectItem>
                    <SelectItem value="office_travel">Office / Travel</SelectItem>
                    <SelectItem value="misc">Miscellaneous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Amount *</Label>
                <Input
                  type="number"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Product (optional)</Label>
                <Select
                  value={formData.product_id || 'none'}
                  onValueChange={(value) => setFormData({ ...formData, product_id: value === 'none' ? null : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
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
        title="Delete Expense"
        description="Are you sure you want to delete this expense? This cannot be undone."
        confirmLabel="Delete"
        destructive
      />
    </div>
  );
};

export default Expenses;
