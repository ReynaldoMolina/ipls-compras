import Link from 'next/link';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

export function EditCell({ href }: { href: string }) {
  return (
    <Button asChild variant="outline" size="table">
      <Link href={`${href}/editar`}>
        <Pencil className="size-3.5" />
      </Link>
    </Button>
  );
}
