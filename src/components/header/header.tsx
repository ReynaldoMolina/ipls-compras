'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import BackButton from './back-button';

interface HeaderProps {
  title: string;
  showBackIcon?: boolean;
}

export default function Header({ title, showBackIcon = true }: HeaderProps) {
  return (
    <header className="flex h-11 min-h-11 w-full items-center gap-1 px-3 py-1 border-b border-b-border">
      <SidebarTrigger />
      {showBackIcon && <BackButton />}
      <h1 className="text-sm font-semibold">{title}</h1>
    </header>
  );
}
