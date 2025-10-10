'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getCurrentDate } from '@/lib/get-current-date';
import { FormSelectOptions } from '@/types/types';
import { presupuestoSchema } from '../validation/validation-schemas';
import { startTransition, useActionState } from 'react';
import { createPresupuesto } from '@/server-actions/presupuesto';
import { PresupuestoForm } from './form';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';

interface NuevoPresupuestoFormProps {
  selectOptions: FormSelectOptions;
}

export function NuevoPresupuestoForm({
  selectOptions,
}: NuevoPresupuestoFormProps) {
  const { currentYear } = getCurrentDate();

  const form = useForm<z.infer<typeof presupuestoSchema>>({
    resolver: zodResolver(presupuestoSchema),
    defaultValues: {
      id_entidad_academica: 0,
      year: currentYear,
    },
  });

  const [state, formAction, isPending] = useActionState(
    createPresupuesto,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof presupuestoSchema>) {
    startTransition(() => {
      formAction({ values });
    });
  }

  useServerActionFeedback(state, { back: true });

  return (
    <PresupuestoForm
      action="create"
      form={form}
      onSubmit={onSubmit}
      selectOptions={selectOptions}
      isPending={isPending}
      label="Siguiente"
    />
  );
}
