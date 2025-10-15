'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { startTransition, useActionState } from 'react';
import { detalleOrdenSchema } from '../../validation/validation-schemas';
import { Form } from '@/components/ui/form';
import { FormFooter } from '@/components/form-elements/form-footer';
import { OrdenDetalleFormType } from '@/types/types';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { updateOrdenDetalle } from '@/server-actions/orden-detalle';
import { OrdenDetalleForm } from './form';

interface EditarOrdenDetalleForm {
  detalle: OrdenDetalleFormType;
}

export function EditarOrdenDetalleForm({ detalle }: EditarOrdenDetalleForm) {
  const form = useForm<z.infer<typeof detalleOrdenSchema>>({
    resolver: zodResolver(detalleOrdenSchema),
    defaultValues: {
      id_orden: detalle.id_orden ?? 0,
      id_solicitud_detalle: detalle.id_solicitud_detalle ?? '',
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
            <OrdenDetalleForm form={form} />
          </CardContent>
          <FormFooter action="edit" isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
