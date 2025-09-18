'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DetalleSelectOptions,
  FormAction,
  SolicitudDetalleForm,
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
import { prioridad } from '@/components/actionbar/filter/filter-states-data';
import { createSolicitudDetalle } from '@/lib/actions/solicitudes-detalle';

interface DetalleFormProps {
  idSolicitud: number;
  action: FormAction;
  product?: SolicitudDetalleForm;
  selectOptions: DetalleSelectOptions;
}

export function DetalleForm({
  idSolicitud,
  action,
  product,
  selectOptions,
}: DetalleFormProps) {
  const form = useForm<z.infer<typeof detalleSolicitudSchema>>({
    resolver: zodResolver(detalleSolicitudSchema),
    defaultValues: product
      ? {
          id_solicitud: product.id_solicitud ?? idSolicitud,
          producto_servicio: product.producto_servicio ?? '',
          cantidad: product.cantidad ?? 0,
          id_unidad_medida: product.id_unidad_medida ?? 0,
          precio: product.precio ?? 0,
          observaciones: product.observaciones ?? null,
          prioridad: product.prioridad ?? '',
          comprado: product.comprado ?? null,
          recibido: product.recibido ?? null,
          precio_compra: product.precio_compra ?? null,
          entrega_bodega: product.entrega_bodega ?? null,
          precio_bodega: product.precio_bodega ?? null,
          id_estado: product.id_estado ?? null,
          id_ubicacion: product.id_ubicacion ?? null,
          id_categoria: product.id_categoria ?? 0,
        }
      : {
          id_solicitud: idSolicitud,
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
      createSolicitudDetalle(values, idSolicitud);
    } else if (action === 'edit' && product) {
      // updateSolicitudDetalle(provider.id, { message: undefined }, values);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span className="hidden sm:flex">Agregar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10 w-full"
          >
            <DialogHeader>
              <DialogTitle>{`${action === 'create' ? 'Agregar' : 'Editar'} producto o servicio`}</DialogTitle>
              <DialogDescription>
                {`Haz cambios en el producto o servicio, haz click en ${action === 'create' ? 'agregar' : 'guardar'} cuando
                estés listo.`}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 w-full">
              <FormTextField
                control={form.control}
                name="id_solicitud"
                label="Id solicitud"
                hidden
                disabled
              />
              <FormTextField
                control={form.control}
                name="producto_servicio"
                label="Nombre o descripción"
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
              <FormInputGroup className="flex-row">
                <FormCombobox
                  form={form}
                  name="id_unidad_medida"
                  label="U/M"
                  options={selectOptions.unidadesMedida}
                />
              </FormInputGroup>
              <FormTextField
                control={form.control}
                name="observaciones"
                label="Observaciones"
              />
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
                  options={selectOptions.estados}
                />
              </FormInputGroup>
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
                  options={selectOptions.ubicaciones}
                />
                <FormCombobox
                  form={form}
                  name="id_categoria"
                  label="Categoría"
                  options={selectOptions.categorias}
                />
              </FormInputGroup>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">
                {action === 'create' ? 'Agregar' : 'Guardar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
