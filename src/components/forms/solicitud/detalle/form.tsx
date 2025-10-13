'use client';

import { FormSelectOptions } from '@/types/types';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { detalleSolicitudSchema } from '../../validation/validation-schemas';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FieldGroup, FieldSeparator, FieldSet } from '@/components/ui/field';

type SolicitudDetalleFormValue = z.infer<typeof detalleSolicitudSchema>;

interface PresupuestoDetalleFormProps {
  form: UseFormReturn<SolicitudDetalleFormValue>;
  selectOptions: FormSelectOptions;
}

export function SolicitudDetalleForm({
  form,
  selectOptions,
}: PresupuestoDetalleFormProps) {
  return (
    <FieldGroup>
      <FieldSet>
        <FormTextField
          control={form.control}
          name="id_solicitud"
          label="Id solicitud"
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
          <FormCombobox
            control={form.control}
            name="id_unidad_medida"
            label="Unidad de medida"
            options={selectOptions.unidadesMedida ?? []}
          />
        </FormInputGroup>
      </FieldSet>
      <FieldSet>
        <FormTextArea
          control={form.control}
          name="observacion"
          label="Observación"
        />
      </FieldSet>
    </FieldGroup>
  );
}
