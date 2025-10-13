import { PageProps } from '@/types/types';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { OrdenDetalleForm } from '@/components/forms/ordenes_detalle';
import { getOrdenDetalleById } from '@/fetch-data/orden-detalle';

export async function generateMetadata({ params }: PageProps) {
  const { id, id_orden, id_orden_detalle } = await params;
  return {
    title: `Solicitud ${id} - Orden ${id_orden} - Detalle ${id_orden_detalle}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, id_orden, id_orden_detalle } = await params;
  const detalle = await getOrdenDetalleById(id_orden_detalle);

  return (
    <>
      <Header
        title={`Solicitud ${id} - Orden ${id_orden} - Detalle ${id_orden_detalle}`}
      />
      <PageWrapper>
        <OrdenDetalleForm action="edit" detalle={detalle} />
      </PageWrapper>
    </>
  );
}
