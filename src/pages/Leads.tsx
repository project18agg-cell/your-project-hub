import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageHeader } from '@/components/shared/PageHeader';
import { ViewToggle, usePersistedView } from '@/components/shared/ViewToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Eye, Mail, Phone, MapPin, Building2, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

type DemoRequest = {
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

type FranchiseApp = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string;
  district: string | null;
  state: string | null;
  experience: string | null;
  investment_ready: boolean | null;
  message: string | null;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  converted: 'bg-emerald-100 text-emerald-700',
};

const Leads = () => {
  const queryClient = useQueryClient();
  const [selectedDemo, setSelectedDemo] = useState<DemoRequest | null>(null);
  const [selectedFranchise, setSelectedFranchise] = useState<FranchiseApp | null>(null);
  const [view, setView] = usePersistedView('leads');

  const { data: demos = [], isLoading: demosLoading } = useQuery({
    queryKey: ['demo_requests'],
    queryFn: async () => {
      const { data, error } = await supabase.from('demo_requests').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as DemoRequest[];
    },
  });

  const { data: franchises = [], isLoading: franchisesLoading } = useQuery({
    queryKey: ['franchise_applications'],
    queryFn: async () => {
      const { data, error } = await supabase.from('franchise_applications').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as FranchiseApp[];
    },
  });

  const updateDemoStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('demo_requests').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demo_requests'] });
      toast.success('Status updated');
    },
  });

  const updateFranchiseStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('franchise_applications').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['franchise_applications'] });
      toast.success('Status updated');
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader title="Leads & Applications" description="Manage demo requests and franchise applications" />
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      <Tabs defaultValue="demos" className="mt-6">
        <TabsList>
          <TabsTrigger value="demos">Demo Requests ({demos.length})</TabsTrigger>
          <TabsTrigger value="franchises">Franchise Applications ({franchises.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="demos" className="mt-4">
          {view === 'list' ? (
          <div className="bg-card rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demosLoading ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : demos.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No demo requests yet</TableCell></TableRow>
                ) : demos.map(d => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.phone}</TableCell>
                    <TableCell><Badge variant="outline">{d.product}</Badge></TableCell>
                    <TableCell>{d.city || '—'}</TableCell>
                    <TableCell>
                      <Select value={d.status} onValueChange={status => updateDemoStatus.mutate({ id: d.id, status })}>
                        <SelectTrigger className="w-28 h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['new', 'contacted', 'qualified', 'converted', 'rejected'].map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{format(new Date(d.created_at), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedDemo(d)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {demos.map(d => (
                <Card key={d.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedDemo(d)}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-sm">{d.name}</p>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColors[d.status] || 'bg-gray-100 text-gray-700'}`}>{d.status}</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{d.phone}</div>
                      {d.city && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{d.city}</div>}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px]">{d.product}</Badge>
                      <span className="text-[10px] text-muted-foreground">{format(new Date(d.created_at), 'MMM dd')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="franchises" className="mt-4">
          {view === 'list' ? (
          <div className="bg-card rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Investment Ready</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {franchisesLoading ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : franchises.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No applications yet</TableCell></TableRow>
                ) : franchises.map(f => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium">{f.name}</TableCell>
                    <TableCell>{f.phone}</TableCell>
                    <TableCell>{f.city}</TableCell>
                    <TableCell>{f.state || '—'}</TableCell>
                    <TableCell>
                      <Badge variant={f.investment_ready ? 'default' : 'outline'}>
                        {f.investment_ready ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select value={f.status} onValueChange={status => updateFranchiseStatus.mutate({ id: f.id, status })}>
                        <SelectTrigger className="w-28 h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['new', 'contacted', 'qualified', 'converted', 'rejected'].map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{format(new Date(f.created_at), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedFranchise(f)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {franchises.map(f => (
                <Card key={f.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedFranchise(f)}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-sm">{f.name}</p>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColors[f.status] || 'bg-gray-100 text-gray-700'}`}>{f.status}</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{f.phone}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{f.city}{f.state ? `, ${f.state}` : ''}</div>
                    </div>
                    <Badge variant={f.investment_ready ? 'default' : 'outline'} className="text-[10px]">
                      Investment: {f.investment_ready ? 'Yes' : 'No'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Demo Detail Dialog */}
      <Dialog open={!!selectedDemo} onOpenChange={() => setSelectedDemo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demo Request Details</DialogTitle>
          </DialogHeader>
          {selectedDemo && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm"><span className="font-medium">Name:</span> {selectedDemo.name}</div>
                <div className="flex items-center gap-2 text-sm"><Phone className="h-3 w-3" /> {selectedDemo.phone}</div>
                {selectedDemo.email && <div className="flex items-center gap-2 text-sm"><Mail className="h-3 w-3" /> {selectedDemo.email}</div>}
                {selectedDemo.business_name && <div className="flex items-center gap-2 text-sm"><Building2 className="h-3 w-3" /> {selectedDemo.business_name}</div>}
                {selectedDemo.city && <div className="flex items-center gap-2 text-sm"><MapPin className="h-3 w-3" /> {selectedDemo.city}</div>}
                <div className="flex items-center gap-2 text-sm"><Calendar className="h-3 w-3" /> {format(new Date(selectedDemo.created_at), 'PPp')}</div>
              </div>
              <div className="flex items-center gap-2 text-sm"><span className="font-medium">Product:</span> <Badge variant="outline">{selectedDemo.product}</Badge></div>
              {selectedDemo.message && (
                <div className="text-sm"><div className="flex items-center gap-1 font-medium mb-1"><MessageSquare className="h-3 w-3" /> Message</div><p className="text-muted-foreground bg-muted/50 rounded-lg p-3">{selectedDemo.message}</p></div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Franchise Detail Dialog */}
      <Dialog open={!!selectedFranchise} onOpenChange={() => setSelectedFranchise(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Franchise Application Details</DialogTitle>
          </DialogHeader>
          {selectedFranchise && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm"><span className="font-medium">Name:</span> {selectedFranchise.name}</div>
                <div className="flex items-center gap-2 text-sm"><Phone className="h-3 w-3" /> {selectedFranchise.phone}</div>
                {selectedFranchise.email && <div className="flex items-center gap-2 text-sm"><Mail className="h-3 w-3" /> {selectedFranchise.email}</div>}
                <div className="flex items-center gap-2 text-sm"><MapPin className="h-3 w-3" /> {selectedFranchise.city}{selectedFranchise.district ? `, ${selectedFranchise.district}` : ''}{selectedFranchise.state ? `, ${selectedFranchise.state}` : ''}</div>
                <div className="flex items-center gap-2 text-sm"><Calendar className="h-3 w-3" /> {format(new Date(selectedFranchise.created_at), 'PPp')}</div>
              </div>
              {selectedFranchise.experience && <div className="text-sm"><span className="font-medium">Experience:</span> {selectedFranchise.experience}</div>}
              <div className="text-sm"><span className="font-medium">Investment Ready:</span> {selectedFranchise.investment_ready ? 'Yes' : 'No'}</div>
              {selectedFranchise.message && (
                <div className="text-sm"><div className="flex items-center gap-1 font-medium mb-1"><MessageSquare className="h-3 w-3" /> Message</div><p className="text-muted-foreground bg-muted/50 rounded-lg p-3">{selectedFranchise.message}</p></div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Leads;
