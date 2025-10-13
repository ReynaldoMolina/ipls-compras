'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { startTransition, useActionState, useState } from 'react';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Table } from '@tanstack/react-table';
import { detalleSolicitudSchema } from '../../validation/validation-schemas';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { FormFooterDialog } from '@/components/form-elements/form-footer';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { stateDefault } from '@/server-actions/statusMessages';
import { createSolicitudDetalle } from '@/server-actions/solicitud-detalle';
import { SolicitudDetalleForm } from './form';

interface NuevoSolicitudDetalleForm<TData> {
  table: Table<TData>;
}

export function NuevoSolicitudDetalleForm<TData>({
  table,
}: NuevoSolicitudDetalleForm<TData>) {
  const [open, setOpen] = useState(false);
  const id_solicitud = table.options.meta?.id_solicitud;
  const selectOptions = table.options.meta?.selectOptions;

  const form = useForm<z.infer<typeof detalleSolicitudSchema>>({
    resolver: zodResolver(detalleSolicitudSchema),
    defaultValues: {
      id_solicitud: id_solicitud ?? undefined,
      producto_servicio: '',
      cantidad: undefined,
      id_unidad_medida: 0,
      observacion: '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    createSolicitudDetalle,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof detalleSolicitudSchema>) {
    startTransition(() => {
      formAction({ values, id_solicitud });
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
          <DialogTitle>Agregar producto a la solicitud</DialogTitle>
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
            <SolicitudDetalleForm form={form} selectOptions={selectOptions} />
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
