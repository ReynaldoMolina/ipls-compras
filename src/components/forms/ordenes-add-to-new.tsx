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
import { ordenesSchema } from '@/components/forms/validation/validation-schemas';
import { FormFieldSet } from '../form-elements/form-fieldset';
import { DatePicker } from '../date-picker';
import { FormInputGroup } from '../form-elements/form-input-group';
import { FormCombobox } from '../form-elements/form-combobox';
import { FormTextField } from '../form-elements/form-text-field';
import { FormFooterDialog } from '../form-elements/form-footer';
import { FormTextArea } from '../form-elements/form-text-area';
import { FormSelect } from '../form-elements/form-select';
import { monedas, terminosDePago } from '../../lib/select-options-data';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import React, { useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { createOrdenFromSelectedIds } from '@/server-actions/ordenes';
import { getCurrentDate } from '@/lib/get-current-date';

type OrdenFormValues = z.infer<typeof ordenesSchema>;

interface OrdenFormProps<TData extends { id: number }> {
  id_solicitud: number;
  table: Table<TData>;
}

export function OrdenNewFormModal<TData extends { id: number }>({
  id_solicitud,
  table,
}: OrdenFormProps<TData>) {
  const [open, setOpen] = useState(false);
  const { currentDate } = getCurrentDate();

  const form = useForm<z.infer<typeof ordenesSchema>>({
    resolver: zodResolver(ordenesSchema),
    defaultValues: {
      id_solicitud: id_solicitud ?? undefined,
      fecha_creacion: currentDate,
      fecha_a_utilizar: null,
      id_proveedor: 0,
      id_estado: 1,
      numero_cotizacion: '',
      termino_de_pago: '',
      moneda: '',
      observaciones: '',
    },
  });

  const proveedores = table.options.meta?.selectOptions?.proveedores ?? [];

  const selectedRowsIds = table
    .getSelectedRowModel()
    .rows.map((r) => r.original.id);

  const isPlural = selectedRowsIds.length > 1;

  function onSubmit(values: z.infer<typeof ordenesSchema>) {
    createOrdenFromSelectedIds(values, selectedRowsIds);
  }

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
        <DialogHeader>
          <DialogTitle>Nueva orden de compra</DialogTitle>
          <DialogDescription className="inline-flex flex-col text-balance gap-3">
            <span>
              Ingresa la información de la orden, haz click en crear cuando
              estés listo.
            </span>
            <span className="text-foreground">
              Se {isPlural ? 'van' : 'va'} a agregar {selectedRowsIds.length}{' '}
              {isPlural ? 'registros' : 'registro'}.
            </span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-15 py-6">
              <FormFieldSet name="info">
                <FormInputGroup>
                  <FormTextField
                    control={form.control}
                    name="id_solicitud"
                    label="Solicitud Nº"
                    disabled
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
                  <FormField
                    control={form.control}
                    name="fecha_a_utilizar"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha a utilizar</FormLabel>
                        <DatePicker<OrdenFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormInputGroup>
                <FormCombobox
                  control={form.control}
                  name="id_proveedor"
                  label="Proveedor"
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

                <FormTextArea
                  control={form.control}
                  name="observaciones"
                  label="Observaciones"
                />
              </FormFieldSet>
            </div>
            <FormFooterDialog setOpen={setOpen} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
