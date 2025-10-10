import Link from 'next/link';
import { Button } from '../ui/button';
import { List, Pencil } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export function EditCell({ href }: { href: string }) {
  return (
    <Button asChild variant="outline" size="table">
      <Link href={href}>
        <Pencil className="size-3.5" />
      </Link>
    </Button>
  );
}

export function GoToListCell({
  href,
  label,
}: {
  href: string;
  label?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant="outline" size="table">
          <Link href={href}>
            <List className="size-3.5" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label ?? 'Detalle'}</p>
      </TooltipContent>
    </Tooltip>
  );
}
