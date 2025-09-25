'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { solvenciaSchema } from '@/validation-schemas';
import { FormAction, Solvencia } from '@/types/types';
import { createSolvencia, updateSolvencia } from '@/server-actions/solvencias';
import { DatePicker } from '../date-picker';
import FormInputGroup from './elements/form-input-group';
import { FormFieldSet } from './elements/form-fieldset';
import { Card, CardContent } from '../ui/card';
import FormHeader from './elements/form-header';
import FormOptions from './elements/form-options';
import FormTextField from './elements/form-text-field';
import { FormFooter } from './elements/form-footer';

type SolvenciaFormValues = z.infer<typeof solvenciaSchema>;

interface SolvenciaFormProps {
  action: FormAction;
  solvencia?: Solvencia;
  id_proveedor: number;
}

export function SolvenciaForm({
  action,
  solvencia,
  id_proveedor,
}: SolvenciaFormProps) {
  const form = useForm<z.infer<typeof solvenciaSchema>>({
    resolver: zodResolver(solvenciaSchema),
    defaultValues: solvencia
      ? {
          id_proveedor: solvencia.id_proveedor,
          emitida: solvencia.emitida ?? null,
          vence: solvencia.vence ?? null,
          verificado: solvencia.verificado ?? undefined,
          recibido: solvencia.recibido ?? null,
          url: solvencia.url ?? null,
          id_usuario: solvencia.id_usuario ?? 1,
        }
      : {
          id_proveedor: id_proveedor,
          emitida: null,
          vence: null,
          verificado: undefined,
          recibido: null,
          url: null,
          id_usuario: 1,
        },
  });

  function onSubmit(values: z.infer<typeof solvenciaSchema>) {
    if (action === 'create') {
      createSolvencia(undefined, values, id_proveedor);
    } else if (action === 'edit' && solvencia) {
      updateSolvencia(
        solvencia.id,
        { message: undefined },
        values,
        id_proveedor
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <FormHeader action={action} name="solvencia" noun="f">
            <FormOptions action={action} />
          </FormHeader>
          <CardContent>
            <FormFieldSet name="verification">
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
                disabled
              />
            </FormFieldSet>
            <FormFieldSet name="info">
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
            </FormFieldSet>
          </CardContent>
          <FormFooter action={action} />
        </Card>
      </form>
    </Form>
  );
}
