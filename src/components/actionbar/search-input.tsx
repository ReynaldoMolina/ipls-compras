'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Delete } from 'lucide-react';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const searchTextParam = searchParams.get('search')?.toString();
  const [searchText, setSearchText] = useState(searchTextParam || '');
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  function handleChange(term: string) {
    setSearchText(term);
    handleSearch(term);
  }

  return (
    <div className="flex items-center relative w-full max-w-xs">
      <Search className="absolute left-2 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar"
        className="px-8 text-xs md:text-xs"
        value={searchText}
        onChange={(event) => handleChange(event.target.value)}
      />
      {searchText.length > 0 && (
        <Delete
          className="absolute right-2 size-6 text-muted-foreground p-1 cursor-pointer"
          onClick={() => handleChange('')}
        />
      )}
    </div>
  );
}
