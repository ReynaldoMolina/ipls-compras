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
import { Input } from '@/components/ui/input';
import { usuarioSchema } from '@/validation-schemas';
import FormInputGroup from './elements/form-input-group';
import { FormFieldSet } from './elements/form-fieldset';
import FormButtons from './elements/form-buttons';
import { Usuario } from '@/types/types';
import { createUser, updateUser } from '@/lib/actions/usuarios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const roles = [
  {
    value: 'superadmin',
    label: 'Super admin',
  },
  {
    value: 'administrador',
    label: 'Administrador',
  },
  {
    value: 'docente',
    label: 'Docente',
  },
];

export function UserForm({
  action,
  user,
}: {
  action: 'create' | 'edit';
  user?: Usuario;
}) {
  const form = useForm<z.infer<typeof usuarioSchema>>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: user
      ? {
          nombre: user.nombre ?? '',
          apellido: user.apellido ?? '',
          correo: user.correo ?? '',
          rol: user.rol ?? undefined,
          activo: user.activo ?? false,
        }
      : {
          nombre: '',
          apellido: '',
          correo: '',
          rol: undefined,
          activo: false,
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
          <CardHeader>
            <CardTitle>
              {action === 'create' ? 'Nuevo' : 'Editar'} usuario
            </CardTitle>
            <CardDescription>
              {action === 'create' ? 'Ingresa' : 'Edita'} la información del
              usuario
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormFieldSet name="info">
              <FormInputGroup>
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apellido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormInputGroup>
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo institucional" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldSet>
            <FormFieldSet name="permissions">
              <FormInputGroup>
                <FormField
                  control={form.control}
                  name="rol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                field.value
                                  ? field.value
                                  : 'Selecciona una opción'
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((rol) => (
                            <SelectItem key={rol.value} value={rol.value}>
                              {rol.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activo"
                  render={({ field }) => (
                    <FormItem>
                      <span className="text-xs font-medium">Estado</span>
                      <div className="flex flex-row items-center justify-between rounded-md border px-3 py-2 shadow-xs max-h-9">
                        <FormLabel>¿El usuario está activo?</FormLabel>
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
              </FormInputGroup>
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
