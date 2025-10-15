'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';
import React, { useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '../../../ui/button';
import { Table } from '@tanstack/react-table';
import { DataTableOrdenesModal } from '@/components/forms/solicitud/detalle/data-table-ordenes-modal';
import { columns } from '@/app/(compras)/solicitudes/[id]/modal-columns';
import { OrdenDetalleFormType, SolicitudDetalleTable } from '@/types/types';

interface OrdenFormProps<TData extends SolicitudDetalleTable> {
  table: Table<TData>;
}

export function OrdenExistingFormModal<TData extends SolicitudDetalleTable>({
  table,
}: OrdenFormProps<TData>) {
  const [open, setOpen] = useState(false);
  const tableData = table.options.meta?.tableDataModal ?? [];

  const selectedRows: OrdenDetalleFormType[] = table
    .getSelectedRowModel()
    .rows.map((row) => {
      const r = row.original;

      return {
        id_orden: 0,
        id_solicitud_detalle: r.id,
        cantidad: r.cantidad,
        precio: null,
        observacion: r.observacion,
      };
    });

  const isPlural = selectedRows.length > 1;

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
      <DialogContent className="max-h-[95%] overflow-y-auto max-w-5xl">
        <DialogHeader>
          <DialogTitle>Agregar a orden de compra</DialogTitle>
          <DialogDescription className="inline-flex flex-col text-balance md:text-wrap gap-3">
            <span>
              Selecciona la orden de compra, haz click en agregar cuando estés
              listo.
            </span>
            <span className="text-foreground">
              Se {isPlural ? 'van' : 'va'} a agregar {selectedRows.length}{' '}
              {isPlural ? 'registros' : 'registro'}.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DataTableOrdenesModal
          columns={columns}
          selectedRows={selectedRows}
          tableData={tableData}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
