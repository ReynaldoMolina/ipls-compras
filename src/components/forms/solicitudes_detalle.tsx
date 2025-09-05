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
import { solicitudSchema } from '@/validation-schemas';
import { FormFieldSet } from './elements/form-fieldset';
import FormButtons from './elements/form-buttons';
import { ComboBoxData, Solicitud } from '@/types/types';
import { createUser, updateUser } from '@/lib/actions/usuarios';
import { Switch } from '../ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { DatePicker } from '../date-picker';
import { ComboBox } from '../combo-box';
import { Input } from '../ui/input';

type SolicitudFormValues = z.infer<typeof solicitudSchema>;

export function SolicitudForm({
  action,
  solicitud,
  entidadesAcademicas,
}: {
  action: 'create' | 'edit';
  solicitud?: Solicitud;
  entidadesAcademicas: ComboBoxData;
}) {
  const form = useForm<z.infer<typeof solicitudSchema>>({
    resolver: zodResolver(solicitudSchema),
    defaultValues: solicitud
      ? {
          fecha: solicitud.fecha ?? undefined,
          id_entidad_academica: solicitud.id_entidad_academica ?? 0,
          id_usuario: solicitud.id_usuario ?? 0,
          revisado_bodega: solicitud.revisado_bodega ?? false,
        }
      : {
          fecha: undefined,
          id_entidad_academica: 0,
          id_usuario: 1,
          revisado_bodega: false,
        },
  });

  function onSubmit(values: z.infer<typeof solicitudSchema>) {
    // if (action === 'create') {
    //   createUser(undefined, values);
    // } else if (action === 'edit' && user) {
    //   updateUser(user.id, { message: undefined }, values);
    // }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>
              {action === 'create' ? 'Nueva' : 'Editar'} solicitud
            </CardTitle>
            <CardDescription>
              {action === 'create' ? 'Ingresa' : 'Edita'} la información de la
              solicitud
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormFieldSet name="info">
              <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha solicitud</FormLabel>
                    <DatePicker<SolicitudFormValues> field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_entidad_academica"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carrera / curso / área</FormLabel>
                    <ComboBox
                      field={field}
                      data={entidadesAcademicas}
                      form={form}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_usuario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solicitado por</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre"
                        type="number"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="revisado_bodega"
                render={({ field }) => (
                  <FormItem>
                    <span className="text-xs font-medium">Estado</span>
                    <div className="flex flex-row items-center justify-between rounded-md border px-3 py-2 shadow-xs max-h-9">
                      <FormLabel>¿Revisado por bodega?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
