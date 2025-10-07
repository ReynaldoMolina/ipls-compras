'use client';

import { DetalleSelectOptions, ProductoFormType } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { productoSchema } from '@/components/forms/validation/validation-schemas';
import { useUser } from '@/hooks/use-user';
import { updateProducto } from '@/server-actions/productos';
import { startTransition, useActionState } from 'react';
import { ProductoForm } from './form';

interface EditarProductoFormProps {
  producto?: ProductoFormType;
  selectOptions: DetalleSelectOptions;
}

export function EditarProductoForm({
  producto,
  selectOptions,
}: EditarProductoFormProps) {
  const { ability } = useUser();

  const form = useForm<z.infer<typeof productoSchema>>({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre_producto: producto?.nombre_producto ?? '',
      id_unidad_medida: producto?.id_unidad_medida ?? 0,
    },
  });

  const [state, formAction, isPending] = useActionState(updateProducto, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof productoSchema>) {
    startTransition(() => {
      formAction({ values, id: producto?.id });
    });
  }

  return (
    <ProductoForm
      action="edit"
      form={form}
      onSubmit={onSubmit}
      selectOptions={selectOptions}
      isPending={isPending}
    />
  );
}
