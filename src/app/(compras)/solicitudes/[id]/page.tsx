export const dynamic = 'force-dynamic'; // to allow data refresh without full reload

import { getEntidadesAcademicas } from '@/fetch-data/form-select-options';
import { PageProps } from '@/types/types';
import { Header } from '@/components/header/header';
import { getUnidadesMedida } from '@/fetch-data/solicitud-detalle';
import { getSolicitudById, getSolicitudInfoById } from '@/fetch-data/solicitud';
import { EditarSolicitudForm } from '@/components/forms/solicitud/editar';
import { getSolicitudDetalleBySolicitudId } from '@/fetch-data/solicitud-detalle';

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

  const entidadesAcademicas = await getEntidadesAcademicas({
    tipo: 'especialidad',
  });
  const unidadesMedida = await getUnidadesMedida();

  return (
    <>
      <Header title={`Solicitud ${id} / ${solicitud?.entidad_academica}`} />
      <EditarSolicitudForm
        solicitud={solicitud}
        solicitud_detalle={solicitud_detalle}
        selectOptions={{ entidadesAcademicas, unidadesMedida }}
      />
    </>
  );
}
