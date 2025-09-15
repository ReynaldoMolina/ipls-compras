import Link from 'next/link';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

interface EditLinkProps {
  href: string;
  label?: string;
}

export function EditLink({ href, label }: EditLinkProps) {
  if (!label)
    return (
      <Button asChild variant="outline" size="sm">
        <Link
          href={href}
          className="hover:underline underline-offset-2 whitespace-nowrap"
          title="Editar"
        >
          <Pencil className="size-3.5" />
        </Link>
      </Button>
    );

  return (
    <Link
      href={href}
      className="hover:underline underline-offset-2 whitespace-nowrap w-full block py-1"
      title="Editar"
    >
      {label}
    </Link>
  );
}
