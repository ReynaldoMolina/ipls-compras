'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getCurrentDate } from '@/lib/get-current-date';
import { FormSelectOptions } from '@/types/types';
import { startTransition, useActionState } from 'react';
import { SolicitudForm } from './form';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { solicitudSchema } from '../validation/validation-schemas';
import { createSolicitud } from '@/server-actions/solicitud';
import { useUser } from '@/hooks/use-user';

interface NuevaSolicitudFormProps {
  selectOptions: FormSelectOptions;
}

export function NuevaSolicitudForm({ selectOptions }: NuevaSolicitudFormProps) {
  const { currentDate } = getCurrentDate();
  const { user } = useUser();

  const form = useForm<z.infer<typeof solicitudSchema>>({
    resolver: zodResolver(solicitudSchema),
    defaultValues: {
      fecha: currentDate,
      fecha_a_utilizar: undefined,
      id_entidad_academica: 0,
      id_usuario: user.id,
      id_presupuesto: null,
      id_estado: 1,
    },
  });

  const [state, formAction, isPending] = useActionState(
    createSolicitud,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof solicitudSchema>) {
    startTransition(() => {
      formAction({ values });
    });
  }

  useServerActionFeedback(state, { redirectToId: '/solicitudes' });

  return (
    <SolicitudForm
      action="create"
      form={form}
      onSubmit={onSubmit}
      selectOptions={selectOptions}
      isPending={isPending}
      label="Siguiente"
    />
  );
}
