'use client';

import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ListFilter } from 'lucide-react';
import { ProvidersFilters, ResumenFilters } from './filter/FilterMenu';

export default function FilterButton() {
  const pathname = usePathname();

  let filterMenu;
  switch (pathname) {
    case '/proveedores':
      filterMenu = <ProvidersFilters />;
      break;
    case '/resumen':
      filterMenu = <ResumenFilters />;
      break;

    default:
      break;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <ListFilter />
          <span className="hidden md:flex text-xs">Filtrar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-3 min-w-50">
        {filterMenu}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
