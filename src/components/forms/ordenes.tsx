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
import {
  ComboBoxData,
  FormAction,
  OrdenFormType,
  OrdenPdfProps,
} from '@/types/types';
import { Card, CardContent } from '../ui/card';
import { DatePicker } from '../date-picker';
import { FormInputGroup } from '../form-elements/form-input-group';
import { FormHeader } from '../form-elements/form-header';
import { FormOptions } from '../form-elements/form-options';
import { FormCombobox } from '../form-elements/form-combobox';
import { FormTextField } from '../form-elements/form-text-field';
import { FormLink, FormLinkGroup } from '../form-elements/form-link';
import { FormFooter } from '../form-elements/form-footer';
import { FormTextArea } from '../form-elements/form-text-area';
import { FormSelect } from '../form-elements/form-select';
import { monedas, terminosDePago } from '../../lib/select-options-data';
import { createOrden, updateOrden } from '@/server-actions/ordenes';
import { getCurrentDate } from '@/lib/get-current-date';

type OrdenFormValues = z.infer<typeof ordenesSchema>;

interface OrdenFormProps {
  action: FormAction;
  orden?: OrdenFormType;
  id_solicitud: number;
  estados: ComboBoxData;
  proveedores: ComboBoxData;
  ordenPdf: OrdenPdfProps;
}

export function OrdenForm({
  action,
  orden,
  id_solicitud,
  estados,
  proveedores,
  ordenPdf,
}: OrdenFormProps) {
  const { currentDate } = getCurrentDate();

  const form = useForm<z.infer<typeof ordenesSchema>>({
    resolver: zodResolver(ordenesSchema),
    defaultValues: orden
      ? {
          id_solicitud: orden.id_solicitud ?? id_solicitud,
          fecha_creacion: orden.fecha_creacion ?? undefined,
          fecha_a_utilizar: orden.fecha_a_utilizar ?? undefined,
          id_proveedor: orden.id_proveedor ?? 0,
          id_estado: orden.id_estado ?? 0,
          numero_cotizacion: orden.numero_cotizacion ?? '',
          termino_de_pago: orden.termino_de_pago ?? '',
          moneda: orden.moneda ?? '',
          observaciones: orden.observaciones ?? '',
        }
      : {
          id_solicitud: id_solicitud ?? undefined,
          fecha_creacion: currentDate,
          fecha_a_utilizar: undefined,
          id_proveedor: 0,
          id_estado: 1,
          numero_cotizacion: '',
          termino_de_pago: '',
          moneda: '',
          observaciones: '',
        },
  });

  function onSubmit(values: z.infer<typeof ordenesSchema>) {
    if (action === 'create') {
      createOrden(values);
    } else if (action === 'edit' && orden) {
      updateOrden(orden?.id, values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto">
          <FormHeader action={action} name="orden" noun="f" />
          <CardContent>
            <FormLinkGroup action={action}>
              <FormLink
                href={`/solicitudes/${id_solicitud}/ordenes/${orden?.id}/detalle`}
                label="Ver lista de productos"
              />
            </FormLinkGroup>
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
                name="id_estado"
                label="Estado"
                options={estados}
              />
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
          </CardContent>
          <FormFooter action={action} />
        </Card>
      </form>
    </Form>
  );
}
