import { formatDate } from '@/lib/formatters';
import { CellContext } from '@tanstack/react-table';
import { getDateStatus } from '@/lib/get-date-status';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { dateStatusConfig } from './date-solvencia-cell';
import { Badge } from '../ui/badge';
import { Calendar } from 'lucide-react';
import { DateStatus } from '@/types/types';

export function DateCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const date = getValue();
  const dateString = date ? String(date) : '';
  const formattedDate = formatDate(dateString);

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

export function DateStatusCell<TData, TValue>({
  getValue,
}: CellContext<TData, TValue>) {
  const date = getValue();
  const dateString = date ? String(date) : '';
  const dateStatus = getDateStatus(dateString);
  const formattedDate = formatDate(dateString);

  if (dateStatus === 'empty') {
    return <DateBadge dateStatus={dateStatus} formattedDate={formattedDate} />;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <DateBadge dateStatus={dateStatus} formattedDate={formattedDate} />
      </TooltipTrigger>
      <TooltipContent>
        <p>{dateStatusConfig[dateStatus].title}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface DateBadgeProps {
  dateStatus: DateStatus;
  formattedDate: string;
}

function DateBadge({ dateStatus, formattedDate }: DateBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`${dateStatusConfig[dateStatus].bg} inline-flex items-center gap-1 whitespace-nowrap font-normal cursor-default`}
    >
      {dateStatusConfig[dateStatus].icon}
      {formattedDate}
    </Badge>
  );
}
