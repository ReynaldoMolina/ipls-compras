'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { menuItemClass } from './ProfileMenu';
import ContrastIcon from '@/icons/contrast.svg';

export default function ChangeTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  function cycleTheme() {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  }

  const themeLabel =
    theme === 'system'
      ? `Sistema (${systemTheme === 'dark' ? 'Oscuro' : 'Claro'})`
      : theme === 'dark'
        ? 'Oscuro'
        : 'Claro';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button type="button" onClick={cycleTheme} className={menuItemClass}>
      <ContrastIcon className="h-4" />
      Tema: {themeLabel}
    </button>
  );
}
