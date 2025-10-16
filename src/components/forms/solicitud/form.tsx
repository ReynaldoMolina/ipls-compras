'use client';

import { FormAction, FormSelectOptions, PresupuestoModal } from '@/types/types';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { FormHeader } from '@/components/form-elements/form-header';
import { FormCombobox } from '@/components/form-elements/form-combobox';
import { FormFooter } from '@/components/form-elements/form-footer';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import z from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { solicitudSchema } from '../validation/validation-schemas';
import { DatePicker } from '@/components/date-picker';
import { FormInputGroup } from '@/components/form-elements/form-input-group';
import { FormTextReadOnly } from '@/components/form-elements/form-text-readonly';
import { useUser } from '@/hooks/use-user';
import { FormTextField } from '@/components/form-elements/form-text-field';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SelectPresupuesto } from './select-presupuesto';

type SolicitudFormValues = z.infer<typeof solicitudSchema>;

interface SolicitudFormProps {
  action: FormAction;
  form: UseFormReturn<SolicitudFormValues>;
  onSubmit: (values: SolicitudFormValues) => void;
  selectOptions: FormSelectOptions;
  isPending: boolean;
  id_solicitud?: number;
  label?: string;
  presupuestosModal: PresupuestoModal[];
}

export function SolicitudForm({
  action,
  form,
  onSubmit,
  selectOptions,
  isPending,
  id_solicitud,
  label,
  presupuestosModal,
}: SolicitudFormProps) {
  const { user } = useUser();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto">
          <FormHeader
            action={action}
            name="solicitud"
            noun="f"
            label={label?.toLocaleLowerCase()}
          />
          <CardContent>
            <FieldGroup>
              {action === 'edit' && (
                <FieldSet>
                  <Item variant="outline">
                    <ItemMedia variant="icon">
                      <Printer />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Imprimir solicitud</ItemTitle>
                      <ItemDescription>
                        Visualiza el documento para revisión o impresión.
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/solicitudes/${id_solicitud ?? 0}/print`}>
                          Ver
                        </Link>
                      </Button>
                    </ItemActions>
                  </Item>
                </FieldSet>
              )}
              <FieldSet hidden={action === 'create'}>
                <FieldLegend>Seguimiento</FieldLegend>
                <FieldDescription>
                  Visualiza el estado de la solicitud.
                </FieldDescription>
                <FormCombobox
                  control={form.control}
                  name="id_estado"
                  label="Estado"
                  outPutType="number"
                  options={selectOptions.estadosSolicitud ?? []}
                />
              </FieldSet>
              <FieldSeparator hidden={action === 'create'} />
              <FieldSet>
                <FieldLegend>Información</FieldLegend>
                <FieldDescription>
                  Completa los datos principales de la solicitud.
                </FieldDescription>
                <FormInputGroup>
                  <FormField
                    control={form.control}
                    name="fecha"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Elaborada el</FormLabel>
                        <DatePicker<SolicitudFormValues>
                          field={field}
                          disabled
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fecha_a_utilizar"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha a utilizar</FormLabel>
                        <DatePicker<SolicitudFormValues> field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormInputGroup>
                <FormCombobox
                  control={form.control}
                  name="id_entidad_academica"
                  label="Carrera / curso / área"
                  outPutType="number"
                  options={selectOptions.entidadesAcademicas ?? []}
                  disabled={action === 'edit'}
                  updateParam="id_entidad"
                />
                {action === 'create' && (
                  <FormTextReadOnly value={user.name} label="Solicitado por" />
                )}
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Presupuesto</FieldLegend>
                <FieldDescription>
                  {action === 'edit'
                    ? 'Esta solicitud fue generada a partir de un presupuesto.'
                    : '¿Quieres crear la solicitud a partir de un presupuesto?'}
                </FieldDescription>
                <div className="inline-flex w-full gap-2 items-end">
                  <FormTextField
                    control={form.control}
                    name="id_presupuesto"
                    label="Id presupuesto"
                    disabled
                  />
                  {action === 'create' && (
                    <SelectPresupuesto
                      tableData={presupuestosModal}
                      form={form}
                    />
                  )}
                </div>
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <FormFooter action={action} isPending={isPending} label={label} />
        </Card>
      </form>
    </Form>
  );
}
