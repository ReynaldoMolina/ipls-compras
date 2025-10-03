'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { solicitudSchema } from '@/validation-schemas';
import { FormFieldSet } from '../form-elements/form-fieldset';
import { ComboBoxData, FormAction, SolicitudFormType } from '@/types/types';
import { createSolicitud, updateSolicitud } from '@/server-actions/solicitudes';
import { Card, CardContent } from '../ui/card';
import { DatePicker } from '../date-picker';
import { FormInputGroup } from '../form-elements/form-input-group';
import { FormHeader } from '../form-elements/form-header';
import { FormOptions } from '../form-elements/form-options';
import { FormCombobox } from '../form-elements/form-combobox';
import { FormTextField } from '../form-elements/form-text-field';
import { FormSwitch } from '../form-elements/form-switch';
import { FormLink, FormLinkGroup } from '../form-elements/form-link';
import { FormFooter } from '../form-elements/form-footer';
import { useUser } from '@/hooks/use-user';
import { Input } from '../ui/input';
import { getCurrentDate } from '@/lib/get-current-date';

type SolicitudFormValues = z.infer<typeof solicitudSchema>;

interface SolicitudFormProps {
  action: FormAction;
  solicitud?: SolicitudFormType;
  entidadesAcademicas: ComboBoxData;
  years: ComboBoxData;
}

export function SolicitudForm({
  action,
  solicitud,
  entidadesAcademicas,
  years,
}: SolicitudFormProps) {
  const { user } = useUser();
  const { currentDate, currentYear } = getCurrentDate();

  const form = useForm<z.infer<typeof solicitudSchema>>({
    resolver: zodResolver(solicitudSchema),
    defaultValues: solicitud
      ? {
          fecha: solicitud.fecha ?? undefined,
          id_entidad_academica: solicitud.id_entidad_academica ?? 0,
          year: solicitud.year ?? 0,
          id_usuario: solicitud.id_usuario ?? '',
          revisado_bodega: solicitud.revisado_bodega ?? false,
        }
      : {
          fecha: currentDate,
          id_entidad_academica: 0,
          year: currentYear,
          id_usuario: user.id,
          revisado_bodega: false,
        },
  });

  function onSubmit(values: z.infer<typeof solicitudSchema>) {
    if (action === 'create') {
      createSolicitud(values);
    } else if (action === 'edit' && solicitud) {
      updateSolicitud(solicitud?.id, values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto">
          <FormHeader action={action} name="solicitud" noun="f">
            <FormOptions action={action} />
          </FormHeader>
          <CardContent>
            <FormLinkGroup action={action}>
              <FormLink
                href={`/solicitudes/${solicitud?.id}/detalle`}
                label="Ver lista de productos"
              />
              <FormLink
                href={`/solicitudes/${solicitud?.id}/ordenes`}
                label="Ver órdenes de compra"
              />
            </FormLinkGroup>
            <FormFieldSet name="info">
              <FormInputGroup>
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha solicitud</FormLabel>
                      <DatePicker<SolicitudFormValues> field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormCombobox
                  control={form.control}
                  name="year"
                  label="Año"
                  options={years}
                />
              </FormInputGroup>
              <FormCombobox
                control={form.control}
                name="id_entidad_academica"
                label="Carrera / curso / área"
                options={entidadesAcademicas}
              />
              <FormTextField
                control={form.control}
                name="id_usuario"
                label="Solicitado por"
                disabled
                hidden
              />
              <FormItem>
                <FormLabel>Solicitado por</FormLabel>
                <Input type="text" defaultValue={user.name ?? ''} disabled />
              </FormItem>
              <FormSwitch
                control={form.control}
                name="revisado_bodega"
                label="Estado"
                description="¿Revisado por bodega?"
              />
            </FormFieldSet>
          </CardContent>
          <FormFooter action={action} />
        </Card>
      </form>
    </Form>
  );
}
