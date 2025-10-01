import Link from 'next/link';

export function FormTabList({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex min-h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-fit">
      {children}
    </div>
  );
}

export function FormTabItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
    >
      {label}
    </Link>
  );
}
