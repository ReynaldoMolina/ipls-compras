import Link from 'next/link';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

export function EditCell({
  href,
  disabled = false,
}: {
  href: string;
  disabled?: boolean;
}) {
  return (
    <Button
      asChild={!disabled}
      variant="outline"
      size="table"
      disabled={disabled}
    >
      <Link href={href}>
        <Pencil className="size-3.5" />
      </Link>
    </Button>
  );
}
