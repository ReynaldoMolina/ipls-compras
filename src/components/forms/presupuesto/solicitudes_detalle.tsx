'use client';

import {
  DetalleSelectOptions,
  FormAction,
  SolicitudDetalleFormType,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { detalleSolicitudSchema } from '@/components/forms/validation/validation-schemas';
import { Form } from '@/components/ui/form';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { FormSelect } from '@/components/form-elements/form-select';
import {
  createSolicitudDetalle,
  updateSolicitudDetalle,
} from '@/server-actions/solicitud-detalle';
import { FormFieldSet } from '@/components/form-elements/form-fieldset';
import { Card, CardContent } from '../ui/card';
import { FormHeader } from '../form-elements/form-header';
import { FormFooter } from '../form-elements/form-footer';
import { FormTextArea } from '../form-elements/form-text-area';
import { prioridad } from '../../lib/select-options-data';
import { useUser } from '@/hooks/use-user';

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
  const { ability } = useUser();
  const canNotUpdateBodega = ability.cannot('update', 'SolicitudBodega');

  const form = useForm<z.infer<typeof detalleSolicitudSchema>>({
    resolver: zodResolver(detalleSolicitudSchema),
    defaultValues: detalle
      ? {
          id_solicitud: detalle.id_solicitud ?? id_solicitud,
          producto_servicio: detalle.producto_servicio ?? '',
          cantidad: detalle.cantidad ?? undefined,
          id_unidad_medida: detalle.id_unidad_medida ?? 0,
          precio: detalle.precio ?? undefined,
          observaciones: detalle.observaciones ?? '',
          prioridad: detalle.prioridad ?? '',
          comprado: detalle.comprado ?? undefined,
          recibido: detalle.recibido ?? undefined,
          precio_compra: detalle.precio_compra ?? undefined,
          entrega_bodega: detalle.entrega_bodega ?? undefined,
          precio_bodega: detalle.precio_bodega ?? undefined,
          id_estado: detalle.id_estado ?? null,
          id_ubicacion: detalle.id_ubicacion ?? null,
          id_categoria: detalle.id_categoria ?? 0,
        }
      : {
          id_solicitud: id_solicitud,
          producto_servicio: '',
          cantidad: undefined,
          id_unidad_medida: 0,
          precio: undefined,
          observaciones: '',
          prioridad: '',
          comprado: undefined,
          recibido: undefined,
          precio_compra: undefined,
          entrega_bodega: undefined,
          precio_bodega: undefined,
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
          <FormHeader action={action} name="producto o servicio" noun="m" />
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
                />
                <FormTextField
                  control={form.control}
                  name="precio"
                  label="Precio"
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
                  control={form.control}
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
                  disabled={canNotUpdateBodega}
                />
                <FormTextField
                  control={form.control}
                  name="recibido"
                  label="Recibido"
                  disabled={canNotUpdateBodega}
                />
                <FormTextField
                  control={form.control}
                  name="precio_compra"
                  label="Precio compra"
                  disabled={canNotUpdateBodega}
                />
              </FormInputGroup>
              <FormInputGroup className="flex-row">
                <FormTextField
                  control={form.control}
                  name="entrega_bodega"
                  label="Entrega bodega"
                  disabled={canNotUpdateBodega}
                />
                <FormTextField
                  control={form.control}
                  name="precio_bodega"
                  label="Precio bodega"
                  disabled={canNotUpdateBodega}
                />
              </FormInputGroup>
              <FormInputGroup>
                <FormCombobox
                  control={form.control}
                  name="id_ubicacion"
                  label="Ubicación"
                  options={selectOptions.ubicaciones ?? []}
                  disabled={canNotUpdateBodega}
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
