import { Button } from '@/components/ui/button';
import { FormAction } from '@/types/types';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface FormLinkProps {
  href: string;
  label: string;
}

export function FormLink({ href, label }: FormLinkProps) {
  return (
    <Button size="sm" variant="outline" asChild>
      <Link href={href} className="inline-flex gap-2">
        {label}
        <ChevronRight className="size-4 ml-auto" />
      </Link>
    </Button>
  );
}

interface FormLinkGroupProps {
  action: FormAction;
  children: React.ReactNode;
}

export function FormLinkGroup({ action, children }: FormLinkGroupProps) {
  if (action === 'create') return null;
  return <div className="flex flex-col md:flex-row gap-2">{children}</div>;
}
