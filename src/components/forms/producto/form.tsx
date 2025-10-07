'use client';

import { DetalleSelectOptions, FormAction } from '@/types/types';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { productoSchema } from '@/components/forms/validation/validation-schemas';
import { Form } from '@/components/ui/form';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { FormFieldSet } from '@/components/form-elements/form-fieldset';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import { FormTextArea } from '@/components/form-elements/form-text-area';
import { FormFooter } from '@/components/form-elements/form-footer';

type ProductoFormValues = z.infer<typeof productoSchema>;

interface ProductoFormProps {
  action: FormAction;
  form: UseFormReturn<ProductoFormValues>;
  onSubmit: (values: ProductoFormValues) => void;
  selectOptions: DetalleSelectOptions;
  isPending: boolean;
}

export function ProductoForm({
  action,
  form,
  onSubmit,
  selectOptions,
  isPending,
}: ProductoFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <FormHeader action={action} name="producto" noun="m" />
          <CardContent>
            <FormFieldSet name="info">
              <FormTextArea
                control={form.control}
                name="nombre_producto"
                label="Nombre del producto"
              />
              <FormInputGroup>
                <FormCombobox
                  control={form.control}
                  name="id_unidad_medida"
                  label="Unidad de medida"
                  options={selectOptions.unidadesMedida ?? []}
                />
              </FormInputGroup>
            </FormFieldSet>
          </CardContent>
          <FormFooter action={action} isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
