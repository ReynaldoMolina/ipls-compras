'use client';

import Image from 'next/image';
import { menuOptions } from './menuOptions';
import { MenuItem } from './MenuItem';

export default function SideMenu() {
  return (
    <menu className="flex flex-col items-center gap-4 p-4 bg-brand-blue min-w-fit">
      <Image
        src="/images/logo-blanco.png"
        width={90}
        height={50}
        className="w-20 text-white text-xs text-center"
        alt="Logo"
      />
      <nav className="flex flex-col gap-1">
        {menuOptions.map((option) => (
          <MenuItem key={option.id} option={option} />
        ))}
      </nav>
    </menu>
  );
}
