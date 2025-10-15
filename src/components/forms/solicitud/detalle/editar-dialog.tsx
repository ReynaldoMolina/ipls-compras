'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { startTransition, useActionState } from 'react';
import { detalleSolicitudSchema } from '../../validation/validation-schemas';
import { Form } from '@/components/ui/form';
import { FormFooterDialog } from '@/components/form-elements/form-footer';
import { useRouter } from 'next/navigation';
import { SolicitudDetalleFormType } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { updateSolicitudDetalle } from '@/server-actions/solicitud-detalle';
import { SolicitudDetalleForm } from './form';

interface EditarSolicitudDetalleForm {
  detalle: SolicitudDetalleFormType;
}

export function EditarSolicitudDetalleFormDialog({
  detalle,
}: EditarSolicitudDetalleForm) {
  const router = useRouter();

  const form = useForm<z.infer<typeof detalleSolicitudSchema>>({
    resolver: zodResolver(detalleSolicitudSchema),
    defaultValues: {
      id_solicitud: detalle.id_solicitud ?? 0,
      producto_servicio: detalle.producto_servicio ?? '',
      cantidad: detalle.cantidad ?? undefined,
      cantidad_bodega: detalle.cantidad_bodega ?? undefined,
      unidad_medida: detalle.unidad_medida ?? '',
      observacion: detalle.observacion ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateSolicitudDetalle,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof detalleSolicitudSchema>) {
    startTransition(() => {
      formAction({
        id: detalle.id,
        values,
        id_solicitud: detalle.id_solicitud,
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
            <SolicitudDetalleForm form={form} />
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
