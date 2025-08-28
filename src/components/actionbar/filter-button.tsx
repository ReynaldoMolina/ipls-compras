'use client';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ListFilter } from 'lucide-react';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { Separator } from '../ui/separator';

export default function FilterButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <ListFilter />
          <span className="hidden md:flex">Filtrar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-sm">Filtros</DropdownMenuLabel>
        <Separator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
