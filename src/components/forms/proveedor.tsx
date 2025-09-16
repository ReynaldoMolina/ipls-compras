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
import FormInputGroup from './elements/form-input-group';
import { FormFieldSet } from './elements/form-fieldset';
import FormButtons from './elements/form-buttons';
import { ComboBoxData, ProveedorFormType } from '@/types/types';
import { createProvider, updateProvider } from '@/lib/actions/providers';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import SolvenciaState from '../tables/solvencia-state-cell';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

type ProviderFormValues = z.infer<typeof providerSchema>;

export function ProveedorForm({
  action,
  provider,
  departamentos,
  sectores,
  subsectores,
}: {
  action: 'create' | 'edit';
  provider?: ProveedorFormType;
  departamentos: ComboBoxData;
  sectores: ComboBoxData;
  subsectores: ComboBoxData;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: provider
      ? {
          nombre_comercial: provider.nombre_comercial ?? '',
          razon_social: provider.razon_social ?? '',
          ruc: provider.ruc ?? '',
          contacto_principal: provider.contacto_principal ?? '',
          telefono: provider.telefono ?? '',
          correo: provider.correo ?? '',
          id_departamento: provider.id_departamento ?? 0,
          direccion: provider.direccion ?? '',
          id_sector: provider.id_sector ?? 0,
          id_subsector: provider.id_subsector ?? 0,
        }
      : {
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {action === 'create' ? 'Nuevo' : 'Editar'} proveedor
            </CardTitle>
            <CardDescription>
              {action === 'create' ? 'Ingresa' : 'Edita'} la información del
              proveedor, haz click en{' '}
              {action === 'create' ? 'Crear' : 'Guardar'} cuando estés listo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {action === 'edit' && (
              <FormFieldSet name="solvencia">
                <div className="inline-flex gap-3 items-center">
                  <div className="inline-flex gap-2 text-sm items-center">
                    <span className="text-muted-foreground">Vence el:</span>
                    <SolvenciaState date={provider?.solvencia} />
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={`/proveedores/${provider?.id}/solvencias`}
                      className="inline-flex items-center gap-2 ml-auto"
                    >
                      Ver solvencias
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </FormFieldSet>
            )}

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
                        <Input
                          placeholder="Razón social"
                          {...field}
                          value={field.value ?? ''}
                        />
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
                        <Input
                          placeholder="RUC"
                          {...field}
                          value={field.value ?? ''}
                        />
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
                        <Input
                          placeholder="Nombre"
                          {...field}
                          value={field.value ?? ''}
                        />
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
                        <Input
                          placeholder="Teléfono"
                          {...field}
                          value={field.value ?? ''}
                        />
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
                        <Input
                          placeholder="Correo"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<ProviderFormValues>
                  control={form.control}
                  name="id_departamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento</FormLabel>
                      <ComboBox
                        field={field}
                        options={departamentos}
                        form={form}
                      />
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
                      <Input
                        placeholder="Dirección"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldSet>

            <FormFieldSet name="sector">
              <FormInputGroup>
                <FormField<ProviderFormValues>
                  control={form.control}
                  name="id_sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sector</FormLabel>
                      <ComboBox
                        field={field}
                        options={sectores}
                        form={form}
                        updateParams={true}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField<ProviderFormValues>
                  control={form.control}
                  name="id_subsector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subsector</FormLabel>
                      <ComboBox
                        field={field}
                        options={subsectores}
                        form={form}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormInputGroup>
            </FormFieldSet>
          </CardContent>
          <CardFooter>
            <FormButtons action={action} />
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
