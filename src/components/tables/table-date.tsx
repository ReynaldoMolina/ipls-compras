import { formatDate } from '@/lib/format-date';
import { CellContext } from '@tanstack/react-table';
import { Calendar } from 'lucide-react';

export default function TableDate<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const value = getValue();
  const dateString = value ? String(value) : '';
  const label = dateString ? formatDate(dateString) : 'Sin fecha';

  return (
    <span className="flex items-center gap-1 p-1 rounded border border-border w-fit whitespace-nowrap">
      <Calendar
        className={`${dateString ? '' : 'text-muted-foreground'} size-3.5`}
      />
      <span className={dateString ? '' : 'text-muted-foreground'}>{label}</span>
    </span>
  );
}
