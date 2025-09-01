'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { providerSchema } from '@/validation-schemas';
import { ComboBox } from '../combo-box';
import FormContainer from './elements/form-container';
import FormInputGroup from './elements/form-input-group';
import { FormFieldSet } from './elements/form-fieldset';
import FormButtons from './elements/form-buttons';
import { ComboBoxData, Provider } from '@/types/types';
import { createProvider, updateProvider } from '@/lib/actions/providers';
import FormTitle from './elements/form-title';

export function ProviderForm({
  action,
  provider,
  departamentos,
  sectores,
  subsectores,
}: {
  action: 'create' | 'edit';
  provider?: Provider;
  departamentos: ComboBoxData;
  sectores: ComboBoxData;
  subsectores: ComboBoxData;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: provider ?? {
      nombre_comercial: '',
      razon_social: '',
      ruc: '',
      contacto_principal: '',
      telefono: '',
      correo: '',
      id_departamento: 0,
      direccion: '',
      id_sector: 0,
      id_subsector: 0,
    },
  });

  function onSubmit(values: z.infer<typeof providerSchema>) {
    if (action === 'create') {
      createProvider(undefined, values);
    } else if (action === 'edit' && provider) {
      updateProvider(provider.id, { message: undefined }, values);
    }
  }

  return (
    <Form {...form}>
      <FormTitle title="Información del proveedor" />
      <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldSet name="info">
          <FormField
            control={form.control}
            name="nombre_comercial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre comercial</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormInputGroup>
            <FormField
              control={form.control}
              name="razon_social"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razón social</FormLabel>
                  <FormControl>
                    <Input placeholder="Razón social" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ruc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUC</FormLabel>
                  <FormControl>
                    <Input placeholder="RUC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormInputGroup>
        </FormFieldSet>

        <FormFieldSet name="contact">
          <FormInputGroup>
            <FormField
              control={form.control}
              name="contacto_principal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormInputGroup>
          <FormInputGroup>
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="Correo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento</FormLabel>
                  <ComboBox field={field} data={departamentos} form={form} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormInputGroup>
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Dirección" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormFieldSet>

        <FormFieldSet name="sector">
          <FormInputGroup>
            <FormField
              control={form.control}
              name="id_sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector</FormLabel>
                  <ComboBox
                    field={field}
                    data={sectores}
                    form={form}
                    updateParams={true}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_subsector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subsector</FormLabel>
                  <ComboBox field={field} data={subsectores} form={form} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormInputGroup>
        </FormFieldSet>
        <FormButtons action={action} />
      </FormContainer>
    </Form>
  );
}
