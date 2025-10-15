'use client';

import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { detalleSolicitudSchema } from '../../validation/validation-schemas';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { unidadesMedida } from '@/lib/select-options-data';

type SolicitudDetalleFormValue = z.infer<typeof detalleSolicitudSchema>;

interface SolicitudDetalleFormProps {
  form: UseFormReturn<SolicitudDetalleFormValue>;
}

export function SolicitudDetalleForm({ form }: SolicitudDetalleFormProps) {
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
            name="unidad_medida"
            label="Unidad de medida"
            options={unidadesMedida ?? []}
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
