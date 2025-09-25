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
import { OptionsMenuSolicitudDetalle } from './options-menu/options-menu-solicitud-detalle';
import { OptionsMenuOrdenDetalle } from './options-menu/options-menu-orden-detalle';

interface OptionsMenuProps<TData> {
  table: Table<TData>;
  tableName: 'orden' | 'solicitud' | 'ordenmodal';
}

export function OptionsMenu<TData>({
  table,
  tableName,
}: OptionsMenuProps<TData>) {
  const [open, setOpen] = useState(false);

  const optionsMenu = {
    orden: <OptionsMenuOrdenDetalle table={table} setOpen={setOpen} />,
    solicitud: <OptionsMenuSolicitudDetalle table={table} setOpen={setOpen} />,
    ordenmodal: <></>,
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col gap-3">
        {optionsMenu[tableName]}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
