'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { usuarioSchema } from '@/components/forms/validation/validation-schemas';
import { FormInputGroup } from '../form-elements/form-input-group';
import { FormFieldSet } from '../form-elements/form-fieldset';
import { updateUser } from '@/server-actions/usuario';
import { Card, CardContent } from '../ui/card';
import { FormHeader } from '../form-elements/form-header';
import { FormTextField } from '../form-elements/form-text-field';
import { FormFooter } from '../form-elements/form-footer';
import { FormSwitch } from '../form-elements/form-switch';
import { FormSelect } from '../form-elements/form-select';
import { DatePicker } from '../date-picker';
import { User } from 'next-auth';
import { rolesOptions } from '@/permissions/roles';
import { startTransition, useActionState } from 'react';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../ui/field';

type UserFormProps = {
  user?: User;
};

export function UserForm({ user }: UserFormProps) {
  const form = useForm<z.infer<typeof usuarioSchema>>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      id: user?.id ?? '',
      name: user?.name ?? '',
      email: user?.email ?? '',
      emailVerified: user?.emailVerified ?? undefined,
      image: user?.image ?? '',
      role: user?.role ?? 'sinverificar',
      activo: user?.activo ?? false,
    },
  });

  const [state, formAction, isPending] = useActionState(updateUser, {
    success: false,
    message: '',
  });

  function onSubmit(values: z.infer<typeof usuarioSchema>) {
    startTransition(() => {
      formAction({ id_usuario: user?.id, values });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <FormHeader action="edit" name="usuario" noun="m" />
          <CardContent>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Información</FieldLegend>
                <FieldDescription>Datos básicos del usuario.</FieldDescription>
                <FormTextField
                  control={form.control}
                  name="id"
                  label="Id"
                  disabled
                  hidden
                />
                <FormTextField
                  control={form.control}
                  name="name"
                  label="Nombre"
                  disabled
                />
                <FormTextField
                  control={form.control}
                  name="email"
                  label="Correo"
                  disabled
                />
                <FormField
                  control={form.control}
                  name="emailVerified"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormLabel>Verificado el</FormLabel>
                      <DatePicker field={field} disabled />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormTextField
                  control={form.control}
                  name="image"
                  label="Imagen"
                  disabled
                  hidden
                />
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Permisos</FieldLegend>
                <FieldDescription>
                  Gestiona los permisos y roles del usuario.
                </FieldDescription>
                <FormInputGroup>
                  <FormSelect
                    control={form.control}
                    name="role"
                    label="Rol"
                    options={rolesOptions}
                  />
                  <FormSwitch
                    control={form.control}
                    name="activo"
                    label="Estado"
                    description="¿El usuario está activo?"
                  />
                </FormInputGroup>
              </FieldSet>
            </FieldGroup>
          </CardContent>
          <FormFooter action="edit" isPending={isPending} />
        </Card>
      </form>
    </Form>
  );
}
