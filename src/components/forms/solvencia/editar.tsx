'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { solvenciaSchema } from '@/components/forms/validation/validation-schemas';
import { Solvencia } from '@/types/types';
import { updateSolvencia } from '@/server-actions/proveedor-solvencia';
import { startTransition, useActionState } from 'react';
import { SolvenciaForm } from './form';

type SolvenciaFormValues = z.infer<typeof solvenciaSchema>;

interface EditarSolvenciaFormProps {
  solvencia?: Solvencia;
}

export function EditarSolvenciaForm({ solvencia }: EditarSolvenciaFormProps) {
  const form = useForm<z.infer<typeof solvenciaSchema>>({
    resolver: zodResolver(solvenciaSchema),
    defaultValues: {
      id_proveedor: solvencia?.id_proveedor,
      emitida: solvencia?.emitida ?? null,
      vence: solvencia?.vence ?? null,
      verificado: solvencia?.verificado ?? undefined,
      recibido: solvencia?.recibido ?? null,
      url: solvencia?.url ?? null,
      id_usuario: solvencia?.id_usuario ?? '',
    },
  });

  const [state, formAction, isPending] = useActionState(updateSolvencia, {
    message: '',
  });

  function onSubmit(values: z.infer<typeof solvenciaSchema>) {
    startTransition(() => {
      formAction({
        id: solvencia?.id,
        values,
        id_proveedor: solvencia?.id_proveedor,
      });
    });
  }

  return (
    <SolvenciaForm
      action="edit"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
