'use client';

import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { detalleOrdenSchema } from '../../validation/validation-schemas';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FieldGroup, FieldSet } from '@/components/ui/field';

type OrdenDetalleFormValue = z.infer<typeof detalleOrdenSchema>;

interface OrdenDetalleFormProps {
  form: UseFormReturn<OrdenDetalleFormValue>;
}

export function OrdenDetalleForm({ form }: OrdenDetalleFormProps) {
  return (
    <FieldGroup>
      <FieldSet>
        <FormTextField
          control={form.control}
          name="id_orden"
          label="Id orden"
          hidden
          disabled
        />
        <FormTextField
          control={form.control}
          name="id_solicitud_detalle"
          label="Id producto"
        />
        <FormInputGroup className="flex-row">
          <FormTextField
            control={form.control}
            name="cantidad"
            label="Cantidad"
          />
          <FormTextField control={form.control} name="precio" label="Precio" />
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
