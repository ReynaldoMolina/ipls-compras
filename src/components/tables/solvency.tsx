'use client';

import Link from 'next/link';
import { DateStatus } from '@/types/types';
import { Calendar, CircleCheck, ClockAlert, OctagonAlert } from 'lucide-react';

interface Props {
  expirationDate: string | null;
  id?: number;
}

export default function Solvency({ expirationDate, id }: Props) {
  function getDateStatus(expirationDate: string | null): DateStatus {
    if (!expirationDate) return 'empty';

    const [year, month, day] = expirationDate.split('-').map(Number);
    const expiration = new Date(year, month - 1, day);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    expiration.setHours(0, 0, 0, 0);

    // Compare the dates
    if (today.getTime() < expiration.getTime()) return 'active';
    else if (today.getTime() === expiration.getTime()) return 'due';
    else return 'expired';
  }

  const dateStatus = getDateStatus(expirationDate);

  const iconStyle = 'size-4 opacity-70';
  const icons = {
    active: <CircleCheck className={iconStyle} />,
    due: <ClockAlert className={iconStyle} />,
    expired: <OctagonAlert className={iconStyle} />,
    empty: <Calendar className={iconStyle} />,
  };

  const bgColors = {
    active: 'bg-date-active',
    due: 'bg-date-due',
    expired: 'bg-date-warning',
    empty: 'border border-border text-muted-foreground',
  };

  if (!id) {
    return (
      <div
        className={`flex items-center justify-start gap-1 p-1 rounded ${bgColors[dateStatus]}`}
      >
        {icons[dateStatus]}
        {expirationDate ? expirationDate : 'Sin fecha'}
      </div>
    );
  }

  return (
    <Link
      href={`/proveedores/${id}/solvencias`}
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center justify-start gap-1 p-1 rounded ${bgColors[dateStatus]}`}
    >
      {icons[dateStatus]}
      {expirationDate ? expirationDate : 'Sin fecha'}
    </Link>
  );
}
