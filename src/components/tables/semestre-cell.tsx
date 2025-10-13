import { CellContext } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import { Calendar } from 'lucide-react';
import { getSemestreFromDate } from '@/lib/get-date-status';

export function SemestreCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const date = getValue();
  const dateString = date ? String(date) : '';
  const formattedDate = getSemestreFromDate(dateString);

  return (
    <Badge
      variant="outline"
      className={`${!dateString && 'text-muted-foreground'} inline-flex items-center gap-1 whitespace-nowrap font-normal cursor-default`}
    >
      <Calendar className="size-4" />
      {formattedDate}
    </Badge>
  );
}
