import { PageProps } from '@/types/types';
import {
  getDetalleCategorias,
  getDetalleEstados,
  getDetalleUbicaciones,
  getUnidadesMedida,
} from '@/fetch-data/presupuesto-detalle';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { SolicitudDetalleForm } from '@/components/forms/solicitudes_detalle';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Solicitud ${id} - Nuevo detalle`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  //selectOptions
  const unidadesMedida = await getUnidadesMedida();
  const estados = await getDetalleEstados();
  const ubicaciones = await getDetalleUbicaciones();
  const categorias = await getDetalleCategorias();

  return (
    <>
      <Header title={`Solicitud ${id} - Nuevo detalle`} />
      <PageWrapper>
        <SolicitudDetalleForm
          action="create"
          id_solicitud={Number(id)}
          selectOptions={{ unidadesMedida, estados, ubicaciones, categorias }}
        />
      </PageWrapper>
    </>
  );
}
