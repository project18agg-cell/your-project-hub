import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

type Notification = {
  id: string;
  type: 'demo' | 'franchise' | 'ticket';
  title: string;
  subtitle: string;
  created_at: string;
};

export const AdminNotifications = () => {
  const navigate = useNavigate();
  const [lastSeen, setLastSeen] = useState<string>(() => {
    return localStorage.getItem('admin_notif_last_seen') || new Date(0).toISOString();
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['admin_notifications'],
    queryFn: async () => {
      const items: Notification[] = [];

      const [demos, franchises, tickets] = await Promise.all([
        supabase.from('demo_requests').select('id, name, product, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('franchise_applications').select('id, name, city, created_at').order('created_at', { ascending: false }).limit(10),
        supabase.from('tickets').select('id, title, created_at').order('created_at', { ascending: false }).limit(10),
      ]);

      demos.data?.forEach(d => items.push({ id: d.id, type: 'demo', title: `Demo: ${d.name}`, subtitle: d.product, created_at: d.created_at }));
      franchises.data?.forEach(f => items.push({ id: f.id, type: 'franchise', title: `Franchise: ${f.name}`, subtitle: f.city, created_at: f.created_at }));
      tickets.data?.forEach(t => items.push({ id: t.id, type: 'ticket', title: t.title, subtitle: 'Support ticket', created_at: t.created_at }));

      return items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 15);
    },
    refetchInterval: 30000,
  });

  const unseenCount = notifications.filter(n => new Date(n.created_at) > new Date(lastSeen)).length;

  const markSeen = () => {
    const now = new Date().toISOString();
    setLastSeen(now);
    localStorage.setItem('admin_notif_last_seen', now);
  };

  const handleClick = (n: Notification) => {
    if (n.type === 'demo') navigate('/enquiries');
    else if (n.type === 'franchise') navigate('/leads');
    else navigate('/tickets');
  };

  const typeColors: Record<string, string> = {
    demo: 'bg-blue-100 text-blue-700',
    franchise: 'bg-purple-100 text-purple-700',
    ticket: 'bg-orange-100 text-orange-700',
  };

  return (
    <Popover onOpenChange={(open) => { if (open) markSeen(); }}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unseenCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold">
              {unseenCount > 9 ? '9+' : unseenCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b font-semibold text-sm">Notifications</div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">No notifications yet</div>
          ) : notifications.map(n => (
            <button key={`${n.type}-${n.id}`} onClick={() => handleClick(n)}
              className="w-full text-left px-3 py-2.5 hover:bg-muted/50 border-b border-border last:border-0 transition-colors">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${typeColors[n.type]}`}>{n.type}</span>
                <span className="text-xs text-muted-foreground">{format(new Date(n.created_at), 'MMM dd, HH:mm')}</span>
              </div>
              <p className="text-sm font-medium mt-0.5 truncate">{n.title}</p>
              <p className="text-xs text-muted-foreground truncate">{n.subtitle}</p>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
