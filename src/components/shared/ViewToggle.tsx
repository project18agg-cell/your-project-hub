import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewToggleProps {
  view: 'list' | 'grid';
  onViewChange: (view: 'list' | 'grid') => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => (
  <div className="flex items-center border border-border rounded-lg overflow-hidden">
    <Button
      variant="ghost"
      size="sm"
      className={`rounded-none px-2.5 h-8 ${view === 'list' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
      onClick={() => onViewChange('list')}
    >
      <List className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="sm"
      className={`rounded-none px-2.5 h-8 ${view === 'grid' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
      onClick={() => onViewChange('grid')}
    >
      <LayoutGrid className="h-4 w-4" />
    </Button>
  </div>
);

export function usePersistedView(key: string, defaultView: 'list' | 'grid' = 'list'): ['list' | 'grid', (v: 'list' | 'grid') => void] {
  const [view, setView] = useState<'list' | 'grid'>(() => {
    const stored = localStorage.getItem(`view_${key}`);
    return (stored === 'list' || stored === 'grid') ? stored : defaultView;
  });

  const updateView = (v: 'list' | 'grid') => {
    setView(v);
    localStorage.setItem(`view_${key}`, v);
  };

  return [view, updateView];
}
