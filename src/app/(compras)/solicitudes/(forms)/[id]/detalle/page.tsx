import { PageProps } from '@/types/types';
import { getSolicitudDetalleBySolicitudId } from '@/lib/data/solicitudes-detalle';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { DataTableDetalle } from '@/components/tables/data-table-detalle';
import { columns } from './columns';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  return {
    title: `Solicitud ${id} - Detalle`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id_solicitud = Number(params?.id);
  const tableData = await getSolicitudDetalleBySolicitudId(
    id_solicitud,
    searchParams || {}
  );

  return (
    <>
      <Header title={`Solicitud ${id_solicitud} - Detalle`} />
      <PageWrapper>
        <DataTableDetalle columns={columns} tableData={tableData} />
      </PageWrapper>
    </>
  );
}
