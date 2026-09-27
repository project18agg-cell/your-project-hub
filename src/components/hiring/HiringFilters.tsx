import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

export interface FilterState {
  search: string;
  college: string;
  graduationYear: string;
  minScore: string;
}

interface HiringFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  colleges: string[];
  years: number[];
}

export const HiringFilters = ({ filters, onFilterChange, colleges, years }: HiringFiltersProps) => {
  const update = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasFilters = filters.search || filters.college || filters.graduationYear || filters.minScore;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search name, email..."
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          className="pl-9 h-9"
        />
      </div>
      <Select value={filters.college || 'all'} onValueChange={(v) => update('college', v === 'all' ? '' : v)}>
        <SelectTrigger className="w-[180px] h-9 text-xs">
          <SelectValue placeholder="University" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-xs">All Universities</SelectItem>
          {colleges.map(c => <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={filters.graduationYear || 'all'} onValueChange={(v) => update('graduationYear', v === 'all' ? '' : v)}>
        <SelectTrigger className="w-[120px] h-9 text-xs">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-xs">All Years</SelectItem>
          {years.map(y => <SelectItem key={y} value={String(y)} className="text-xs">{y}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={filters.minScore || 'all'} onValueChange={(v) => update('minScore', v === 'all' ? '' : v)}>
        <SelectTrigger className="w-[130px] h-9 text-xs">
          <SelectValue placeholder="Min Score" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-xs">Any Score</SelectItem>
          <SelectItem value="50" className="text-xs">Score ≥ 50</SelectItem>
          <SelectItem value="70" className="text-xs">Score ≥ 70</SelectItem>
          <SelectItem value="80" className="text-xs">Score ≥ 80</SelectItem>
          <SelectItem value="90" className="text-xs">Score ≥ 90</SelectItem>
        </SelectContent>
      </Select>
      {hasFilters && (
        <Button variant="ghost" size="sm" className="h-9 text-xs" onClick={() => onFilterChange({ search: '', college: '', graduationYear: '', minScore: '' })}>
          <X className="h-3 w-3 mr-1" /> Clear
        </Button>
      )}
    </div>
  );
};
