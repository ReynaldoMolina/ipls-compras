'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormSelectOptions,
  OrdenModal,
  PresupuestoDetalleModal,
  SolicitudDetalleTable,
  SolicitudFormType,
} from '@/types/types';
import { solicitudSchema } from '../validation/validation-schemas';
import { startTransition, useActionState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SolicitudForm } from './form';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { DataTableSolicitud } from './detalle/data-table-solicitud';
import { updateSolicitud } from '@/server-actions/solicitud';
import { columns } from '@/app/(compras)/solicitudes/[id]/columns';

interface EditarSolicitudFormProps {
  solicitud: SolicitudFormType;
  solicitud_detalle: SolicitudDetalleTable[];
  orden_modal: OrdenModal[];
  selectOptions: FormSelectOptions;
  presupuestoDetalle: PresupuestoDetalleModal[];
}

export function EditarSolicitudForm({
  solicitud,
  solicitud_detalle,
  orden_modal,
  selectOptions,
  presupuestoDetalle,
}: EditarSolicitudFormProps) {
  const form = useForm<z.infer<typeof solicitudSchema>>({
    resolver: zodResolver(solicitudSchema),
    defaultValues: {
      fecha: solicitud.fecha,
      fecha_a_utilizar: solicitud.fecha_a_utilizar,
      id_entidad_academica: solicitud.id_entidad_academica,
      id_usuario: solicitud.id_usuario,
      id_presupuesto: solicitud.id_presupuesto ?? null,
      id_estado: solicitud.id_estado,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateSolicitud,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof solicitudSchema>) {
    startTransition(() => {
      formAction({ id: solicitud.id, values });
    });
  }

  useServerActionFeedback(state);

  return (
    <Tabs
      defaultValue="productos"
      className="flex flex-col p-3 overflow-y-auto"
    >
      <TabsList className="w-fit">
        <TabsTrigger value="info">Editar información</TabsTrigger>
        <TabsTrigger value="productos">Lista de productos</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <SolicitudForm
          action="edit"
          form={form}
          onSubmit={onSubmit}
          selectOptions={selectOptions}
          id_solicitud={solicitud.id ?? 0}
          isPending={isPending}
        />
      </TabsContent>
      <TabsContent
        value="productos"
        className="space-y-3 flex flex-col overflow-y-auto"
      >
        <DataTableSolicitud
          columns={columns}
          tableData={solicitud_detalle}
          tableDataModal={orden_modal}
          solicitud={solicitud}
          selectOptions={selectOptions}
          presupuestoDetalle={presupuestoDetalle}
        />
      </TabsContent>
    </Tabs>
  );
}
