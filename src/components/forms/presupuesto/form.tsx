'use client';

import { FormAction, FormSelectOptions } from '@/types/types';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { years } from '@/lib/select-options-data';
import { FormFooter } from '@/components/form-elements/form-footer';
import { FieldDescription, FieldLegend, FieldSet } from '@/components/ui/field';
import { presupuestoSchema } from '../validation/validation-schemas';
import z from 'zod';
import { UseFormReturn } from 'react-hook-form';

type PresupuestoFormValues = z.infer<typeof presupuestoSchema>;

interface PresupuestoFormProps {
  action: FormAction;
  form: UseFormReturn<PresupuestoFormValues>;
  onSubmit: (values: PresupuestoFormValues) => void;
  selectOptions: FormSelectOptions;
  isPending: boolean;
  label?: string;
}

export function PresupuestoForm({
  action,
  form,
  onSubmit,
  selectOptions,
  isPending,
  label,
}: PresupuestoFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Card className="max-w-3xl mx-auto">
          <FormHeader
            action={action}
            name="presupuesto"
            noun="m"
            label={label?.toLocaleLowerCase()}
          />
          <CardContent>
            <FieldSet>
              <FieldLegend>Información básica</FieldLegend>
              <FieldDescription>
                Completa los datos principales del presupuesto.
              </FieldDescription>
              <FormCombobox
                control={form.control}
                name="id_entidad_academica"
                label="Carrera / curso"
                outPutType="number"
                options={selectOptions.entidadesAcademicas ?? []}
              />
              <FormCombobox
                control={form.control}
                name="year"
                label="Año"
                options={years}
              />
            </FieldSet>
          </CardContent>
          <FormFooter action={action} isPending={isPending} label={label} />
        </Card>
      </form>
    </Form>
  );
}
