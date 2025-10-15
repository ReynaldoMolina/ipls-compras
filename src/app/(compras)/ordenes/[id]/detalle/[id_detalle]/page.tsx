import { EditarOrdenDetalleForm } from '@/components/forms/orden/detalle/editar';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getOrdenDetalleById } from '@/fetch-data/orden-detalle';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id, id_detalle } = await params;

  return {
    title: `Solicitud ${id} / detalle ${id_detalle}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, id_detalle } = await params;
  const detalle = await getOrdenDetalleById(id_detalle);

  return (
    <>
      <Header title={`Solicitud ${id} / Detalle ${id_detalle}`} />
      <PageWrapper>
        <EditarOrdenDetalleForm detalle={detalle} />
      </PageWrapper>
    </>
  );
}
