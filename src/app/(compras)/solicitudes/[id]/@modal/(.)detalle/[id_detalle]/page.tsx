export const dynamic = 'force-dynamic'; // to allow data refresh without full reload

import { EditarSolicitudDetalleFormDialog } from '@/components/forms/solicitud/detalle/editar-dialog';
import {
  getSolicitudDetalleById,
  getUnidadesMedida,
} from '@/fetch-data/solicitud-detalle';
import { PageProps } from '@/types/types';

export default async function Page({ params }: PageProps) {
  const { id_detalle } = await params;
  const detalle = await getSolicitudDetalleById(id_detalle);
  const unidadesMedida = await getUnidadesMedida();

  return (
    <EditarSolicitudDetalleFormDialog
      detalle={detalle}
      selectOptions={{ unidadesMedida }}
    />
  );
}
