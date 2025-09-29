'use client';

import {
  DetalleSelectOptions,
  FormAction,
  SolicitudDetalleFormType,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { detalleSolicitudSchema } from '@/validation-schemas';
import { Form } from '@/components/ui/form';
import FormTextField from '@/components/forms/elements/form-text-field';
import FormInputGroup from '@/components/forms/elements/form-input-group';
import FormCombobox from '@/components/forms/elements/form-combobox';
import { FormSelect } from '@/components/forms/elements/form-select';
import {
  createSolicitudDetalle,
  updateSolicitudDetalle,
} from '@/server-actions/solicitudes-detalle';
import { FormFieldSet } from '@/components/forms/elements/form-fieldset';
import { Card, CardContent } from '../ui/card';
import FormHeader from './elements/form-header';
import FormOptions from './elements/form-options';
import { FormFooter } from './elements/form-footer';
import FormTextArea from './elements/form-text-area';
import { prioridad } from '../select-options-data';

interface SolicitudDetalleFormProps {
  action: FormAction;
  detalle?: SolicitudDetalleFormType;
  id_solicitud: number;
  selectOptions: DetalleSelectOptions;
}

export function SolicitudDetalleForm({
  action,
  detalle,
  id_solicitud,
  selectOptions,
}: SolicitudDetalleFormProps) {
  const form = useForm<z.infer<typeof detalleSolicitudSchema>>({
    resolver: zodResolver(detalleSolicitudSchema),
    defaultValues: detalle
      ? {
          id_solicitud: detalle.id_solicitud ?? id_solicitud,
          producto_servicio: detalle.producto_servicio ?? '',
          cantidad: detalle.cantidad ?? 0,
          id_unidad_medida: detalle.id_unidad_medida ?? 0,
          precio: detalle.precio ?? 0,
          observaciones: detalle.observaciones ?? '',
          prioridad: detalle.prioridad ?? '',
          comprado: detalle.comprado ?? null,
          recibido: detalle.recibido ?? null,
          precio_compra: detalle.precio_compra ?? null,
          entrega_bodega: detalle.entrega_bodega ?? null,
          precio_bodega: detalle.precio_bodega ?? null,
          id_estado: detalle.id_estado ?? null,
          id_ubicacion: detalle.id_ubicacion ?? null,
          id_categoria: detalle.id_categoria ?? 0,
        }
      : {
          id_solicitud: id_solicitud,
          producto_servicio: '',
          cantidad: 0,
          id_unidad_medida: 0,
          precio: 0,
          observaciones: '',
          prioridad: '',
          comprado: null,
          recibido: null,
          precio_compra: null,
          entrega_bodega: null,
          precio_bodega: null,
          id_estado: null,
          id_ubicacion: null,
          id_categoria: 0,
        },
  });

  function onSubmit(values: z.infer<typeof detalleSolicitudSchema>) {
    if (action === 'create') {
      createSolicitudDetalle(values, id_solicitud);
    } else if (action === 'edit' && detalle) {
      updateSolicitudDetalle(detalle.id, values, id_solicitud);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <FormHeader action={action} name="detalle" noun="m">
            <FormOptions action={action} />
          </FormHeader>
          <CardContent>
            <FormFieldSet name="info">
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
              />
              <FormInputGroup className="flex-row">
                <FormTextField
                  control={form.control}
                  name="cantidad"
                  label="Cantidad"
                  type="number"
                />
                <FormTextField
                  control={form.control}
                  name="precio"
                  label="Precio"
                  type="number"
                />
              </FormInputGroup>
              <FormInputGroup>
                <FormCombobox
                  form={form}
                  name="id_unidad_medida"
                  label="Unidad de medida"
                  options={selectOptions.unidadesMedida ?? []}
                />
                <FormCombobox
                  form={form}
                  name="id_categoria"
                  label="Categoría"
                  options={selectOptions.categorias ?? []}
                />
              </FormInputGroup>
              <FormTextArea
                control={form.control}
                name="observaciones"
                label="Observaciones"
              />
            </FormFieldSet>
            <FormFieldSet name="status">
              <FormInputGroup>
                <FormSelect
                  control={form.control}
                  name="prioridad"
                  label="Prioridad"
                  options={prioridad}
                />
                <FormCombobox
                  form={form}
                  name="id_estado"
                  label="Estado"
                  options={selectOptions.estados ?? []}
                />
              </FormInputGroup>
            </FormFieldSet>
            <FormFieldSet name="bodega">
              <FormInputGroup className="flex-row">
                <FormTextField
                  control={form.control}
                  name="comprado"
                  label="Comprado"
                  type="number"
                />
                <FormTextField
                  control={form.control}
                  name="recibido"
                  label="Recibido"
                  type="number"
                />
                <FormTextField
                  control={form.control}
                  name="precio_compra"
                  label="Precio compra"
                  type="number"
                />
              </FormInputGroup>
              <FormInputGroup className="flex-row">
                <FormTextField
                  control={form.control}
                  name="entrega_bodega"
                  label="Entrega bodega"
                  type="number"
                />
                <FormTextField
                  control={form.control}
                  name="precio_bodega"
                  label="Precio bodega"
                  type="number"
                />
              </FormInputGroup>
              <FormInputGroup>
                <FormCombobox
                  form={form}
                  name="id_ubicacion"
                  label="Ubicación"
                  options={selectOptions.ubicaciones ?? []}
                />
              </FormInputGroup>
            </FormFieldSet>
          </CardContent>
          <FormFooter action={action} />
        </Card>
      </form>
    </Form>
  );
}
