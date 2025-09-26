'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { usuarioSchema } from '@/validation-schemas';
import FormInputGroup from './elements/form-input-group';
import { FormFieldSet } from './elements/form-fieldset';
import { FormAction, Usuario } from '@/types/types';
import { createUser, updateUser } from '@/server-actions/usuarios';
import { Card, CardContent } from '../ui/card';
import FormHeader from './elements/form-header';
import FormOptions from './elements/form-options';
import FormTextField from './elements/form-text-field';
import { FormFooter } from './elements/form-footer';
import { roles } from '../select-options-data';
import { FormSwitch } from './elements/form-switch';
import { FormSelect } from './elements/form-select';

type UserFormProps = {
  action: FormAction;
  user?: Usuario;
};

export function UserForm({ action, user }: UserFormProps) {
  const form = useForm<z.infer<typeof usuarioSchema>>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: user
      ? {
          nombre: user.nombre ?? '',
          apellido: user.apellido ?? '',
          correo: user.correo ?? '',
          rol: user.rol ?? '',
          activo: user.activo ?? true,
        }
      : {
          nombre: '',
          apellido: '',
          correo: '',
          rol: '',
          activo: true,
        },
  });

  function onSubmit(values: z.infer<typeof usuarioSchema>) {
    if (action === 'create') {
      createUser(undefined, values);
    } else if (action === 'edit' && user) {
      updateUser(user.id, { message: undefined }, values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto">
          <FormHeader action={action} name="usuario" noun="m">
            <FormOptions action={action} />
          </FormHeader>
          <CardContent>
            <FormFieldSet name="info">
              <FormInputGroup>
                <FormTextField
                  control={form.control}
                  name="nombre"
                  label="Nombre"
                  placeholder="Nombre"
                />
                <FormTextField
                  control={form.control}
                  name="apellido"
                  label="Apellido"
                  placeholder="Apellido"
                />
              </FormInputGroup>
              <FormTextField
                control={form.control}
                name="correo"
                label="Correo"
                placeholder="Correo institucional"
              />
            </FormFieldSet>
            <FormFieldSet name="permissions">
              <FormInputGroup>
                <FormSelect
                  control={form.control}
                  name="rol"
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
