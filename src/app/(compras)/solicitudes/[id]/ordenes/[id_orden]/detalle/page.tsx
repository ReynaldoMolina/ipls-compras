import { PageProps } from '@/types/types';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { columns } from './columns';
import { getOrdenDetalleByOrdenId } from '@/fetch-data/ordenes-detalle';
import { DataTableOrdenDetalle } from '@/components/tables/detalle/data-table-orden-detalle';

export async function generateMetadata({ params }: PageProps) {
  const { id, id_orden } = await params;
  return {
    title: `Solicitud ${id} - Orden ${id_orden} - Detalle`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, id_orden } = await params;
  const tableData = await getOrdenDetalleByOrdenId(id_orden);

  return (
    <>
      <Header title={`Solicitud ${id} - Orden ${id_orden} - Detalle`} />
      <PageWrapper>
        <DataTableOrdenDetalle
          columns={columns}
          tableData={tableData}
          id_solicitud={Number(id)}
          id_orden={Number(id_orden)}
        />
      </PageWrapper>
    </>
  );
}
