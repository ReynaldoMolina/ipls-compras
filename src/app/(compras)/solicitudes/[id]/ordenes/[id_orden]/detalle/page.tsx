import { PageProps } from '@/types/types';
import { getSolicitudDetalleBySolicitudId } from '@/fetch-data/solicitudes-detalle';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { columns } from './columns';
import { DataTable } from '@/components/tables/data-table';
import { getOrdenById } from '@/fetch-data/ordenes';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id, id_orden } = urlparams;
  return {
    title: `Solicitud ${id} - Orden ${id_orden} - Detalle`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id_solicitud = Number(params?.id);
  const id_orden = Number(params?.id_orden);

  const tableData = await getOrdenById(id_orden);

  return (
    <>
      <Header
        title={`Solicitud ${id_solicitud} - Orden ${id_orden} - Detalle`}
      />
      <PageWrapper>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
