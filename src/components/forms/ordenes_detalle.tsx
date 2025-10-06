'use client';

import { FormAction, OrdenDetalleFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { detalleOrdenSchema } from '@/components/forms/validation/validation-schemas';
import { Form } from '@/components/ui/form';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormFieldSet } from '@/components/form-elements/form-fieldset';
import { Card, CardContent } from '../ui/card';
import { FormHeader } from '../form-elements/form-header';
import { FormFooter } from '../form-elements/form-footer';
import { FormTextArea } from '../form-elements/form-text-area';
import { updateOrdenDetalleById } from '@/server-actions/ordenes-detalle';
import { FormTextReadOnly } from '../form-elements/form-text-readonly';
import { FormTextAreaReadOnly } from '../form-elements/form-text-area-readonly';

interface OrdenDetalleFormProps {
  action: FormAction;
  detalle?: OrdenDetalleFormType;
}

export function OrdenDetalleForm({ action, detalle }: OrdenDetalleFormProps) {
  const form = useForm<z.infer<typeof detalleOrdenSchema>>({
    resolver: zodResolver(detalleOrdenSchema),
    defaultValues: detalle
      ? {
          id_orden: detalle.id_orden ?? 0,
          id_solicitud_detalle: detalle.id_solicitud_detalle ?? 0,
          cantidad: detalle.cantidad ?? 0,
          precio_real: detalle.precio_real ?? 0,
          observaciones: detalle.observaciones ?? '',
        }
      : {
          id_orden: 0,
          id_solicitud_detalle: 0,
          cantidad: 0,
          precio_real: 0,
          observaciones: '',
        },
  });

  function onSubmit(values: z.infer<typeof detalleOrdenSchema>) {
    if (action === 'create') {
      alert('Función aún no creada.');
    } else if (action === 'edit' && detalle) {
      updateOrdenDetalleById(detalle.id, values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <FormHeader action={action} name="detalle" noun="m" />
          <CardContent>
            <FormFieldSet name="info">
              <FormInputGroup className="hidden">
                <FormTextField
                  control={form.control}
                  name="id_solicitud_detalle"
                  label="Id solicitud detalle"
                  hidden
                  disabled
                />
                <FormTextField
                  control={form.control}
                  name="id_orden"
                  label="Id orden"
                  hidden
                  disabled
                />
              </FormInputGroup>
              <FormTextAreaReadOnly
                value={detalle?.producto_servicio}
                label="Producto o servicio"
              />
              <FormTextReadOnly
                value={detalle?.cantidad_solicitud}
                label="Cantidad solicitud"
              />
              <FormInputGroup className="flex-row">
                <FormTextField
                  control={form.control}
                  name="cantidad"
                  label="Cantidad"
                />
                <FormTextField
                  control={form.control}
                  name="precio_real"
                  label="Precio real"
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
