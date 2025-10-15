'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { startTransition, useActionState } from 'react';
import { detallePresupuestoSchema } from '../../validation/validation-schemas';

import { PresupuestoDetalleForm } from './form';
import { updatePresupuestoDetalle } from '@/server-actions/presupuesto-detalle';
import { Form } from '@/components/ui/form';
import { FormFooter } from '@/components/form-elements/form-footer';
import { PresupuestoDetalleFormType } from '@/types/types';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';

interface EditarPresupuestoDetalleForm {
  detalle: PresupuestoDetalleFormType;
}

export function EditarPresupuestoDetalleForm({
  detalle,
}: EditarPresupuestoDetalleForm) {
  const form = useForm<z.infer<typeof detallePresupuestoSchema>>({
    resolver: zodResolver(detallePresupuestoSchema),
    defaultValues: {
      id_presupuesto: detalle.id_presupuesto ?? 0,
      producto_servicio: detalle.producto_servicio ?? '',
      cantidad: detalle.cantidad ?? undefined,
      unidad_medida: detalle.unidad_medida ?? '',
      precio_sugerido: detalle.precio_sugerido ?? undefined,
      categoria: detalle.categoria ?? '',
      prioridad: detalle.prioridad ?? '',
      observacion: detalle.observacion ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(
    updatePresupuestoDetalle,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof detallePresupuestoSchema>) {
    startTransition(() => {
      formAction({
        id: detalle.id,
        values,
        id_presupuesto: detalle.id_presupuesto,
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
            <PresupuestoDetalleForm form={form} />
          </CardContent>
          <FormFooter action="edit" isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
