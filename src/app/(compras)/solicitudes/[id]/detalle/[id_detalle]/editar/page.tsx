import { PageProps } from '@/types/types';
import {
  getDetalleCategorias,
  getDetalleEstados,
  getDetalleUbicaciones,
  getSolicitudDetalleById,
  getUnidadesMedida,
} from '@/fetch-data/solicitudes-detalle';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { SolicitudDetalleForm } from '@/components/forms/solicitudes_detalle';

export async function generateMetadata({ params }: PageProps) {
  const { id, id_detalle } = await params;
  return {
    title: `Solicitud ${id} - Detalle ${id_detalle}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, id_detalle } = await params;
  const detalle = await getSolicitudDetalleById(id_detalle);

  //selectOptions
  const unidadesMedida = await getUnidadesMedida();
  const estados = await getDetalleEstados();
  const ubicaciones = await getDetalleUbicaciones();
  const categorias = await getDetalleCategorias();

  return (
    <>
      <Header title={`Solicitud ${id} - Detalle ${id_detalle}`} />
      <PageWrapper>
        <SolicitudDetalleForm
          action="edit"
          detalle={detalle}
          id_solicitud={Number(id)}
          selectOptions={{ unidadesMedida, estados, ubicaciones, categorias }}
        />
      </PageWrapper>
    </>
  );
}
