'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { providerSchema } from '@/components/forms/validation/validation-schemas';
import { FormInputGroup } from '../../form-elements/form-input-group';
import { FormFooter } from '../../form-elements/form-footer';
import { FormSelectOptions, FormAction } from '@/types/types';
import { Card, CardContent } from '../../ui/card';
import { FormHeader } from '../../form-elements/form-header';
import { FormTextField } from '../../form-elements/form-text-field';
import { FormCombobox } from '../../form-elements/form-combobox';
import { UseFormReturn } from 'react-hook-form';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { FormTextArea } from '@/components/form-elements/form-text-area';

type ProveedorFormValues = z.infer<typeof providerSchema>;

interface ProveedorFormProps {
  action: FormAction;
  id_proveedor?: number;
  form: UseFormReturn<ProveedorFormValues>;
  onSubmit: (values: ProveedorFormValues) => void;
  selectOptions: FormSelectOptions;
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
            <FieldGroup>
              <FieldSet>
                <Item variant="outline">
                  <ItemMedia variant="icon">
                    <CalendarDays />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Solvencias</ItemTitle>
                    <ItemDescription>
                      Revisa y actualiza las solvencias.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/proveedores/${id_proveedor}/solvencias`}>
                        Abrir
                      </Link>
                    </Button>
                  </ItemActions>
                </Item>
              </FieldSet>
              <FieldSet>
                <FieldLegend>Información</FieldLegend>
                <FieldDescription>
                  Datos básicos del proveedor.
                </FieldDescription>
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
                  <FormTextField
                    control={form.control}
                    name="ruc"
                    label="RUC"
                  />
                </FormInputGroup>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Contacto</FieldLegend>
                <FieldDescription>
                  Datos para contactar al proveedor.
                </FieldDescription>

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
                <FormTextArea
                  control={form.control}
                  name="direccion"
                  label="Dirección"
                />
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Sector</FieldLegend>
                <FieldDescription>
                  Clasificación según su actividad comercial.
                </FieldDescription>
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
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <FormFooter action={action} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
