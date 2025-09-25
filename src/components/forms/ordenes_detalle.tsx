'use client';

import { FormAction, OrdenDetalleFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { detalleOrdenSchema } from '@/validation-schemas';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import FormTextField from '@/components/forms/elements/form-text-field';
import FormInputGroup from '@/components/forms/elements/form-input-group';
import { FormFieldSet } from '@/components/forms/elements/form-fieldset';
import { Card, CardContent } from '../ui/card';
import FormHeader from './elements/form-header';
import { FormFooter } from './elements/form-footer';
import FormTextArea from './elements/form-text-area';
import { Input } from '../ui/input';
import { updateOrdenDetalleById } from '@/server-actions/ordenes-detalle';

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
                  name="id_orden"
                  label="Id orden"
                  hidden
                  disabled
                />
                <FormTextField
                  control={form.control}
                  name="id_solicitud_detalle"
                  label="Id solicitud detalle"
                  hidden
                  disabled
                />
              </FormInputGroup>
              <FormItem>
                <FormLabel>Producto o servicio</FormLabel>
                <Input
                  type="text"
                  placeholder="Producto o servicio"
                  value={detalle?.producto_servicio ?? ''}
                  disabled
                />
              </FormItem>
              <FormItem>
                <FormLabel>Cantidad solicitud</FormLabel>
                <Input
                  type="text"
                  placeholder="Cantidad solicitud"
                  value={detalle?.cantidad_solicitud ?? ''}
                  disabled
                />
              </FormItem>
              <FormInputGroup className="flex-row">
                <FormTextField
                  control={form.control}
                  name="cantidad"
                  label="Cantidad"
                  type="number"
                />
                <FormTextField
                  control={form.control}
                  name="precio_real"
                  label="Precio real"
                  type="number"
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
