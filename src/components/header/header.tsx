'use client';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import BackButton from './back-button';

export default function Header({
  title,
  showBackIcon = true,
}: {
  title: string;
  showBackIcon?: boolean;
}) {
  const { isMobile } = useSidebar();

  return (
    <header className="flex h-11 min-h-11 w-full items-center gap-3 px-3 py-1 border-b border-b-border">
      {showBackIcon ? <BackButton /> : <SidebarTrigger />}
      <h1 className="text-sm font-semibold">{title}</h1>
      {isMobile && <SidebarTrigger className="ml-auto" />}
    </header>
  );
}
