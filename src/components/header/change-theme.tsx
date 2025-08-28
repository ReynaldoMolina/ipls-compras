'use client';

import { useTheme } from 'next-themes';
import { DropdownMenuItem, DropdownMenuSubContent } from '../ui/dropdown-menu';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ChangeTheme() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSubContent>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        <Monitor />
        Sistema
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>
        <Moon />
        Oscuro
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('light')}>
        <Sun />
        Claro
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  );
}
