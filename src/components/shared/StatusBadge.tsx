import { Badge } from '@/components/ui/badge';
import { getStatusColor, capitalizeFirst } from '@/lib/format';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge variant="outline" className={getStatusColor(status)}>
      {capitalizeFirst(status)}
    </Badge>
  );
};
