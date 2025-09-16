'use client';

import { useTheme } from 'next-themes';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuSubContent,
} from './ui/dropdown-menu';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ChangeTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuSubContent>
      <DropdownMenuCheckboxItem
        checked={theme === 'system'}
        onCheckedChange={() => setTheme('system')}
      >
        <Monitor />
        Sistema
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme('dark')}
      >
        <Moon />
        Oscuro
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={theme === 'light'}
        onCheckedChange={() => setTheme('light')}
      >
        <Sun />
        Claro
      </DropdownMenuCheckboxItem>
    </DropdownMenuSubContent>
  );
}
