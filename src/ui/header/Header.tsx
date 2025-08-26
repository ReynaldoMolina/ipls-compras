'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ArrowBack from '@/icons/arrow_back.svg';
import ArrowDropDown from '@/icons/arrow_drop_down.svg';
import ProfileMenu from './ProfileMenu';

export default function Header({ title }: { title: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="flex relative h-11 min-h-11 w-full items-center justify-between gap-5 px-3 py-1 border-b border-b-brand-border">
      {/* page title */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="h-full rounded-full p-0.5 hover:bg-button-hover cursor-pointer transition"
          onClick={() => router.back()}
        >
          <ArrowBack />
        </button>
        <h1 className="text-title font-semibold">{title}</h1>
      </div>

      {/* profile menu toggle */}
      <button
        ref={buttonRef}
        type="button"
        className={`flex h-full items-center p-0.5 gap-0.5 rounded-full cursor-pointer transition outline ${isMenuOpen ? 'outline-button-active bg-button-active/10' : 'hover:bg-button-hover outline-transparent'}`}
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        <div className="flex justify-center items-center h-full aspect-square rounded-full bg-neutral-300 text-brand-gray cursor-pointer">
          A
        </div>
      </button>

      {/* profile menu */}
      {isMenuOpen && (
        <ProfileMenu setIsMenuOpen={setIsMenuOpen} buttonRef={buttonRef} />
      )}
    </header>
  );
}
