'use client';

import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { solvenciaSchema } from '@/components/forms/validation/validation-schemas';
import { FormAction } from '@/types/types';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import { FormFieldSet } from '@/components/form-elements/form-fieldset';
import { FormTextField } from '@/components/form-elements/form-text-field';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/ui/input';
import { FormFooter } from '@/components/form-elements/form-footer';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';

type SolvenciaFormValues = z.infer<typeof solvenciaSchema>;

interface SolvenciaFormProps {
  action: FormAction;
  form: UseFormReturn<SolvenciaFormValues>;
  onSubmit: (values: SolvenciaFormValues) => void;
  isPending: boolean;
}

export function SolvenciaForm({
  action,
  form,
  onSubmit,
  isPending,
}: SolvenciaFormProps) {
  const { user } = useUser();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto">
          <FormHeader action={action} name="solvencia" noun="f" />
          <CardContent>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Verificación</FieldLegend>
                <FieldDescription>
                  Indica cuándo se verificó y se recibió la información fiscal.
                </FieldDescription>
                <FormTextField
                  control={form.control}
                  name="id_proveedor"
                  label="Id proveedor"
                  placeholder="Id proveedor"
                  hidden
                  disabled
                />
                <FormInputGroup>
                  <FormField
                    control={form.control}
                    name="verificado"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Verificado el</FormLabel>
                        <DatePicker<SolvenciaFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recibido"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Recibido el</FormLabel>
                        <DatePicker<SolvenciaFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormInputGroup>
                <FormTextField
                  control={form.control}
                  name="id_usuario"
                  label="Verificado por"
                  placeholder="Usuario"
                  hidden
                  disabled
                />
                <FormItem>
                  <FormLabel>Verificado por</FormLabel>
                  <Input type="text" defaultValue={user.name ?? ''} disabled />
                </FormItem>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Información</FieldLegend>
                <FieldDescription>
                  Registra las fechas de emisión y vencimiento de la solvencia.
                </FieldDescription>
                <FormInputGroup>
                  <FormField
                    control={form.control}
                    name="emitida"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Emitida el</FormLabel>
                        <DatePicker<SolvenciaFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vence"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Vence el</FormLabel>
                        <DatePicker<SolvenciaFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormInputGroup>
                <FormTextField
                  control={form.control}
                  name="url"
                  label="Url"
                  placeholder="Url"
                />
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <FormFooter action={action} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
