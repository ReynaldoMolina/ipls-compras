'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { providerSchema } from '@/validation-schemas';
import FormInputGroup from '../form-elements/form-input-group';
import { FormFieldSet } from '../form-elements/form-fieldset';
import { FormFooter } from '../form-elements/form-footer';
import { ComboBoxData, FormAction, ProveedorFormType } from '@/types/types';
import { createProvider, updateProvider } from '@/server-actions/providers';
import { Card, CardContent } from '../ui/card';
import FormHeader from '../form-elements/form-header';
import FormTextField from '../form-elements/form-text-field';
import FormCombobox from '../form-elements/form-combobox';
import FormOptions from '../form-elements/form-options';
import { FormLink, FormLinkGroup } from '../form-elements/form-link';

interface ProveedorFormProps {
  action: FormAction;
  provider?: ProveedorFormType;
  departamentos: ComboBoxData;
  sectores: ComboBoxData;
  subsectores: ComboBoxData;
}

export function ProveedorForm({
  action,
  provider,
  departamentos,
  sectores,
  subsectores,
}: ProveedorFormProps) {
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
        <Card className="mx-auto max-w-3xl">
          <FormHeader action={action} name="proveedor" noun="m">
            <FormOptions action={action} />
          </FormHeader>
          <CardContent>
            <FormLinkGroup action={action}>
              <FormLink
                href={`/proveedores/${provider?.id}/solvencias`}
                label="Ir a solvencias"
              />
            </FormLinkGroup>
            <FormFieldSet name="info">
              <FormTextField
                control={form.control}
                name="nombre_comercial"
                label="Nombre comercial"
              />
              <FormInputGroup>
                <FormTextField
                  control={form.control}
                  name="razon_social"
                  label="Razón social"
                />
                <FormTextField control={form.control} name="ruc" label="RUC" />
              </FormInputGroup>
            </FormFieldSet>

            <FormFieldSet name="contact">
              <FormInputGroup>
                <FormTextField
                  control={form.control}
                  name="contacto_principal"
                  label="Nombre"
                />
                <FormTextField
                  control={form.control}
                  name="telefono"
                  label="Teléfono"
                />
              </FormInputGroup>
              <FormInputGroup>
                <FormTextField
                  control={form.control}
                  name="correo"
                  label="Correo"
                />
                <FormCombobox
                  form={form}
                  name="id_departamento"
                  label="Departamento"
                  options={departamentos}
                />
              </FormInputGroup>
              <FormTextField
                control={form.control}
                name="direccion"
                label="Dirección"
              />
            </FormFieldSet>

            <FormFieldSet name="sector">
              <FormCombobox
                form={form}
                name="id_sector"
                label="Sector"
                options={sectores}
                updateParams
              />
              <FormCombobox
                form={form}
                name="id_subsector"
                label="Subsector"
                options={subsectores}
                resetOnOptionsChange
              />
            </FormFieldSet>
          </CardContent>
          <FormFooter action={action} />
        </Card>
      </form>
    </Form>
  );
}
