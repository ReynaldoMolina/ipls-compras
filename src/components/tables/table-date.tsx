import { formatDate } from '@/lib/format-date';
import { Calendar } from 'lucide-react';

interface Props {
  date: string | null;
}

export default function TableDate({ date }: Props) {
  const label = formatDate(date);

  return (
    <div className="flex items-center justify-start gap-1 p-1 rounded border border-border">
      <Calendar
        className={`${date ? '' : 'text-muted-foreground'}  size-3.5`}
      />
      {date ? (
        <span>{label}</span>
      ) : (
        <span className="text-muted-foreground">Sin fecha</span>
      )}
    </div>
  );
}
