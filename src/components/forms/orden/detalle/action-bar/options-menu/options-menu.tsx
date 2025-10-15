'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { OptionsMenuOrdenDetalle } from './options-menu-orden-detalle';
import { OrdenDetalleTable } from '@/types/types';

interface OptionsMenuProps<TData extends OrdenDetalleTable> {
  table: Table<TData>;
}

export function OptionsMenu<TData extends OrdenDetalleTable>({
  table,
}: OptionsMenuProps<TData>) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <EllipsisVertical />
          <span className="hidden sm:inline-flex">Opciones</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col gap-3">
        <OptionsMenuOrdenDetalle table={table} setOpen={setOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
