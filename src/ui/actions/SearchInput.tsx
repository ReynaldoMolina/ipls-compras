'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from '@/icons/search.svg';

export default function SearchInput() {
  const searchParams = useSearchParams();
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

  return (
    <search className="flex relative items-center">
      <SearchIcon className="flex absolute left-2" />
      <input
        className="flex items-center border border-brand-border text-sm rounded pl-8.5 px-1.5 h-8 bg-brand-border/30 max-w-50 focus:outline-2 focus:outline-button-active"
        id="search"
        name="search"
        type="search"
        placeholder="Buscar"
        autoComplete="off"
        defaultValue={searchParams.get('buscar')?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </search>
  );
}
