'use client';

import { menuOptions } from './menuOptions';
import { MenuItem } from './MenuItem';
import { useMenusContext } from '../header/MenusContext';

export default function SideMenu() {
  const { sideMenuOpen } = useMenusContext();

  if (!sideMenuOpen) return;

  return (
    <menu className="flex z-20 fixed md:static flex-col gap-4 p-3 min-w-55 max-w-55 bg-background grow border-r border-brand-border shadow-2xl md:shadow-none">
      <nav className="flex flex-col gap-1">
        {menuOptions.map((option) => (
          <MenuItem key={option.id} option={option} />
        ))}
      </nav>
    </menu>
  );
}
