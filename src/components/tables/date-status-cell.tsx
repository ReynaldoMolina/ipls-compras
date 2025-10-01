'use client';

import { Calendar, Check, ClockAlert, X } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import { Badge } from '../ui/badge';
import { getDateStatus } from '@/lib/get-date-status';

export function DateStatusCell({ date }: { date: string | null | undefined }) {
  const dateStatus = getDateStatus(date);
  const formattedDate = formatDate(date);
  const iconClass = 'size-4';

  const statusConfig = {
    active: {
      bg: 'bg-date-active',
      title: 'Activa',
      icon: <Check className={iconClass} />,
    },
    due: {
      bg: 'bg-date-due',
      title: 'Vence hoy',
      icon: <ClockAlert className={iconClass} />,
    },
    expired: {
      bg: 'bg-date-warning',
      title: 'Vencida',
      icon: <X className={iconClass} />,
    },
    empty: {
      bg: 'text-muted-foreground',
      title: '',
      icon: <Calendar className={iconClass} />,
    },
  };

  return (
    <Badge
      variant="outline"
      className={`${statusConfig[dateStatus].bg} inline-flex gap-1 whitespace-nowrap font-normal cursor-default`}
      title={statusConfig[dateStatus].title}
    >
      {statusConfig[dateStatus].icon}
      {formattedDate}
    </Badge>
  );
}
