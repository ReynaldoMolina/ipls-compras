'use client';

import { FormAction, FormSelectOptions } from '@/types/types';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { FormFooter } from '@/components/form-elements/form-footer';
import { FieldDescription, FieldLegend, FieldSet } from '@/components/ui/field';
import z from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { solicitudSchema } from '../validation/validation-schemas';
import { DatePicker } from '@/components/date-picker';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormTextReadOnly } from '@/components/form-elements/form-text-readonly';
import { useUser } from '@/hooks/use-user';

type SolicitudFormValues = z.infer<typeof solicitudSchema>;

interface SolicitudFormProps {
  action: FormAction;
  form: UseFormReturn<SolicitudFormValues>;
  onSubmit: (values: SolicitudFormValues) => void;
  selectOptions: FormSelectOptions;
  isPending: boolean;
  label?: string;
}

export function SolicitudForm({
  action,
  form,
  onSubmit,
  selectOptions,
  isPending,
  label,
}: SolicitudFormProps) {
  const { user } = useUser();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Card className="max-w-3xl mx-auto">
          <FormHeader
            action={action}
            name="solicitud"
            noun="f"
            label={label?.toLocaleLowerCase()}
          />
          <CardContent>
            <FieldSet>
              <FieldLegend>Información básica</FieldLegend>
              <FieldDescription>
                Completa los datos principales de la solicitud.
              </FieldDescription>
              <FormInputGroup>
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Elaborado el</FormLabel>
                      <DatePicker<SolicitudFormValues> field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fecha_a_utilizar"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha a utilizar</FormLabel>
                      <DatePicker<SolicitudFormValues> field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormInputGroup>
              <FormCombobox
                control={form.control}
                name="id_entidad_academica"
                label="Carrera / curso / área"
                options={selectOptions.entidadesAcademicas}
              />
              {action === 'create' && (
                <FormTextReadOnly value={user.name} label="Solicitado por" />
              )}
            </FieldSet>
          </CardContent>
          <FormFooter action={action} isPending={isPending} label={label} />
        </Card>
      </form>
    </Form>
  );
}
