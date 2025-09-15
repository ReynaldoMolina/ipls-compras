'use client';

import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NewButton() {
  const pathname = usePathname();

  return (
    <Button asChild>
      <Link href={`${pathname}/nuevo`}>
        <Plus />
        <span className="hidden sm:inline-flex">Nuevo</span>
      </Link>
    </Button>
  );
}
