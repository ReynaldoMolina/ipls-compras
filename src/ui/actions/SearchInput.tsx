'use client';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from '@/icons/search.svg';
import BackSpaceIcon from '@/icons/backspace.svg';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const searchTextParam = searchParams.get('buscar')?.toString();
  const [searchText, setSearchText] = useState(searchTextParam || '');
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    // params.set('page', '1');
    if (term) {
      params.set('buscar', term);
    } else {
      params.delete('buscar');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  function handleChange(term: string) {
    setSearchText(term);
    handleSearch(term);
  }

  return (
    <search className="flex relative items-center max-w-60 w-full">
      <SearchIcon className="flex absolute left-2" />
      <input
        className="flex items-center border border-brand-border text-sm rounded px-8.5 h-8 bg-brand-border/30 w-full focus:outline-2 focus:outline-button-active"
        id="search"
        name="search"
        type="search"
        placeholder="Buscar"
        autoComplete="off"
        value={searchText}
        onChange={(event) => handleChange(event.target.value)}
      />
      {searchText.length > 0 && (
        <BackSpaceIcon
          className="flex absolute size-6 right-1.5 pr-0.5 rounded hover:bg-button-hover cursor-pointer"
          onClick={() => handleChange('')}
        />
      )}
    </search>
  );
}
