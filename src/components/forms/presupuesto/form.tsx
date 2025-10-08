'use client';

import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUser } from '@/hooks/use-user';
import {
  FormAction,
  FormSelectOptions,
  PresupuestoFormType,
} from '@/types/types';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import { FormLink, FormLinkGroup } from '@/components/form-elements/form-link';
import { FormFieldSet } from '@/components/form-elements/form-fieldset';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { DatePicker } from '@/components/date-picker';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { Input } from '@/components/ui/input';
import { FormSwitch } from '@/components/form-elements/form-switch';
import { FormFooter } from '@/components/form-elements/form-footer';
import { presupuestoSchema } from '../validation/validation-schemas';

type PresupuestoFormValues = z.infer<typeof presupuestoSchema>;

interface PresupuestoFormProps {
  action: FormAction;
  form: UseFormReturn<PresupuestoFormValues>;
  onSubmit: () => void;
  isPending?: boolean;
  presupuesto?: PresupuestoFormType;
  selectOptions: FormSelectOptions;
}

export function PresupuestoForm({
  action,
  form,
  onSubmit,
  isPending = false,
  presupuesto,
  selectOptions,
}: PresupuestoFormProps) {
  const { user } = useUser();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto">
          <FormHeader action={action} name="presupuesto" noun="f" />
          <CardContent>
            <FormLinkGroup action={action}>
              <FormLink
                href={`/solicitudes/${presupuesto?.id}/detalle`}
                label="Ver lista de productos"
              />
              <FormLink
                href={`/solicitudes/${presupuesto?.id}/ordenes`}
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
                      <FormLabel>Fecha presupuesto</FormLabel>
                      <DatePicker<PresupuestoFormValues> field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormCombobox
                  control={form.control}
                  name="year"
                  label="Año"
                  options={selectOptions.years}
                />
              </FormInputGroup>
              <FormCombobox
                control={form.control}
                name="id_entidad_academica"
                label="Carrera / curso / área"
                options={selectOptions.entidadesAcademicas}
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
          <FormFooter action={action} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
