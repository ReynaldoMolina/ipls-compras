import { PageProps } from '@/types/types';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { columns } from './columns';
import { getOrdenDetalleByOrdenId } from '@/fetch-data/ordenes-detalle';
import { DataTableOrdenDetalle } from '@/components/tables/detalle/data-table-orden-detalle';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id, id_orden } = urlparams;
  return {
    title: `Solicitud ${id} - Orden ${id_orden} - Detalle`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id_solicitud = Number(params?.id);
  const id_orden = Number(params?.id_orden);
  const tableData = await getOrdenDetalleByOrdenId(id_orden);

  return (
    <>
      <Header
        title={`Solicitud ${id_solicitud} - Orden ${id_orden} - Detalle`}
      />
      <PageWrapper>
        <DataTableOrdenDetalle
          columns={columns}
          tableData={tableData}
          id_orden={id_orden}
        />
      </PageWrapper>
    </>
  );
}
