export const dynamic = 'force-dynamic'; // to allow data refresh without full reload

import { EditarPresupuestoDetalleFormDialog } from '@/components/forms/presupuesto/detalle/editar-dialog';
import {
  getPresupuestoDetalleById,
  getDetalleCategorias,
  getUnidadesMedida,
} from '@/fetch-data/presupuesto-detalle';
import { PageProps } from '@/types/types';

export default async function Page({ params }: PageProps) {
  const { id_detalle } = await params;
  const detalle = await getPresupuestoDetalleById(id_detalle);
  const categorias = await getDetalleCategorias();
  const unidadesMedida = await getUnidadesMedida();

  return (
    <EditarPresupuestoDetalleFormDialog
      detalle={detalle}
      selectOptions={{ categorias, unidadesMedida }}
    />
  );
}
