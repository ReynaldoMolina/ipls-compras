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
import { ordenesSchema } from '@/validation-schemas';
import { FormFieldSet } from './elements/form-fieldset';
import { ComboBoxData, FormAction, OrdenFormType } from '@/types/types';
import { Card, CardContent } from '../ui/card';
import { DatePicker } from '../date-picker';
import FormInputGroup from './elements/form-input-group';
import FormHeader from './elements/form-header';
import FormOptions from './elements/form-options';
import FormCombobox from './elements/form-combobox';
import FormTextField from './elements/form-text-field';
import { FormLink, FormLinkGroup } from './elements/form-link';
import FormFooter from './elements/form-footer';
import FormTextArea from './elements/form-text-area';

type OrdenFormValues = z.infer<typeof ordenesSchema>;

interface OrdenFormProps {
  action: FormAction;
  orden?: OrdenFormType;
  id_solicitud: number;
  estados: ComboBoxData;
}

export function OrdenForm({
  action,
  orden,
  id_solicitud,
  estados,
}: OrdenFormProps) {
  const form = useForm<z.infer<typeof ordenesSchema>>({
    resolver: zodResolver(ordenesSchema),
    defaultValues: orden
      ? {
          id_solicitud: orden.id_solicitud ?? id_solicitud,
          fecha_creacion: orden.fecha_creacion ?? undefined,
          id_estado: orden.id_estado ?? 0,
          observaciones: orden.observaciones ?? '',
        }
      : {
          id_solicitud: id_solicitud,
          fecha_creacion: undefined,
          id_estado: 0,
          observaciones: '',
        },
  });

  function onSubmit(values: z.infer<typeof ordenesSchema>) {
    // if (action === 'create') {
    //   createSolicitud(undefined, values);
    // } else if (action === 'edit' && orden) {
    //   updateSolicitud(orden?.id, { message: undefined }, values);
    // }
    alert('orden form test');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto">
          <FormHeader action={action} name="orden" noun="f">
            <FormOptions action={action} />
          </FormHeader>
          <CardContent>
            <FormLinkGroup>
              <FormLink
                action={action}
                href={`/solicitudes/${id_solicitud}/ordenes/${orden?.id}/detalle`}
                label="Ver lista de productos"
              />
            </FormLinkGroup>
            <FormFieldSet name="info">
              <FormInputGroup>
                <FormTextField
                  control={form.control}
                  name="id_solicitud"
                  label="Solicitud Nº"
                  hidden
                  disabled
                />
                <FormField
                  control={form.control}
                  name="fecha_creacion"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha creación</FormLabel>
                      <DatePicker<OrdenFormValues> field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormInputGroup>
              <FormCombobox
                form={form}
                name="id_estado"
                label="Estado"
                options={estados}
              />
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
