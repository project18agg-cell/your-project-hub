import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AdminNotifications } from './AdminNotifications';
import { QuickSearch } from '@/components/shared/QuickSearch';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const MainLayout = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 min-h-screen transition-all duration-300">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b px-6 py-3 flex items-center justify-between">
          <Button variant="outline" className="w-64 justify-start text-muted-foreground" onClick={() => setSearchOpen(true)}>
            <Search className="h-4 w-4 mr-2" />
            Quick search...
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <AdminNotifications />
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
      <QuickSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
};
