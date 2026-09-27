import { ReactNode, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, X, Download } from 'lucide-react';

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    label: string;
    render?: (item: T) => ReactNode;
  }[];
  onRowClick?: (item: T) => void;
  onAdd?: () => void;
  addLabel?: string;
  searchPlaceholder?: string;
  searchKeys?: string[];
  loading?: boolean;
  emptyMessage?: string;
  onExport?: () => void;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  onAdd,
  addLabel = 'Add New',
  searchPlaceholder = 'Search...',
  searchKeys = [],
  loading = false,
  emptyMessage = 'No data found',
  onExport,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return searchKeys.some((key) => {
      const value = (item as any)[key];
      return value && String(value).toLowerCase().includes(query);
    });
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onExport && (
            <Button variant="outline" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
          {onAdd && (
            <Button onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="zoho-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    {columns.map((col) => (
                      <td key={col.key} className="py-3 px-4">
                        <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onRowClick?.(item)}
                    className={onRowClick ? 'cursor-pointer' : ''}
                  >
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      {filteredData.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Showing {filteredData.length} of {data.length} items
        </div>
      )}
    </div>
  );
}
