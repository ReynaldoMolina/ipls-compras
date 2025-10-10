'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { startTransition, useActionState, useEffect } from 'react';
import { detallePresupuestoSchema } from '../../validation/validation-schemas';

import { PresupuestoDetalleForm } from './form';
import { updatePresupuestoDetalle } from '@/server-actions/presupuesto-detalle';
import { Form } from '@/components/ui/form';
import { FormFooterDialog } from '@/components/form-elements/form-footer';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FormSelectOptions, PresupuestoDetalleFormType } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

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
    {
      success: false,
      message: '',
    }
  );

  function onSubmit(values: z.infer<typeof detallePresupuestoSchema>) {
    startTransition(() => {
      formAction({ id: detalle.id, values });
    });
  }

  useEffect(() => {
    if (state?.success) {
      form.reset();
      toast(state.message);
      router.refresh();
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <Dialog open>
          <DialogContent className="w-full max-w-2xl max-h-[95%] overflow-y-auto">
            <DialogHeader>
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
