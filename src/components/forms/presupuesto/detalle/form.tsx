'use client';

import { FormSelectOptions } from '@/types/types';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { detallePresupuestoSchema } from '../../validation/validation-schemas';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FieldGroup, FieldSeparator, FieldSet } from '@/components/ui/field';
import { FormSelect } from '@/components/form-elements/form-select';
import { prioridad } from '@/lib/select-options-data';

type PresupuestoDetalleFormValue = z.infer<typeof detallePresupuestoSchema>;

interface PresupuestoDetalleFormProps {
  form: UseFormReturn<PresupuestoDetalleFormValue>;
  selectOptions: FormSelectOptions;
}

export function PresupuestoDetalleForm({
  form,
  selectOptions,
}: PresupuestoDetalleFormProps) {
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
            name="id_unidad_medida"
            label="Unidad de medida"
            options={selectOptions.unidadesMedida ?? []}
          />
          <FormCombobox
            control={form.control}
            name="id_categoria"
            label="Categoría"
            options={selectOptions.categorias ?? []}
          />
        </FormInputGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FormSelect
          control={form.control}
          name="prioridad"
          label="Prioridad"
          options={prioridad}
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
