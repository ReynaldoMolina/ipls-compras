'use client';

import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarX,
} from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import { Badge } from '../ui/badge';
import { getDateStatus } from '@/lib/get-date-status';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { DateStatus } from '@/types/types';

const iconClass = 'size-4';

export const dateStatusConfig = {
  active: {
    bg: 'bg-date-active',
    title: 'Activa',
    icon: <CalendarCheck className={iconClass} />,
  },
  due: {
    bg: 'bg-date-due',
    title: 'Vence hoy',
    icon: <CalendarClock className={iconClass} />,
  },
  expired: {
    bg: 'bg-date-warning',
    title: 'Vencida',
    icon: <CalendarX className={iconClass} />,
  },
  empty: {
    bg: 'text-muted-foreground',
    title: '-',
    icon: <Calendar className={iconClass} />,
  },
};

interface DateSolvenciaCellProps {
  date: string | null | undefined;
  id_proveedor?: number | undefined;
}

export function DateSolvenciaCell({
  date,
  id_proveedor,
}: DateSolvenciaCellProps) {
  const dateStatus = getDateStatus(date);
  const formattedDate = formatDate(date);

  if (dateStatus === 'empty')
    return (
      <DateBadgeLink
        dateStatus={dateStatus}
        formattedDate={formattedDate}
        id_proveedor={id_proveedor}
      />
    );

  return (
    <Tooltip>
      <TooltipTrigger>
        <DateBadgeLink
          dateStatus={dateStatus}
          formattedDate={formattedDate}
          id_proveedor={id_proveedor}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>{dateStatusConfig[dateStatus].title}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface DateBadgeLinkProps {
  dateStatus: DateStatus;
  formattedDate: string;
  id_proveedor: number | undefined;
}

function DateBadgeLink({
  dateStatus,
  formattedDate,
  id_proveedor,
}: DateBadgeLinkProps) {
  return (
    <Badge variant="outline" className={dateStatusConfig[dateStatus].bg}>
      <Link
        href={`/proveedores/${id_proveedor}/solvencias`}
        className="inline-flex items-center gap-1 whitespace-nowrap font-normal hover:underline"
      >
        {dateStatusConfig[dateStatus].icon}
        {formattedDate}
      </Link>
    </Badge>
  );
}
