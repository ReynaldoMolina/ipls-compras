'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AddIcon from '@/icons/add.svg';

export default function NewButton() {
  const pathname = usePathname();
  const label = pathname === 'ordenes' ? 'Añadir bien o servicio' : 'Nuevo';

  return (
    <Link
      href={`${pathname}/nuevo`}
      className="flex gap-1 items-center justify-center rounded text-sm h-8 px-1.5 cursor-pointer bg-button-new hover:bg-button-new-hover text-brand-text transition"
    >
      <AddIcon className="size-4.5" />
      {label}
    </Link>
  );
}
