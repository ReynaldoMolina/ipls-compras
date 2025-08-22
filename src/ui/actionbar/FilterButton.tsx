'use client';

import { useRef, useState } from 'react';
import ArrowDropDown from '@/icons/arrow_drop_down.svg';
import FilterMenu from './filter/FilterMenu';

export default function FilterButton() {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex relative">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setIsFilterMenuOpen((state) => !state)}
        className={`flex gap-1 items-center justify-center border border-brand-border rounded text-sm h-8 px-1.5 cursor-pointer transition ${isFilterMenuOpen ? 'border border-button-active text-button-active bg-button-active/10' : 'hover:bg-button-hover'}`}
      >
        Filtrar
        <ArrowDropDown />
      </button>
      {isFilterMenuOpen && (
        <FilterMenu
          buttonRef={buttonRef}
          setIsFilterMenuOpen={setIsFilterMenuOpen}
        />
      )}
    </div>
  );
}
