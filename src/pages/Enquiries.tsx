import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageHeader } from '@/components/shared/PageHeader';
import { ViewToggle, usePersistedView } from '@/components/shared/ViewToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Eye, Phone, Mail, MapPin, Building2, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  business_name: string | null;
  city: string | null;
  product: string;
  request_type: string;
  message: string | null;
  status: string;
  created_at: string;
};

const requestTypeLabels: Record<string, string> = {
  demo: 'Product Demo',
  enquiry: 'Product Enquiry',
  complaint: 'Complaint',
  grievance: 'Grievance',
  technical_support: 'Technical Support',
};

const requestTypeColors: Record<string, string> = {
  demo: 'bg-blue-100 text-blue-700',
  enquiry: 'bg-purple-100 text-purple-700',
  complaint: 'bg-red-100 text-red-700',
  grievance: 'bg-orange-100 text-orange-700',
  technical_support: 'bg-teal-100 text-teal-700',
};

const Enquiries = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [view, setView] = usePersistedView('enquiries');

  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ['enquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('demo_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Enquiry[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('demo_requests').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['demo_requests'] });
      toast.success('Status updated');
    },
  });

  const filtered = filterType === 'all' ? enquiries : enquiries.filter(e => e.request_type === filterType);

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader title="Enquiries" description="Manage all product enquiries, complaints, grievances, and technical support requests" />
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        {['all', 'demo', 'enquiry', 'complaint', 'grievance', 'technical_support'].map(type => (
          <Button
            key={type}
            variant={filterType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType(type)}
          >
            {type === 'all' ? 'All' : requestTypeLabels[type] || type}
            {type !== 'all' && (
              <span className="ml-1.5 text-xs">({enquiries.filter(e => e.request_type === type).length})</span>
            )}
          </Button>
        ))}
      </div>

      {view === 'list' ? (
      <div className="bg-card rounded-lg border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No enquiries found</TableCell></TableRow>
            ) : filtered.map(e => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell>{e.phone}</TableCell>
                <TableCell>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${requestTypeColors[e.request_type] || 'bg-gray-100 text-gray-700'}`}>
                    {requestTypeLabels[e.request_type] || e.request_type}
                  </span>
                </TableCell>
                <TableCell><Badge variant="outline">{e.product}</Badge></TableCell>
                <TableCell>{e.city || '—'}</TableCell>
                <TableCell>
                  <Select value={e.status} onValueChange={status => updateStatus.mutate({ id: e.id, status })}>
                    <SelectTrigger className="w-28 h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['new', 'contacted', 'in_progress', 'resolved', 'closed'].map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{format(new Date(e.created_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => setSelected(e)}><Eye className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {filtered.map(e => (
            <Card key={e.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(e)}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <p className="font-semibold text-sm">{e.name}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${requestTypeColors[e.request_type] || 'bg-gray-100 text-gray-700'}`}>
                    {requestTypeLabels[e.request_type] || e.request_type}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{e.phone}</div>
                  {e.city && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{e.city}</div>}
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">{e.product}</Badge>
                  <span className="text-[10px] text-muted-foreground">{format(new Date(e.created_at), 'MMM dd')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Enquiry Details</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm"><span className="font-medium">Name:</span> {selected.name}</div>
                <div className="flex items-center gap-2 text-sm"><Phone className="h-3 w-3" /> {selected.phone}</div>
                {selected.email && <div className="flex items-center gap-2 text-sm"><Mail className="h-3 w-3" /> {selected.email}</div>}
                {selected.business_name && <div className="flex items-center gap-2 text-sm"><Building2 className="h-3 w-3" /> {selected.business_name}</div>}
                {selected.city && <div className="flex items-center gap-2 text-sm"><MapPin className="h-3 w-3" /> {selected.city}</div>}
                <div className="flex items-center gap-2 text-sm"><Calendar className="h-3 w-3" /> {format(new Date(selected.created_at), 'PPp')}</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Type:</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${requestTypeColors[selected.request_type] || 'bg-gray-100 text-gray-700'}`}>
                  {requestTypeLabels[selected.request_type] || selected.request_type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm"><span className="font-medium">Product:</span> <Badge variant="outline">{selected.product}</Badge></div>
              {selected.message && (
                <div className="text-sm">
                  <div className="flex items-center gap-1 font-medium mb-1"><MessageSquare className="h-3 w-3" /> Message</div>
                  <p className="text-muted-foreground bg-muted/50 rounded-lg p-3">{selected.message}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Enquiries;
