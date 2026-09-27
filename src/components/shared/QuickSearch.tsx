import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { 
  Users, 
  Package, 
  CreditCard, 
  Handshake, 
  Ticket,
  Building2,
  FileText 
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'customer' | 'subscription' | 'partner' | 'product' | 'ticket';
  title: string;
  subtitle: string;
}

interface QuickSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickSearch = ({ open, onOpenChange }: QuickSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchData = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const [customersRes, productsRes, partnersRes, subscriptionsRes, ticketsRes] = await Promise.all([
        supabase
          .from('customers')
          .select('id, business_name, owner_name, city')
          .or(`business_name.ilike.%${searchQuery}%,owner_name.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`)
          .limit(5),
        supabase
          .from('products')
          .select('id, name, category')
          .ilike('name', `%${searchQuery}%`)
          .limit(5),
        supabase
          .from('partners')
          .select('id, name, city')
          .or(`name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%`)
          .limit(5),
        supabase
          .from('subscriptions')
          .select('id, amount, status, customer:customers(business_name)')
          .limit(5),
        supabase
          .from('tickets')
          .select('id, title, status')
          .ilike('title', `%${searchQuery}%`)
          .limit(5),
      ]);

      const searchResults: SearchResult[] = [];

      (customersRes.data || []).forEach((c) => {
        searchResults.push({
          id: c.id,
          type: 'customer',
          title: c.business_name,
          subtitle: `${c.owner_name}${c.city ? ` • ${c.city}` : ''}`,
        });
      });

      (productsRes.data || []).forEach((p) => {
        searchResults.push({
          id: p.id,
          type: 'product',
          title: p.name,
          subtitle: p.category || 'Product',
        });
      });

      (partnersRes.data || []).forEach((p) => {
        searchResults.push({
          id: p.id,
          type: 'partner',
          title: p.name,
          subtitle: p.city || 'Partner',
        });
      });

      (ticketsRes.data || []).forEach((t) => {
        searchResults.push({
          id: t.id,
          type: 'ticket',
          title: t.title,
          subtitle: `Status: ${t.status}`,
        });
      });

      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchData(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, searchData]);

  const handleSelect = (result: SearchResult) => {
    onOpenChange(false);
    setQuery('');
    
    switch (result.type) {
      case 'customer':
        navigate('/customers');
        break;
      case 'product':
        navigate('/products');
        break;
      case 'partner':
        navigate('/partners');
        break;
      case 'subscription':
        navigate('/subscriptions');
        break;
      case 'ticket':
        navigate('/tickets');
        break;
    }
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'customer':
        return <Building2 className="h-4 w-4" />;
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'partner':
        return <Handshake className="h-4 w-4" />;
      case 'subscription':
        return <CreditCard className="h-4 w-4" />;
      case 'ticket':
        return <Ticket className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const typeLabels: Record<string, string> = {
    customer: 'Customers',
    product: 'Products',
    partner: 'Partners',
    subscription: 'Subscriptions',
    ticket: 'Tickets',
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search customers, products, partners, tickets..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? 'Searching...' : query.length < 2 ? 'Type at least 2 characters to search' : 'No results found.'}
        </CommandEmpty>
        {Object.entries(groupedResults).map(([type, items], index) => (
          <div key={type}>
            {index > 0 && <CommandSeparator />}
            <CommandGroup heading={typeLabels[type]}>
              {items.map((result) => (
                <CommandItem
                  key={`${result.type}-${result.id}`}
                  value={`${result.title} ${result.subtitle}`}
                  onSelect={() => handleSelect(result)}
                  className="cursor-pointer"
                >
                  <span className="mr-2 text-muted-foreground">{getIcon(result.type)}</span>
                  <div className="flex flex-col">
                    <span>{result.title}</span>
                    <span className="text-xs text-muted-foreground">{result.subtitle}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
};
