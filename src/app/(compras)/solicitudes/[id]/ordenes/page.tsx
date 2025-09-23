import ActionBar from '@/components/actionbar/action-bar';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { DataTable } from '@/components/tables/data-table';
import { PageProps } from '@/types/types';
import { getOrdenesEstados, getOrdenesTableData } from '@/fetch-data/ordenes';
import FilterButton from '@/components/actionbar/filter-button';
import { getUniqueYearsFromSolicitudes } from '@/fetch-data/solicitudes';
import { columns } from '@/app/(compras)/ordenes/columns';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  return {
    title: `Solicitud ${id} - Órdenes de compra`,
  };
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const id_solicitud = params.id;
  const tableData = await getOrdenesTableData(
    searchParams ?? {},
    Number(id_solicitud)
  );
  const years = await getUniqueYearsFromSolicitudes();
  const ordenesStates = await getOrdenesEstados();

  return (
    <>
      <Header title={`Solicitud ${id_solicitud} - Órdenes de compra`} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterOptions={{ years, ordenesStates }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
