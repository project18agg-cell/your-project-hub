import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Pencil, Trash2 } from 'lucide-react';

interface DetailViewProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const DetailView = ({
  open,
  onClose,
  title,
  description,
  children,
  onEdit,
  onDelete,
  showActions = true,
}: DetailViewProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-4 border-b">
          <div>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            {description && (
              <DialogDescription className="mt-1">{description}</DialogDescription>
            )}
          </div>
          {showActions && (
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="destructive" size="sm" onClick={onDelete}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </DialogHeader>
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
