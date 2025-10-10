'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { solvenciaSchema } from '@/components/forms/validation/validation-schemas';
import { Solvencia } from '@/types/types';
import { updateSolvencia } from '@/server-actions/proveedor-solvencia';
import { startTransition, useActionState, useEffect } from 'react';
import { SolvenciaForm } from './form';
import { stateDefault } from '@/server-actions/statusMessages';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';

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

  const [state, formAction, isPending] = useActionState(
    updateSolvencia,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof solvenciaSchema>) {
    startTransition(() => {
      formAction({
        id: solvencia?.id,
        values,
        id_proveedor: solvencia?.id_proveedor,
      });
    });
  }

  useServerActionFeedback(state, { back: true });

  return (
    <SolvenciaForm
      action="edit"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
