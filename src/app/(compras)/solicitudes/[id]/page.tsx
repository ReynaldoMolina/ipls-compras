export const dynamic = 'force-dynamic'; // to allow data refresh without full reload

import {
  getEntidadesAcademicas,
  getProveedores,
} from '@/fetch-data/form-select-options';
import { PageProps } from '@/types/types';
import { Header } from '@/components/header/header';
import {
  getSolicitudById,
  getSolicitudEstados,
  getSolicitudInfoById,
} from '@/fetch-data/solicitud';
import { EditarSolicitudForm } from '@/components/forms/solicitud/editar';
import { getSolicitudDetalleBySolicitudId } from '@/fetch-data/solicitud-detalle';
import { getOrdenesAddToExistingModal } from '@/fetch-data/orden';
import {
  getPresupuestoDetalleModal,
  getPresupuestosModal,
} from '@/fetch-data/presupuesto';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const solicitud = await getSolicitudInfoById(id);

  return {
    title: `Solicitud ${id} / ${solicitud.entidad_academica}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const solicitud = await getSolicitudById(id);
  const solicitud_detalle = await getSolicitudDetalleBySolicitudId(id);

  const orden_modal = await getOrdenesAddToExistingModal(18);

  const entidadesAcademicas = await getEntidadesAcademicas({
    tipo: 'especialidad',
  });
  const proveedores = await getProveedores();
  const estadosSolicitud = await getSolicitudEstados();
  const presupuestoDetalle = await getPresupuestoDetalleModal();

  return (
    <>
      <Header title={`Solicitud ${id} / ${solicitud?.entidad_academica}`} />
      <EditarSolicitudForm
        solicitud={solicitud}
        solicitud_detalle={solicitud_detalle}
        orden_modal={orden_modal}
        selectOptions={{ entidadesAcademicas, proveedores, estadosSolicitud }}
        presupuestoDetalle={presupuestoDetalle}
      />
    </>
  );
}
