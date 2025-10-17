import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DataTablePresupuestosModal } from './data-table-presupuesto-modal';
import { columns } from '@/app/(compras)/solicitudes/nuevo/presupuesto-modal-columns';
import { PresupuestoModal, SolicitudFormType } from '@/types/types';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';

interface SelectPresupuesto {
  tableData: PresupuestoModal[];
  form: UseFormReturn<SolicitudFormType>;
}

export function SelectPresupuesto({ tableData, form }: SelectPresupuesto) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Seleccionar</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Seleccionar presupuesto</DialogTitle>
          <DialogDescription>
            Elige el presupuesto a partir del cual se generará la solicitud.
          </DialogDescription>
        </DialogHeader>
        <DataTablePresupuestosModal
          columns={columns}
          tableData={tableData}
          form={form}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
