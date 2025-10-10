'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { startTransition, useActionState, useState } from 'react';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Table } from '@tanstack/react-table';
import { detallePresupuestoSchema } from '../../validation/validation-schemas';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PresupuestoDetalleForm } from './form';
import { createPresupuestoDetalle } from '@/server-actions/presupuesto-detalle';
import { Form } from '@/components/ui/form';
import { FormFooterDialog } from '@/components/form-elements/form-footer';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { stateDefault } from '@/server-actions/statusMessages';

interface NuevoPresupuestoDetalleForm<TData> {
  table: Table<TData>;
}

export function NuevoPresupuestoDetalleForm<TData>({
  table,
}: NuevoPresupuestoDetalleForm<TData>) {
  const [open, setOpen] = useState(false);
  const id_presupuesto = table.options.meta?.id_presupuesto;
  const selectOptions = table.options.meta?.selectOptions;

  const form = useForm<z.infer<typeof detallePresupuestoSchema>>({
    resolver: zodResolver(detallePresupuestoSchema),
    defaultValues: {
      id_presupuesto: id_presupuesto ?? undefined,
      producto_servicio: '',
      cantidad: undefined,
      id_unidad_medida: 0,
      precio_sugerido: undefined,
      id_categoria: 0,
      prioridad: '',
      observacion: '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createPresupuestoDetalle,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof detallePresupuestoSchema>) {
    startTransition(() => {
      formAction({ values, id_presupuesto: id_presupuesto });
    });
  }

  useServerActionFeedback(state, { refresh: true });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus />
          <span className="hidden sm:block">Agregar producto</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95%] overflow-y-auto max-w-2xl">
        <DialogHeader className="border-b pb-6">
          <DialogTitle>Agregar producto al presupuesto</DialogTitle>
          <DialogDescription className="inline-flex flex-col text-balance gap-3">
            Ingresa la información del producto, haz click en agregar cuando
            estés listo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <PresupuestoDetalleForm form={form} selectOptions={selectOptions} />
            <FormFooterDialog
              form={form}
              setOpen={setOpen}
              label="Agregar"
              onSubmit={form.handleSubmit(onSubmit)}
              isPending={isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
