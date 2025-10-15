'use client';

import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { detallePresupuestoSchema } from '../../validation/validation-schemas';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FieldGroup, FieldSeparator, FieldSet } from '@/components/ui/field';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DatePicker } from '@/components/date-picker';
import { unidadesMedida } from '@/lib/select-options-data';

type PresupuestoDetalleFormValue = z.infer<typeof detallePresupuestoSchema>;

interface PresupuestoDetalleFormProps {
  form: UseFormReturn<PresupuestoDetalleFormValue>;
}

export function PresupuestoDetalleForm({ form }: PresupuestoDetalleFormProps) {
  return (
    <FieldGroup>
      <FieldSet>
        <FormTextField
          control={form.control}
          name="id_presupuesto"
          label="Id presupuesto"
          hidden
          disabled
        />
        <FormTextArea
          control={form.control}
          name="producto_servicio"
          label="Producto o servicio"
          placeholder="Descripción del producto"
        />
        <FormInputGroup className="flex-row">
          <FormTextField
            control={form.control}
            name="cantidad"
            label="Cantidad"
          />
          <FormTextField
            control={form.control}
            name="precio_sugerido"
            label="Precio sugerido"
          />
        </FormInputGroup>
        <FormInputGroup>
          <FormCombobox
            control={form.control}
            name="unidad_medida"
            label="Unidad de medida"
            options={unidadesMedida ?? []}
          />
          <FormTextField
            control={form.control}
            name="categoria"
            label="Categoría"
          />
        </FormInputGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FormField
          control={form.control}
          name="prioridad"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha aprox. a utilizar</FormLabel>
              <DatePicker field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormTextArea
          control={form.control}
          name="observacion"
          label="Observación"
        />
      </FieldSet>
    </FieldGroup>
  );
}
