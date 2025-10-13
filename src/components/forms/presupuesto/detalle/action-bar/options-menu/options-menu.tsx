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
import { OptionsMenuPresupuestoDetalle } from './options-menu-presupuesto-detalle';

interface OptionsMenuProps<TData> {
  table: Table<TData>;
}

export function OptionsMenu<TData>({ table }: OptionsMenuProps<TData>) {
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
        <OptionsMenuPresupuestoDetalle table={table} setOpen={setOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
