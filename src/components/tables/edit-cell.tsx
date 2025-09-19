import Link from 'next/link';
import { Button } from '../ui/button';
import { List, Pencil } from 'lucide-react';

export function EditCell({ href }: { href: string }) {
  return (
    <Button asChild variant="outline" size="table" title="Editar">
      <Link href={`${href}/editar`}>
        <Pencil className="size-3.5" />
      </Link>
    </Button>
  );
}

export function GoToListCell({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="outline"
      size="table"
      title={`Ir a ${label ? label : 'lista'}`}
    >
      <Link href={href}>
        <List className="size-3.5" />
      </Link>
    </Button>
  );
}
