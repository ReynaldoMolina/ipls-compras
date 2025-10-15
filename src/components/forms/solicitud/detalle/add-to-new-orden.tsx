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

import React, { startTransition, useActionState, useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Table } from '@tanstack/react-table';
import { createOrdenFromSelectedRows } from '@/server-actions/orden';
import { getCurrentDate } from '@/lib/get-current-date';
import { OrdenDetalleFormType, SolicitudDetalleTable } from '@/types/types';
import { ordenesSchema } from '../../validation/validation-schemas';
import { stateDefault } from '@/server-actions/statusMessages';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { DatePicker } from '@/components/date-picker';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { FormSelect } from '@/components/form-elements/form-select';
import { monedas, terminosDePago } from '@/lib/select-options-data';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormFooterDialog } from '@/components/form-elements/form-footer';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { FormSwitch } from '@/components/form-elements/form-switch';

type OrdenFormValues = z.infer<typeof ordenesSchema>;

interface OrdenFormProps<TData extends SolicitudDetalleTable> {
  table: Table<TData>;
}

export function AddToNewOrdenModal<TData extends SolicitudDetalleTable>({
  table,
}: OrdenFormProps<TData>) {
  const [open, setOpen] = useState(false);
  const { currentDate } = getCurrentDate();
  const id_solicitud = table.options.meta.solicitud.id;

  const form = useForm<z.infer<typeof ordenesSchema>>({
    resolver: zodResolver(ordenesSchema),
    defaultValues: {
      id_solicitud: id_solicitud ?? undefined,
      fecha_creacion: currentDate,
      id_proveedor: 0,
      id_estado: 1,
      numero_cotizacion: null,
      termino_de_pago: '',
      moneda: 'Córdobas',
      descuento: undefined,
      observacion: '',
      calcular_iva: false,
    },
  });

  const proveedores = table.options.meta?.selectOptions?.proveedores ?? [];

  const selectedRows: OrdenDetalleFormType[] = table
    .getSelectedRowModel()
    .rows.map((row) => {
      const r = row.original;

      return {
        id_orden: 0,
        id_solicitud_detalle: r.id,
        cantidad: r.cantidad,
        precio: null,
        observacion: r.observacion,
      };
    });

  const [state, formAction, isPending] = useActionState(
    createOrdenFromSelectedRows,
    stateDefault
  );

  const isPlural = selectedRows.length > 1;

  function onSubmit(values: z.infer<typeof ordenesSchema>) {
    startTransition(() => {
      formAction({
        values,
        selectedRows,
      });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/ordenes' });

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
        <DialogHeader className="border-b pb-6">
          <DialogTitle>Nueva orden de compra</DialogTitle>
          <DialogDescription className="inline-flex flex-col text-balance gap-3">
            <span>
              Ingresa la información de la orden, haz click en crear cuando
              estés listo.
            </span>
            <span className="text-foreground">
              Se {isPlural ? 'van' : 'va'} a agregar {selectedRows.length}{' '}
              {isPlural ? 'registros' : 'registro'}.
            </span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Infomación</FieldLegend>
                <FieldDescription>
                  Ingresa los datos generales de la orden.
                </FieldDescription>
                <FormInputGroup>
                  <FormTextField
                    control={form.control}
                    name="id_solicitud"
                    label="Solicitud Nº"
                    disabled
                    // hidden
                  />
                  <FormField
                    control={form.control}
                    name="fecha_creacion"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha creación</FormLabel>
                        <DatePicker<OrdenFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormInputGroup>
              </FieldSet>
              <FormCombobox
                control={form.control}
                name="id_proveedor"
                label="Proveedor"
                outPutType="number"
                options={proveedores}
              />
              <FormTextField
                control={form.control}
                name="numero_cotizacion"
                label="Cotización Nº"
              />
              <FormInputGroup>
                <FormSelect
                  control={form.control}
                  name="termino_de_pago"
                  label="Término de pago"
                  options={terminosDePago}
                />
                <FormSelect
                  control={form.control}
                  name="moneda"
                  label="Moneda"
                  options={monedas}
                />
              </FormInputGroup>
              <FormInputGroup>
                <FormTextField
                  control={form.control}
                  name="descuento"
                  label="Descuento"
                />
                <FormSwitch
                  control={form.control}
                  name="calcular_iva"
                  label="Impuestos"
                  description="¿Calcular I.V.A.?"
                />
              </FormInputGroup>

              <FormTextArea
                control={form.control}
                name="observacion"
                label="Observaciones"
              />
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
