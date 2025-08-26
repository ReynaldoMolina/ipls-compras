'use client';

import { useRef } from 'react';
import MenuIcon from '@/icons/menu.svg';
import Logo from '@/icons/logo.svg';
import ProfileMenu from './ProfileMenu';
import { useMenusContext } from './MenusContext';

export default function Header() {
  const { toggleSideMenu, toggleProfileMenu, profileMenuOpen } =
    useMenusContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="flex relative h-11 min-h-11 w-full items-center justify-between gap-5 px-3 py-1 border-b border-b-brand-border">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleSideMenu}
          className="flex items-center justify-center h-full p-0.5 aspect-square rounded hover:bg-button-hover cursor-pointer transition"
        >
          <MenuIcon className="size-7.5" />
        </button>
        <div className="flex gap-2 items-center">
          <Logo />
          <h1 className="text-title font-semibold">IPLS Compras</h1>
        </div>
      </div>

      {/* profile menu toggle */}
      <button
        ref={buttonRef}
        type="button"
        className={`flex h-full items-center p-0.5 gap-0.5 rounded-full cursor-pointer transition outline ${profileMenuOpen ? 'outline-button-active bg-button-active/10' : 'hover:bg-button-hover outline-transparent'}`}
        onClick={toggleProfileMenu}
      >
        <div className="flex justify-center items-center h-full aspect-square rounded-full bg-neutral-300 text-brand-gray cursor-pointer">
          A
        </div>
      </button>

      {/* profile menu */}
      {profileMenuOpen && (
        <ProfileMenu
          toggleProfileMenu={toggleProfileMenu}
          buttonRef={buttonRef}
        />
      )}
    </header>
  );
}
