import { EditarPresupuestoDetalleForm } from '@/components/forms/presupuesto/detalle/editar';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getPresupuestoDetalleById } from '@/fetch-data/presupuesto-detalle';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id, id_detalle } = await params;

  return {
    title: `Presupuesto ${id} / detalle ${id_detalle}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id_detalle } = await params;
  const detalle = await getPresupuestoDetalleById(id_detalle);

  return (
    <>
      <Header title={`Presupuestos / Detalle ${id_detalle}`} />
      <PageWrapper>
        <EditarPresupuestoDetalleForm detalle={detalle} />
      </PageWrapper>
    </>
  );
}
