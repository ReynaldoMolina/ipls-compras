'use client';

import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NewButtonProps {
  isDetalle?: boolean;
}

export function NewButton({ isDetalle = false }: NewButtonProps) {
  const pathname = usePathname();

  return (
    <Button asChild>
      <Link href={`${pathname}/nuevo`}>
        <Plus />
        <span className="hidden sm:inline-flex">
          {isDetalle ? 'Agregar' : 'Nuevo'}
        </span>
      </Link>
    </Button>
  );
}
