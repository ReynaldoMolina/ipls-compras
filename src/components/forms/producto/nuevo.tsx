'use client';

import { DetalleSelectOptions } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { productoSchema } from '@/components/forms/validation/validation-schemas';
import { useUser } from '@/hooks/use-user';
import { createProducto } from '@/server-actions/productos';
import { ProductoForm } from './form';
import { startTransition, useActionState } from 'react';

interface NuevoProductoFormProps {
  selectOptions: DetalleSelectOptions;
}

export function NuevoProductoForm({ selectOptions }: NuevoProductoFormProps) {
  const { ability } = useUser();

  const form = useForm<z.infer<typeof productoSchema>>({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre_producto: '',
      id_unidad_medida: 0,
    },
  });

  const [state, formAction, isPending] = useActionState(createProducto, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof productoSchema>) {
    startTransition(() => {
      formAction({ values });
    });
  }

  return (
    <ProductoForm
      action="create"
      form={form}
      onSubmit={onSubmit}
      selectOptions={selectOptions}
      isPending={isPending}
    />
  );
}
