'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import React, { useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { DataTableOrdenesModal } from '../tables/detalle/data-table-ordenes-modal';
import { columns } from '@/app/(compras)/solicitudes/[id]/detalle/modal-columns';

interface OrdenFormProps<TData extends { id: number | string }> {
  table: Table<TData>;
}

export function OrdenExistingFormModal<TData extends { id: number }>({
  table,
}: OrdenFormProps<TData>) {
  const [open, setOpen] = useState(false);
  const tableData = table.options.meta?.tableDataModal ?? [];

  const selectedRowsIds = table
    .getSelectedRowModel()
    .rows.map((r) => r.original.id);

  const isPlural = selectedRowsIds.length > 1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="font-normal rounded-sm px-2 py-1.5 text-sm w-full justify-start dark:hover:bg-accent"
        >
          Existente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95%] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Agregar a orden de compra</DialogTitle>
          <DialogDescription className="inline-flex flex-col text-balance md:text-wrap gap-3">
            <span>
              Selecciona la orden de compra, haz click en agregar cuando estés
              listo.
            </span>
            <span className="text-foreground">
              Se {isPlural ? 'van' : 'va'} a agregar {selectedRowsIds.length}{' '}
              {isPlural ? 'registros' : 'registro'}.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DataTableOrdenesModal
          columns={columns}
          selectedRowsIds={selectedRowsIds}
          tableData={tableData}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
