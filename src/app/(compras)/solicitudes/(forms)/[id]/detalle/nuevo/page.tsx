import { PageProps } from '@/types/types';
import {
  getDetalleCategorias,
  getDetalleEstados,
  getDetalleUbicaciones,
  getUnidadesMedida,
} from '@/lib/data/solicitudes-detalle';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { SolicitudDetalleForm } from '@/components/forms/solicitudes_detalle';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  return {
    title: `Solicitud ${id} - Nuevo detalle`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id_solicitud = Number(params?.id);
  //selectOptions
  const unidadesMedida = await getUnidadesMedida();
  const estados = await getDetalleEstados();
  const ubicaciones = await getDetalleUbicaciones();
  const categorias = await getDetalleCategorias();

  return (
    <>
      <Header title={`Solicitud ${id_solicitud} - Nuevo detalle`} />
      <PageWrapper>
        <SolicitudDetalleForm
          action="create"
          id_solicitud={id_solicitud}
          selectOptions={{ unidadesMedida, estados, ubicaciones, categorias }}
        />
      </PageWrapper>
    </>
  );
}
