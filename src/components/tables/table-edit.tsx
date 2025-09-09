import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export function TableEdit({ href }: { href: string }) {
  return (
    <Button className="text-xs h-7" variant="outline" asChild>
      <Link href={href}>
        <Pencil className="size-3.5" />
      </Link>
    </Button>
  );
}
