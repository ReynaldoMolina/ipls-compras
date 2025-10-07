'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { providerSchema } from '@/components/forms/validation/validation-schemas';
import { DetalleSelectOptions, ProveedorFormType } from '@/types/types';
import { startTransition, useActionState } from 'react';
import { ProveedorForm } from './form';
import { updateProvider } from '@/server-actions/providers';

interface EditarProveedorFormProps {
  proveedor: ProveedorFormType;
  selectOptions: DetalleSelectOptions;
}

export function EditarProveedorForm({
  proveedor,
  selectOptions,
}: EditarProveedorFormProps) {
  const form = useForm<z.infer<typeof providerSchema>>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      nombre_comercial: proveedor.nombre_comercial ?? '',
      razon_social: proveedor.razon_social ?? '',
      ruc: proveedor.ruc ?? '',
      contacto_principal: proveedor.contacto_principal ?? '',
      telefono: proveedor.telefono ?? '',
      correo: proveedor.correo ?? '',
      id_departamento: proveedor.id_departamento ?? 0,
      direccion: proveedor.direccion ?? '',
      id_sector: proveedor.id_sector ?? 0,
      id_subsector: proveedor.id_subsector ?? 0,
    },
  });

  const [state, formAction, isPending] = useActionState(updateProvider, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof providerSchema>) {
    startTransition(() => {
      formAction({ id: proveedor.id, values });
    });
  }

  return (
    <ProveedorForm
      action="edit"
      form={form}
      id_proveedor={proveedor.id}
      onSubmit={onSubmit}
      selectOptions={selectOptions}
      isPending={isPending}
    />
  );
}
