'use client';

import Link from 'next/link';
import { DateStatus } from '@/types/types';
import { Calendar, Check, ClockAlert, X } from 'lucide-react';
import { formatDate } from '@/lib/format-date';

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

  const iconStyle = 'size-4 opacity-70';
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
    empty: 'border border-border text-muted-foreground',
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
      <span
        className={`${bgColors[dateStatus]} flex items-center text-xs justify-start gap-1 p-1 rounded w-fit whitespace-nowrap cursor-default`}
        title={titles[dateStatus]}
      >
        {icons[dateStatus]}
        {label}
      </span>
    );
  }

  return (
    <Link
      href={`/proveedores/${id}/solvencias`}
      onClick={(e) => e.stopPropagation()}
      className={`${bgColors[dateStatus]} flex items-center text-xs justify-start gap-1 p-1 rounded w-fit whitespace-nowrap hover:underline underline-offset-2`}
      title={titles[dateStatus]}
    >
      {icons[dateStatus]}
      {label}
    </Link>
  );
}
