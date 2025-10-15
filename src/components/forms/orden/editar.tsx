'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ordenesSchema } from '@/components/forms/validation/validation-schemas';
import {
  FormSelectOptions,
  OrdenDetalleTable,
  OrdenFormType,
} from '@/types/types';
import { startTransition, useActionState } from 'react';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { OrdenForm } from './form';
import { updateOrden } from '@/server-actions/orden';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTableOrdenDetalle } from './detalle/data-table-orden-detalle';
import { columns } from '@/app/(compras)/ordenes/[id]/columns';

interface EditarOrdenFormProps {
  orden: OrdenFormType;
  orden_detalle: OrdenDetalleTable[];
  selectOptions: FormSelectOptions;
}

export function EditarOrdenForm({
  orden,
  orden_detalle,
  selectOptions,
}: EditarOrdenFormProps) {
  const form = useForm<z.infer<typeof ordenesSchema>>({
    resolver: zodResolver(ordenesSchema),
    defaultValues: {
      id_estado: orden.id_estado,
      id_solicitud: orden.id_solicitud,
      fecha_creacion: orden.fecha_creacion,
      id_proveedor: orden.id_proveedor,
      numero_cotizacion: orden.numero_cotizacion,
      termino_de_pago: orden.termino_de_pago,
      moneda: orden.moneda,
      descuento: orden.descuento ?? undefined,
      observacion: orden.observacion ?? '',
      calcular_iva: orden.calcular_iva,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateOrden,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof ordenesSchema>) {
    startTransition(() => {
      formAction({ id: orden.id, values });
    });
  }

  useServerActionFeedback(state, { back: true });

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
        <OrdenForm
          action="edit"
          form={form}
          onSubmit={onSubmit}
          selectOptions={selectOptions}
          id_orden={orden.id ?? 0}
          isPending={isPending}
        />
      </TabsContent>
      <TabsContent
        value="productos"
        className="space-y-3 flex flex-col overflow-y-auto"
      >
        <DataTableOrdenDetalle
          columns={columns}
          tableData={orden_detalle}
          id_orden={orden.id ?? 0}
          id_solicitud={orden.id_solicitud}
          selectOptions={selectOptions}
        />
      </TabsContent>
    </Tabs>
  );
}
