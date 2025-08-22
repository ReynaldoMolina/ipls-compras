'use client';

import Link from 'next/link';
import { DateStatus } from '@/types/types';
import CheckCircle from '@/icons/check_circle.svg';
import Schedule from '@/icons/schedule.svg';
import Warning from '@/icons/warning.svg';

interface Props {
  expirationDate: string;
  id: number;
}

export default function DateLink({ expirationDate, id }: Props) {
  function getDateStatus(expirationDate: string): DateStatus {
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

  const icons = {
    active: <CheckCircle className="size-4" />,
    due: <Schedule className="size-4" />,
    expired: <Warning className="size-4" />,
  };

  const bgColors = {
    active: 'bg-date-active',
    due: 'bg-date-due',
    expired: 'bg-date-warning',
  };

  return (
    <Link
      href={`/proveedores/${id}/solvencias`}
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center justify-start gap-1 p-1 rounded ${bgColors[dateStatus]}`}
    >
      {icons[dateStatus]}
      {expirationDate}
    </Link>
  );
}
