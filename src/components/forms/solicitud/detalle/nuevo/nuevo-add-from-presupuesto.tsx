import { columns } from '@/app/(compras)/solicitudes/[id]/presupuesto-modal-columns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SolicitudDetalleTable } from '@/types/types';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { DataTablePresupuestoDetalleModal } from '../data-table-presupuesto-detalle-modal';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface AddProductFromPresupuestoModal<TData extends SolicitudDetalleTable> {
  table: Table<TData>;
}

export function AddProductFromPresupuestoModal<
  TData extends SolicitudDetalleTable,
>({ table }: AddProductFromPresupuestoModal<TData>) {
  const [open, setOpen] = useState(false);
  const presupuestoDetalle = table.options.meta.presupuestoDetalle;
  const id_solicitud = table.options.meta.solicitud.id;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus />
          <span className="hidden sm:block">Agregar producto</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl max-h-[95dvh]">
        <DialogHeader>
          <DialogTitle>Agregar productos</DialogTitle>
          <DialogDescription>
            Esta solicitud se creó a partir de un presupuesto, selecciona los
            productos que deseas agregar.
          </DialogDescription>
        </DialogHeader>
        <DataTablePresupuestoDetalleModal
          columns={columns}
          tableData={presupuestoDetalle}
          setOpen={setOpen}
          id_solicitud={id_solicitud}
        />
      </DialogContent>
    </Dialog>
  );
}
