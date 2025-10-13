'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { solicitudSchema } from '@/components/forms/validation/validation-schemas';
import React, { startTransition, useActionState, useState } from 'react';
import { Table } from '@tanstack/react-table';
import { getCurrentDate } from '@/lib/get-current-date';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { DatePicker } from '@/components/date-picker';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { FormTextReadOnly } from '@/components/form-elements/form-text-readonly';
import { useUser } from '@/hooks/use-user';
import { FormFooterDialog } from '@/components/form-elements/form-footer';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { createSolicitudFromSelectedRows } from '@/server-actions/solicitud';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import {
  PresupuestoDetalleTable,
  SolicitudDetalleFormType,
} from '@/types/types';

type SolicitudFormValues = z.infer<typeof solicitudSchema>;

interface AddToNewSolicitudProps<TData extends PresupuestoDetalleTable> {
  table: Table<TData>;
}

export function AddToNewSolicitudModal<TData extends PresupuestoDetalleTable>({
  table,
}: AddToNewSolicitudProps<TData>) {
  const [open, setOpen] = useState(false);
  const { currentDate } = getCurrentDate();
  const { user } = useUser();
  const presupuesto = table.options.meta?.presupuesto ?? 0;

  const form = useForm<z.infer<typeof solicitudSchema>>({
    resolver: zodResolver(solicitudSchema),
    defaultValues: {
      fecha: currentDate,
      fecha_a_utilizar: undefined,
      id_entidad_academica: presupuesto.id_entidad_academica,
      id_usuario: user.id,
      id_presupuesto: presupuesto.id,
    },
  });

  const entidadesAcademicas =
    table.options.meta?.selectOptions?.entidadesAcademicas ?? [];

  const selectedRows: SolicitudDetalleFormType[] = table
    .getSelectedRowModel()
    .rows.map((row) => {
      const r = row.original;

      return {
        id_solicitud: 0,
        producto_servicio: r.producto_servicio,
        cantidad: r.cantidad,
        id_unidad_medida: r.id_unidad_medida,
        observacion: r.observacion,
        id_presupuesto_detalle: r.id,
      };
    });

  const isPlural = selectedRows.length > 1;

  const [state, formAction, isPending] = useActionState(
    createSolicitudFromSelectedRows,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof solicitudSchema>) {
    startTransition(() => {
      formAction({
        values,
        selectedRows,
      });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/solicitudes' });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="font-normal rounded-sm px-2 py-1.5 text-sm w-full justify-start dark:hover:bg-accent"
        >
          Nueva
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95%] overflow-y-auto max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <DialogHeader className="border-b pb-6">
              <DialogTitle>Nueva solicitud de compra</DialogTitle>
              <DialogDescription className="inline-flex flex-col text-balance gap-3">
                <span>
                  Ingresa la información de la solicitud, haz click en crear
                  cuando estés listo.
                </span>
                <span className="text-foreground">
                  Se {isPlural ? 'van' : 'va'} a agregar {selectedRows.length}{' '}
                  {isPlural ? 'productos' : 'producto'}.
                </span>
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Información básica</FieldLegend>
                <FieldDescription>
                  Completa los datos principales de la solicitud.
                </FieldDescription>
                <FormInputGroup>
                  <FormField
                    control={form.control}
                    name="fecha"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Elaborado el</FormLabel>
                        <DatePicker<SolicitudFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fecha_a_utilizar"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha a utilizar</FormLabel>
                        <DatePicker<SolicitudFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormInputGroup>
                <FormCombobox
                  control={form.control}
                  name="id_entidad_academica"
                  label="Carrera / curso / área"
                  options={entidadesAcademicas}
                  disabled
                />
                <FormTextField
                  control={form.control}
                  name="id_usuario"
                  label="Id usuario"
                  disabled
                  hidden
                />
                <FormTextField
                  control={form.control}
                  name="id_presupuesto"
                  label="Id presupuesto"
                  disabled
                  hidden
                />
                <FormTextReadOnly value={user.name} label="Solicitado por" />
              </FieldSet>
            </FieldGroup>
            <FormFooterDialog
              form={form}
              action="create"
              label="Siguiente"
              setOpen={setOpen}
              onSubmit={form.handleSubmit(onSubmit)}
              isPending={isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
