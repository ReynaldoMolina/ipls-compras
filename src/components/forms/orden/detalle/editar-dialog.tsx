'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { startTransition, useActionState } from 'react';
import { Form } from '@/components/ui/form';
import { FormFooterDialog } from '@/components/form-elements/form-footer';
import { useRouter } from 'next/navigation';
import { OrdenDetalleFormType } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { detalleOrdenSchema } from '../../validation/validation-schemas';
import { updateOrdenDetalle } from '@/server-actions/orden-detalle';
import { OrdenDetalleForm } from './form';

interface EditarOrdenDetalleForm {
  detalle: OrdenDetalleFormType;
}

export function EditarOrdenDetalleFormDialog({
  detalle,
}: EditarOrdenDetalleForm) {
  const router = useRouter();

  const form = useForm<z.infer<typeof detalleOrdenSchema>>({
    resolver: zodResolver(detalleOrdenSchema),
    defaultValues: {
      id_orden: detalle.id_orden ?? 0,
      id_solicitud_detalle: detalle.id_solicitud_detalle ?? 0,
      cantidad: detalle.cantidad ?? undefined,
      precio: detalle.precio ?? 0,
      observacion: detalle.observacion ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateOrdenDetalle,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof detalleOrdenSchema>) {
    startTransition(() => {
      formAction({
        id: detalle.id,
        values,
        id_orden: detalle.id_orden,
      });
    });
  }

  useServerActionFeedback(state, { back: true });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <Dialog
          open={true}
          onOpenChange={(open) => {
            if (!open) router.back();
          }}
        >
          <DialogContent className="w-full max-w-2xl max-h-[95%] overflow-y-auto">
            <DialogHeader className="border-b pb-6">
              <DialogTitle>Editar detalle</DialogTitle>
              <DialogDescription>
                Edita la información del detalle, haz click en guardar cuando
                estés listo.
              </DialogDescription>
            </DialogHeader>
            <OrdenDetalleForm form={form} />
            <FormFooterDialog
              form={form}
              action="edit"
              setOpen={() => router.back()}
              onSubmit={form.handleSubmit(onSubmit)}
              isPending={isPending}
            />
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
