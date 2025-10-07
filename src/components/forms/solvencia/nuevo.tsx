'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { solvenciaSchema } from '@/components/forms/validation/validation-schemas';
import { createSolvencia } from '@/server-actions/proveedor-solvencia';
import { useUser } from '@/hooks/use-user';
import { getCurrentDate } from '@/lib/get-current-date';
import { startTransition, useActionState } from 'react';
import { SolvenciaForm } from './form';

interface NuevaSolvenciaFormProps {
  id_proveedor: number;
}

export function NuevaSolvenciaForm({ id_proveedor }: NuevaSolvenciaFormProps) {
  const { user } = useUser();
  const { currentDate } = getCurrentDate();

  const form = useForm<z.infer<typeof solvenciaSchema>>({
    resolver: zodResolver(solvenciaSchema),
    defaultValues: {
      id_proveedor: id_proveedor,
      emitida: null,
      vence: null,
      verificado: currentDate,
      recibido: null,
      url: null,
      id_usuario: user.id ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(createSolvencia, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof solvenciaSchema>) {
    startTransition(() => {
      formAction({ id_proveedor, values });
    });
  }

  return (
    <SolvenciaForm
      action="create"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
