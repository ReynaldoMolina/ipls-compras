'use client';

import React, { useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Table } from '@tanstack/react-table';
import { columns } from '@/app/(compras)/presupuestos/[id]/modal-columns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DataTableSolicitudesModal } from './data-table-solicitudes-modal';
import {
  PresupuestoDetalleTable,
  SolicitudDetalleFormType,
} from '@/types/types';

interface OrdenFormProps<TData extends PresupuestoDetalleTable> {
  table: Table<TData>;
}

export function AddToExistingSolicitudModal<
  TData extends PresupuestoDetalleTable,
>({ table }: OrdenFormProps<TData>) {
  const [open, setOpen] = useState(false);
  const tableData = table.options.meta?.tableDataModal ?? [];

  const selectedRows: SolicitudDetalleFormType[] = table
    .getSelectedRowModel()
    .rows.map((row) => {
      const r = row.original;

      return {
        id_solicitud: 0,
        producto_servicio: '',
        cantidad: r.restante,
        unidad_medida: r.unidad_medida,
        observacion: r.observacion,
        id_presupuesto_detalle: r.id,
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
      <DialogContent className="max-h-[95%] overflow-y-auto max-w-4xl">
        <DialogHeader>
          <DialogTitle>Agregar a solicitud de compra</DialogTitle>
          <DialogDescription className="inline-flex flex-col text-balance md:text-wrap gap-3">
            <span>
              Selecciona la solicitud de compra, haz click en agregar cuando
              estés listo.
            </span>
            <span className="text-foreground">
              Se {isPlural ? 'van' : 'va'} a agregar {selectedRows.length}{' '}
              {isPlural ? 'registros' : 'registro'}.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DataTableSolicitudesModal
          columns={columns}
          selectedRows={selectedRows}
          tableData={tableData}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
