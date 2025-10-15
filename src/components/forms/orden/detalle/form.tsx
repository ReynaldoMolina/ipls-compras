'use client';

import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { detalleOrdenSchemaBase } from '../../validation/validation-schemas';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { FormTextReadOnly } from '@/components/form-elements/form-text-readonly';
import { OrdenDetalleFormType } from '@/types/types';

type OrdenDetalleFormValue = z.infer<typeof detalleOrdenSchemaBase>;

interface OrdenDetalleFormProps {
  form: UseFormReturn<OrdenDetalleFormValue>;
  detalle: OrdenDetalleFormType;
}

export function OrdenDetalleForm({ form, detalle }: OrdenDetalleFormProps) {
  return (
    <FieldGroup>
      <FieldSet>
        <FormTextField
          control={form.control}
          name="id_orden"
          label="Id orden"
          disabled
          hidden
        />
        <FormTextField
          control={form.control}
          name="id_solicitud_detalle"
          label="Id producto"
          disabled
          hidden
        />
        <FormTextReadOnly
          value={detalle.producto_servicio ?? ''}
          label="Producto o servicio"
        />
        <FormInputGroup className="flex-row">
          <FormTextReadOnly
            value={detalle.cantidad_solicitud ?? ''}
            label="Cantidad solicitud"
          />
          <FormTextField
            control={form.control}
            name="cantidad"
            label="Cantidad"
          />
        </FormInputGroup>
        <FormTextField control={form.control} name="precio" label="Precio" />
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
