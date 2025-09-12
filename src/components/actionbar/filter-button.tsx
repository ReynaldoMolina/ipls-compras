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
import { FilterData } from '@/types/types';

export default function FilterButton({ filterData }: FilterData) {
  const pathname = usePathname();

  let filterMenu;
  switch (pathname) {
    case '/proveedores':
      filterMenu = <ProvidersFilters filterData={filterData} />;
      break;
    case '/proveedores/[id]/solvencias':
      filterMenu = <SolvenciasFilters filterData={filterData} />;
      break;
    case '/resumen':
      filterMenu = <ResumenFilters filterData={filterData} />;
      break;

    default:
      break;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ListFilter />
          <span className="hidden md:flex">Filtrar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-3 min-w-50">
        {filterMenu}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
