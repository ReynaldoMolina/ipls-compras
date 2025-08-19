'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ArrowBack from '@/icons/arrow_back.svg';
import ArrowDropDown from '@/icons/arrow_drop_down.svg';
import ProfileMenu from './ProfileMenu';

export default function Header({ pageTitle }: { pageTitle: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="flex relative h-10 w-full items-center justify-between gap-5 px-3 py-1 border-b border-b-brand-border dark:border-b-brand-border-dark">
      {/* page title */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="size-full rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          onClick={() => router.back()}
        >
          <ArrowBack />
        </button>
        <h1 className="text-title font-semibold">{pageTitle}</h1>
      </div>

      {/* profile menu toggle */}
      <button
        ref={buttonRef}
        type="button"
        className={`flex h-full items-center p-1 gap-0.5 rounded-md cursor-pointer ${isMenuOpen ? 'bg-neutral-200 dark:bg-neutral-700' : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        <ArrowDropDown className={isMenuOpen ? 'rotate-180' : ''} />
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
