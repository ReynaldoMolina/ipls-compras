'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { solvenciaSchema } from '@/validation-schemas';
import FormButtons from './elements/form-buttons';
import { Solvencia } from '@/types/types';
import { createSolvencia, updateSolvencia } from '@/lib/actions/solvencias';
import { DatePicker } from '../date-picker';
import { Input } from '../ui/input';
import FormInputGroup from './elements/form-input-group';
import FormContainer from './elements/form-container';
import { FormFieldSet } from './elements/form-fieldset';

export function SolvenciaForm({
  action,
  solvencia,
  id_proveedor,
}: {
  action: 'create' | 'edit';
  solvencia?: Solvencia;
  id_proveedor: number;
}) {
  const form = useForm<z.infer<typeof solvenciaSchema>>({
    resolver: zodResolver(solvenciaSchema),
    defaultValues: solvencia
      ? {
          id_proveedor: solvencia.id_proveedor,
          emitida: solvencia.emitida ?? null,
          vence: solvencia.vence ?? null,
          verificado: solvencia.verificado ?? undefined,
          recibido: solvencia.recibido ?? null,
          url: solvencia.url ?? undefined,
          id_usuario: solvencia.id_usuario ?? 1,
        }
      : {
          id_proveedor: id_proveedor,
          emitida: null,
          vence: null,
          verificado: undefined,
          recibido: null,
          url: undefined,
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
      <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="id_proveedor"
          render={({ field }) => (
            <FormItem className="hidden">
              <Input placeholder="Id proveedor" {...field} disabled />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldSet name="verification">
          <FormInputGroup>
            <FormField
              control={form.control}
              name="verificado"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Verificado el</FormLabel>
                  <DatePicker field={field} />
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
                  <DatePicker field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormInputGroup>
          <FormField
            control={form.control}
            name="id_usuario"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Verificado por</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
                  <DatePicker field={field} />
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
                  <DatePicker field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormInputGroup>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input placeholder="Url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldSet>
        <FormButtons action={action} />
      </FormContainer>
    </Form>
  );
}
