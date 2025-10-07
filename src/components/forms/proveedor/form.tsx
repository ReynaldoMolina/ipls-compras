'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { providerSchema } from '@/components/forms/validation/validation-schemas';
import { FormInputGroup } from '../../form-elements/form-input-group';
import { FormFieldSet } from '../../form-elements/form-fieldset';
import { FormFooter } from '../../form-elements/form-footer';
import { DetalleSelectOptions, FormAction } from '@/types/types';
import { Card, CardContent } from '../../ui/card';
import { FormHeader } from '../../form-elements/form-header';
import { FormTextField } from '../../form-elements/form-text-field';
import { FormCombobox } from '../../form-elements/form-combobox';
import { FormLink, FormLinkGroup } from '../../form-elements/form-link';
import { UseFormReturn } from 'react-hook-form';

type ProveedorFormValues = z.infer<typeof providerSchema>;

interface ProveedorFormProps {
  action: FormAction;
  id_proveedor?: number;
  form: UseFormReturn<ProveedorFormValues>;
  onSubmit: (values: ProveedorFormValues) => void;
  selectOptions: DetalleSelectOptions;
  isPending: boolean;
}

export function ProveedorForm({
  action,
  id_proveedor,
  form,
  onSubmit,
  selectOptions,
  isPending,
}: ProveedorFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-3xl">
          <FormHeader action={action} name="proveedor" noun="m" />
          <CardContent>
            <FormLinkGroup action={action}>
              <FormLink
                href={`/proveedores/${id_proveedor}/solvencias`}
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
                  control={form.control}
                  name="id_departamento"
                  label="Departamento"
                  options={selectOptions.departamentos ?? []}
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
                control={form.control}
                name="id_sector"
                label="Sector"
                options={selectOptions.sectores ?? []}
                updateParam="sector"
                resetField={() => form.setValue('id_subsector', 0)}
              />
              <FormCombobox
                control={form.control}
                name="id_subsector"
                label="Subsector"
                options={selectOptions.subsectores ?? []}
              />
            </FormFieldSet>
          </CardContent>
          <FormFooter action={action} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
