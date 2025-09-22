import { PageProps } from '@/types/types';
import {
  getDetalleCategorias,
  getDetalleEstados,
  getDetalleUbicaciones,
  getSolicitudDetalleById,
  getUnidadesMedida,
} from '@/lib/data/solicitudes-detalle';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { SolicitudDetalleForm } from '@/components/forms/solicitudes_detalle';

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { id, id_detalle } = params;
  return {
    title: `Solicitud ${id} - Detalle ${id_detalle}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id_solicitud = Number(params?.id);
  const id_detalle = Number(params?.id_detalle);

  const detalle = await getSolicitudDetalleById(id_detalle);

  //selectOptions
  const unidadesMedida = await getUnidadesMedida();
  const estados = await getDetalleEstados();
  const ubicaciones = await getDetalleUbicaciones();
  const categorias = await getDetalleCategorias();

  return (
    <>
      <Header title={`Solicitud ${id_solicitud} - Detalle ${id_detalle}`} />
      <PageWrapper>
        <SolicitudDetalleForm
          action="edit"
          detalle={detalle}
          id_solicitud={id_solicitud}
          selectOptions={{ unidadesMedida, estados, ubicaciones, categorias }}
        />
      </PageWrapper>
    </>
  );
}
