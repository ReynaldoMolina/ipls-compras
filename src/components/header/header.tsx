'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { BackButton } from './back-button';
import { Separator } from '../ui/separator';

interface HeaderProps {
  title: string;
  showBackIcon?: boolean;
}

export function Header({ title, showBackIcon = true }: HeaderProps) {
  return (
    <header className="flex h-11 min-h-11 w-full items-center gap-1 px-1 py-1 border-b border-b-border overflow-hidden">
      <SidebarTrigger title="Ocultar / mostrar" />
      <Separator orientation="vertical" />
      {showBackIcon && <BackButton />}
      <h1 className="text-sm font-semibold truncate whitespace-nowrap overflow-hidden text-ellipsis flex-1 px-1">
        {title}
      </h1>
    </header>
  );
}
