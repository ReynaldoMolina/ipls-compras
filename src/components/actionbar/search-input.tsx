'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Delete } from 'lucide-react';
import { Button } from '../ui/button';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get('search')?.toString() || ''
  );
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
    <div className="inline-flex items-center relative w-full max-w-60">
      <Search className="absolute left-2 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar"
        className="px-8"
        value={searchText}
        onChange={(event) => handleChange(event.target.value)}
      />
      {searchText.length > 0 && (
        <Button
          variant="ghost"
          className="absolute right-1 size-7"
          onClick={() => handleChange('')}
        >
          <Delete className="text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
