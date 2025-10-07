'use client';

import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Filter } from 'lucide-react';
import {
  OrdenesFilters,
  PresupuestosFilters,
  ProvidersFilters,
  ResumenFilters,
  SolvenciasFilters,
  UsuariosFilters,
} from './filter/filter-menu';
import { FilterOptions } from '@/types/types';
import { useState } from 'react';

interface FilterButtonProps {
  filterOptions: FilterOptions;
}

export function FilterButton({ filterOptions }: FilterButtonProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const filterMenu = getFilterMenuByPath(pathname, filterOptions);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter />
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
  if (
    pathname.startsWith('/proveedores/') &&
    pathname.endsWith('/solvencias')
  ) {
    return <SolvenciasFilters {...filterOptions} />;
  }

  if (pathname === '/proveedores') {
    return <ProvidersFilters {...filterOptions} />;
  }

  if (pathname === '/usuarios') {
    return <UsuariosFilters {...filterOptions} />;
  }

  if (pathname === '/resumen') {
    return <ResumenFilters {...filterOptions} />;
  }

  if (pathname === '/presupuestos') {
    return <PresupuestosFilters {...filterOptions} />;
  }

  if (
    pathname === '/ordenes' ||
    (pathname.startsWith('/solicitudes/') && pathname.endsWith('/ordenes'))
  ) {
    return <OrdenesFilters {...filterOptions} />;
  }

  return null;
}
