'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { startTransition, useActionState } from 'react';
import { detallePresupuestoSchema } from '../../validation/validation-schemas';

import { PresupuestoDetalleForm } from './form';
import { updatePresupuestoDetalle } from '@/server-actions/presupuesto-detalle';
import { Form } from '@/components/ui/form';
import { FormFooterDialog } from '@/components/form-elements/form-footer';
import { useRouter } from 'next/navigation';
import { FormSelectOptions, PresupuestoDetalleFormType } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { Separator } from '@/components/ui/separator';

interface EditarPresupuestoDetalleForm {
  detalle: PresupuestoDetalleFormType;
  selectOptions: FormSelectOptions;
}

export function EditarPresupuestoDetalleFormDialog({
  detalle,
  selectOptions,
}: EditarPresupuestoDetalleForm) {
  const router = useRouter();

  const form = useForm<z.infer<typeof detallePresupuestoSchema>>({
    resolver: zodResolver(detallePresupuestoSchema),
    defaultValues: {
      id_presupuesto: detalle.id_presupuesto ?? 0,
      producto_servicio: detalle.producto_servicio ?? '',
      cantidad: detalle.cantidad ?? undefined,
      id_unidad_medida: detalle.id_unidad_medida ?? 0,
      precio_sugerido: detalle.precio_sugerido ?? undefined,
      id_categoria: detalle.id_categoria ?? 0,
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
            <PresupuestoDetalleForm form={form} selectOptions={selectOptions} />
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
