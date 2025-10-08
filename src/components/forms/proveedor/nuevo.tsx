'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { providerSchema } from '@/components/forms/validation/validation-schemas';
import { FormSelectOptions } from '@/types/types';
import { startTransition, useActionState } from 'react';
import { createProvider } from '@/server-actions/proveedor';
import { ProveedorForm } from './form';

interface NuevoProveedorFormProps {
  selectOptions: FormSelectOptions;
}

export function NuevoProveedorForm({ selectOptions }: NuevoProveedorFormProps) {
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      nombre_comercial: '',
      razon_social: '',
      ruc: '',
      contacto_principal: '',
      telefono: '',
      correo: '',
      id_departamento: 0,
      direccion: '',
      id_sector: 0,
      id_subsector: 0,
    },
  });

  const [state, formAction, isPending] = useActionState(createProvider, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof providerSchema>) {
    startTransition(() => {
      formAction({ values });
    });
  }

  return (
    <ProveedorForm
      action="create"
      form={form}
      onSubmit={onSubmit}
      selectOptions={selectOptions}
      isPending={isPending}
    />
  );
}
