import { Calendar } from 'lucide-react';

interface Props {
  date: Date | undefined;
}

export default function TableDate({ date }: Props) {
  return (
    <div className="flex items-center justify-start gap-1 p-1 rounded border border-border">
      <Calendar
        className={`${date ? '' : 'text-muted-foreground'}  size-3.5`}
      />
      {date ? (
        <span>{String(date)}</span>
      ) : (
        <span className="text-muted-foreground">Sin fecha</span>
      )}
    </div>
  );
}
