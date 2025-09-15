'use client';

import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ListFilter } from 'lucide-react';
import {
  ProvidersFilters,
  ResumenFilters,
  SolvenciasFilters,
} from './filter/FilterMenu';
import { FilterOptions } from '@/types/types';
import { JSX } from 'react';

export default function FilterButton({
  filterOptions,
}: {
  filterOptions: FilterOptions;
}) {
  const pathname = usePathname();
  const filterMenu = getFilterMenuByPath(pathname, filterOptions);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ListFilter />
          <span className="hidden sm:inline-flex">Filtrar</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col gap-3 min-w-50">
        {filterMenu}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getFilterMenuByPath(pathname: string, filterOptions: FilterOptions) {
  const menuMap: Record<string, JSX.Element> = {
    '/proveedores': <ProvidersFilters {...filterOptions} />,
    '/proveedores/[id]/solvencias': <SolvenciasFilters {...filterOptions} />,
    '/resumen': <ResumenFilters {...filterOptions} />,
  };

  return menuMap[pathname] ?? null;
}
