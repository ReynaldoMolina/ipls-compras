'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormSelectOptions,
  PresupuestoDetalleTable,
  PresupuestoFormType,
  SolicitudesTableModal,
} from '@/types/types';
import { presupuestoSchema } from '../validation/validation-schemas';
import { startTransition, useActionState } from 'react';
import { updatePresupuesto } from '@/server-actions/presupuesto';
import { columns } from '@/app/(compras)/presupuestos/[id]/columns';
import { DataTablePresupuesto } from '@/components/forms/presupuesto/detalle/data-table-presupuesto';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresupuestoForm } from './form';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';

interface EditarPresupuestoFormProps {
  presupuesto: PresupuestoFormType;
  presupuesto_detalle: PresupuestoDetalleTable[];
  solicitud_modal: SolicitudesTableModal[];
  selectOptions: FormSelectOptions;
}

export function EditarPresupuestoForm({
  presupuesto,
  presupuesto_detalle,
  solicitud_modal,
  selectOptions,
}: EditarPresupuestoFormProps) {
  const form = useForm<z.infer<typeof presupuestoSchema>>({
    resolver: zodResolver(presupuestoSchema),
    defaultValues: {
      id_entidad_academica: presupuesto.id_entidad_academica ?? 0,
      year: presupuesto.year ?? 0,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updatePresupuesto,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof presupuestoSchema>) {
    startTransition(() => {
      formAction({ id: presupuesto.id, values });
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
        <PresupuestoForm
          action="edit"
          form={form}
          onSubmit={onSubmit}
          selectOptions={selectOptions}
          isPending={isPending}
        />
      </TabsContent>
      <TabsContent
        value="productos"
        className="space-y-3 flex flex-col overflow-y-auto"
      >
        <DataTablePresupuesto
          columns={columns}
          tableData={presupuesto_detalle}
          tableDataModal={solicitud_modal}
          presupuesto={presupuesto}
          selectOptions={selectOptions}
        />
      </TabsContent>
    </Tabs>
  );
}
