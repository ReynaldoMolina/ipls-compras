import { formatDate } from '@/lib/formatters';
import { CellContext } from '@tanstack/react-table';
import { Calendar } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function DateCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue();
  const dateString = value ? String(value) : '';
  const label = dateString ? formatDate(dateString) : 'Sin fecha';

  return (
    <Badge
      variant="outline"
      className={`${dateString ? '' : 'text-muted-foreground'} inline-flex gap-1 whitespace-nowrap`}
    >
      <Calendar className="size-3.5" />
      {label}
    </Badge>
  );
}
