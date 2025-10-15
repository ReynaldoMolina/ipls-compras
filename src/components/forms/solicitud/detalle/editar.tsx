'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { startTransition, useActionState } from 'react';
import { detalleSolicitudSchema } from '../../validation/validation-schemas';
import { Form } from '@/components/ui/form';
import { FormFooter } from '@/components/form-elements/form-footer';
import { SolicitudDetalleFormType } from '@/types/types';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { updateSolicitudDetalle } from '@/server-actions/solicitud-detalle';
import { SolicitudDetalleForm } from './form';

interface EditarSolicitudDetalleForm {
  detalle: SolicitudDetalleFormType;
}

export function EditarSolicitudDetalleForm({
  detalle,
}: EditarSolicitudDetalleForm) {
  const form = useForm<z.infer<typeof detalleSolicitudSchema>>({
    resolver: zodResolver(detalleSolicitudSchema),
    defaultValues: {
      id_solicitud: detalle.id_solicitud ?? 0,
      producto_servicio: detalle.producto_servicio ?? '',
      cantidad: detalle.cantidad ?? undefined,
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

  useServerActionFeedback(state);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <Card className="mx-auto w-full max-w-3xl">
          <FormHeader action="edit" name="detalle" noun="m" />
          <CardContent>
            <SolicitudDetalleForm form={form} />
          </CardContent>
          <FormFooter action="edit" isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
