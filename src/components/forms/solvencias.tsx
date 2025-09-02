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
// import { createProvider, updateProvider } from '@/lib/actions/providers';
import { DatePicker } from '../date-picker';
import { Input } from '../ui/input';
import FormInputGroup from './elements/form-input-group';

export function SolvenciaForm({
  action,
  solvencia,
  id_proveedor,
}: {
  action: 'create' | 'edit';
  solvencia?: Solvencia;
  id_proveedor: number;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof solvenciaSchema>>({
    resolver: zodResolver(solvenciaSchema),
    defaultValues: solvencia ?? {
      id_proveedor: id_proveedor,
      emitida: undefined,
      vence: undefined,
      verificado: undefined,
      recibido: undefined,
      url: '',
      id_usuario: 0,
    },
  });

  function onSubmit(values: z.infer<typeof solvenciaSchema>) {
    // if (action === 'create') {
    //   createProvider(undefined, values);
    // } else if (action === 'edit' && provider) {
    //   updateProvider(provider.id, { message: undefined }, values);
    // }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id_proveedor"
          render={({ field }) => (
            <FormItem className="hidden">
              <Input placeholder="Id proveedor" {...field} hidden />
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormButtons action={action} allowCancel={false} />
      </form>
    </Form>
  );
}
