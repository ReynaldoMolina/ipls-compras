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
import { usuarioSchema } from '@/validation-schemas';
import { FormInputGroup } from '../form-elements/form-input-group';
import { FormFieldSet } from '../form-elements/form-fieldset';
import { FormAction } from '@/types/types';
import { updateUser } from '@/server-actions/usuarios';
import { Card, CardContent } from '../ui/card';
import { FormHeader } from '../form-elements/form-header';
import { FormTextField } from '../form-elements/form-text-field';
import { FormFooter } from '../form-elements/form-footer';
import { roles } from '../select-options-data';
import { FormSwitch } from '../form-elements/form-switch';
import { FormSelect } from '../form-elements/form-select';
import { DatePicker } from '../date-picker';
import { User } from 'next-auth';

type UserFormProps = {
  action: FormAction;
  user?: User;
};

export function UserForm({ action, user }: UserFormProps) {
  const form = useForm<z.infer<typeof usuarioSchema>>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: user
      ? {
          id: user.id ?? '',
          name: user.name ?? '',
          email: user.email ?? '',
          emailVerified: user.emailVerified ?? undefined,
          image: user.image ?? '',
          role: user.role ?? 'sinverificar',
          activo: user.activo ?? false,
        }
      : {
          id: '',
          name: '',
          email: '',
          emailVerified: undefined,
          image: '',
          role: 'sinverificar',
          activo: false,
        },
  });

  function onSubmit(values: z.infer<typeof usuarioSchema>) {
    if (user) {
      updateUser(user.id, undefined, values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <FormHeader action={action} name="usuario" noun="m" />
          <CardContent>
            <FormFieldSet name="info">
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
            </FormFieldSet>
            <FormFieldSet name="permissions">
              <FormInputGroup>
                <FormSelect
                  control={form.control}
                  name="role"
                  label="Rol"
                  options={roles}
                />
                <FormSwitch
                  control={form.control}
                  name="activo"
                  label="Estado"
                  description="¿El usuario está activo?"
                />
              </FormInputGroup>
            </FormFieldSet>
          </CardContent>
          <FormFooter action={action} />
        </Card>
      </form>
    </Form>
  );
}
