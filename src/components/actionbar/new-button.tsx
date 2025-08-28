'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export default function NewButton() {
  const pathname = usePathname();
  const label = pathname === 'ordenes' ? 'Añadir bien o servicio' : 'Nuevo';

  return (
    <Button asChild>
      <Link href={`${pathname}/nuevo`}>
        <Plus />
        <span className="hidden md:flex">{label}</span>
      </Link>
    </Button>
  );
}
