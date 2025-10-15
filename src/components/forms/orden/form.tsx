'use client';

import { FormAction, FormSelectOptions } from '@/types/types';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import z from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { ordenesSchema } from '../validation/validation-schemas';
import { DatePicker } from '@/components/date-picker';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormSelect } from '@/components/form-elements/form-select';
import { monedas, terminosDePago } from '@/lib/select-options-data';
import { FormSwitch } from '@/components/form-elements/form-switch';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormFooter } from '@/components/form-elements/form-footer';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type OrdenFormValues = z.infer<typeof ordenesSchema>;

interface OrdenFormProps {
  action: FormAction;
  form: UseFormReturn<OrdenFormValues>;
  onSubmit: (values: OrdenFormValues) => void;
  selectOptions: FormSelectOptions;
  isPending: boolean;
  id_orden: number;
  label?: string;
}

export function OrdenForm({
  action,
  form,
  onSubmit,
  selectOptions,
  isPending,
  id_orden,
  label,
}: OrdenFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto">
          <FormHeader action={action} name="orden" noun="f" label={label} />
          <CardContent>
            <FieldGroup>
              {action === 'edit' && (
                <FieldSet>
                  <Item variant="outline">
                    <ItemMedia variant="icon">
                      <Printer />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Imprimir orden</ItemTitle>
                      <ItemDescription>
                        Visualiza o descarga el documento en formato PDF para
                        revisión o impresión.
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/ordenes/${id_orden}/print`}>Abrir</Link>
                      </Button>
                    </ItemActions>
                  </Item>
                </FieldSet>
              )}
              <FieldSet hidden={action === 'create'}>
                <FieldLegend>Seguimiento</FieldLegend>
                <FieldDescription>
                  Visiualiza el estado de la orden.
                </FieldDescription>
                <FormCombobox
                  control={form.control}
                  name="id_estado"
                  label="Estado"
                  outPutType="number"
                  options={selectOptions.estadosOrden ?? []}
                />
              </FieldSet>
              <FieldSeparator hidden={action === 'create'} />
              <FieldSet>
                <FieldLegend>Infomación</FieldLegend>
                <FieldDescription>
                  Completa los datos principales de la orden.
                </FieldDescription>
                <FormInputGroup>
                  <FormTextField
                    control={form.control}
                    name="id_solicitud"
                    label="Solicitud Nº"
                    disabled
                    hidden
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
                options={selectOptions.proveedores ?? []}
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
                  description="Calcular el I.V.A.?"
                />
              </FormInputGroup>

              <FormTextArea
                control={form.control}
                name="observacion"
                label="Observaciones"
              />
            </FieldGroup>
          </CardContent>
          <FormFooter action={action} label={label} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
