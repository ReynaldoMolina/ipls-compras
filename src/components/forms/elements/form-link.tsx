import { Button } from '@/components/ui/button';
import { FormAction } from '@/types/types';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface FormLinkProps {
  action: FormAction;
  href: string;
  label: string;
}

export function FormLink({ action, href, label }: FormLinkProps) {
  if (action === 'create') return null;

  return (
    <Button asChild size="sm" variant="outline">
      <Link href={href} className="inline-flex gap-2">
        {label}
        <ChevronRight className="size-4" />
      </Link>
    </Button>
  );
}
