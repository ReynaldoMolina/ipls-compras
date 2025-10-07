'use client';

import { Calendar, Check, ClockAlert, X } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import { Badge } from '../ui/badge';
import { getDateStatus } from '@/lib/get-date-status';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { DateStatus } from '@/types/types';

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
    title: '-',
    icon: <Calendar className={iconClass} />,
  },
};

interface DateStatusCellProps {
  date: string | null | undefined;
  id_proveedor: number | undefined;
}

export function DateStatusCell({ date, id_proveedor }: DateStatusCellProps) {
  const dateStatus = getDateStatus(date);
  const formattedDate = formatDate(date);

  if (dateStatus === 'empty')
    return (
      <DateBadge
        dateStatus={dateStatus}
        formattedDate={formattedDate}
        id_proveedor={id_proveedor}
      />
    );

  return (
    <Tooltip>
      <TooltipTrigger>
        <DateBadge
          dateStatus={dateStatus}
          formattedDate={formattedDate}
          id_proveedor={id_proveedor}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>{statusConfig[dateStatus].title}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface DateBadgeProps {
  dateStatus: DateStatus;
  formattedDate: string;
  id_proveedor: number | undefined;
}

function DateBadge({
  dateStatus,
  formattedDate,
  id_proveedor,
}: DateBadgeProps) {
  return (
    <Badge variant="outline" className={statusConfig[dateStatus].bg}>
      <Link
        href={`/proveedores/${id_proveedor}/solvencias`}
        className="inline-flex gap-1 whitespace-nowrap font-normal"
      >
        {statusConfig[dateStatus].icon}
        {formattedDate}
      </Link>
    </Badge>
  );
}
