export const dynamic = 'force-dynamic'; // to allow data refresh without full reload

import { EditarOrdenDetalleFormDialog } from '@/components/forms/orden/detalle/editar-dialog';
import { getOrdenDetalleById } from '@/fetch-data/orden-detalle';
import { PageProps } from '@/types/types';

export default async function Page({ params }: PageProps) {
  const { id_detalle } = await params;
  const detalle = await getOrdenDetalleById(id_detalle);

  return <EditarOrdenDetalleFormDialog detalle={detalle} />;
}
