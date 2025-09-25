import { PageProps } from '@/types/types';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { OrdenDetalleForm } from '@/components/forms/ordenes_detalle';
import { getOrdenDetalleById } from '@/fetch-data/ordenes-detalle';

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { id, id_orden, id_orden_detalle } = params;
  return {
    title: `Solicitud ${id} - Orden ${id_orden} - Detalle ${id_orden_detalle}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id_solicitud = Number(params?.id);
  const id_orden = Number(params?.id_orden);
  const id_orden_detalle = Number(params?.id_orden_detalle);

  const detalle = await getOrdenDetalleById(id_orden_detalle);

  return (
    <>
      <Header
        title={`Solicitud ${id_solicitud} - Orden ${id_orden} - Detalle ${id_orden_detalle}`}
      />
      <PageWrapper>
        <OrdenDetalleForm action="edit" detalle={detalle} />
      </PageWrapper>
    </>
  );
}
