import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  Handshake,
  Ticket,
  DollarSign,
  Receipt,
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Megaphone,
  Inbox,
  Activity,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const navItems = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Customers', path: '/customers', icon: Users },
  { title: 'Products', path: '/products', icon: Package },
  { title: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
  { title: 'Partners', path: '/partners', icon: Handshake },
  { title: 'Tickets', path: '/tickets', icon: Ticket },
  { title: 'Revenue', path: '/revenue', icon: DollarSign },
  { title: 'Expenses', path: '/expenses', icon: Receipt },
  { title: 'Reports', path: '/reports', icon: BarChart3 },
  { title: 'Leads', path: '/leads', icon: Megaphone },
  { title: 'Enquiries', path: '/enquiries', icon: Inbox },
  { title: 'Analytics', path: '/analytics', icon: Activity },
  { title: 'Internships', path: '/internship-applications', icon: GraduationCap },
  { title: 'System Logs', path: '/logs', icon: FileText },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { signOut, user } = useAuth();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 z-50 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-lg">SaaS Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    isActive && 'bg-sidebar-primary text-sidebar-primary-foreground',
                    collapsed && 'justify-center'
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.title}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && user && (
          <div className="mb-3 px-2">
            <p className="text-xs text-sidebar-muted truncate">{user.email}</p>
            <p className="text-xs text-sidebar-primary font-medium">Admin</p>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={signOut}
          className={cn(
            'w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            collapsed ? 'justify-center px-2' : 'justify-start'
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
};
