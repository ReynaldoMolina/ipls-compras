'use client';

import Link from 'next/link';
import { DateStatus } from '@/types/types';
import { Calendar, Check, ClockAlert, X } from 'lucide-react';
import { formatDate } from '@/lib/format-date';
import { Badge } from '../ui/badge';

interface Props {
  date: string | null;
  id?: number;
}

export default function SolvenciaState({ date, id }: Props) {
  function getDateStatus(date: string | null): DateStatus {
    if (!date) return 'empty';

    const [year, month, day] = date.split('-').map(Number);
    const expiration = new Date(year, month - 1, day);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    expiration.setHours(0, 0, 0, 0);

    // Compare the dates
    if (today.getTime() < expiration.getTime()) return 'active';
    else if (today.getTime() === expiration.getTime()) return 'due';
    else return 'expired';
  }

  const dateStatus = getDateStatus(date);

  const iconStyle = 'size-4';
  const icons = {
    active: <Check className={iconStyle} />,
    due: <ClockAlert className={iconStyle} />,
    expired: <X className={iconStyle} />,
    empty: <Calendar className={iconStyle} />,
  };

  const bgColors = {
    active: 'bg-date-active',
    due: 'bg-date-due',
    expired: 'bg-date-warning',
    empty: 'text-muted-foreground',
  };

  const titles = {
    active: 'Activa',
    due: 'Vence hoy',
    expired: 'Vencida',
    empty: 'Sin solvencia',
  };

  const label = formatDate(date);

  if (!id) {
    return (
      <Badge
        variant="outline"
        className={`${bgColors[dateStatus]} inline-flex gap-1 text-sm whitespace-nowrap font-normal cursor-default`}
        title={titles[dateStatus]}
      >
        {icons[dateStatus]}
        {label}
      </Badge>
    );
  }

  return (
    <Link href={`/proveedores/${id}/solvencias`} title={titles[dateStatus]}>
      <Badge
        variant="outline"
        className={`${bgColors[dateStatus]} inline-flex gap-1  hover:underline underline-offset-2 whitespace-nowrap text-sm font-normal`}
        title={titles[dateStatus]}
      >
        {icons[dateStatus]}
        {label}
      </Badge>
    </Link>
  );
}
