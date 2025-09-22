import ActionBar from '@/components/actionbar/action-bar';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { DataTable } from '@/components/tables/data-table';
import { PageProps } from '@/types/types';
import { getOrdenesTableData } from '@/fetch-data/ordenes';
import FilterButton from '@/components/actionbar/filter-button';
import { getUniqueYearsFromSolicitudes } from '@/fetch-data/solicitudes';
import { columns } from '@/app/(compras)/ordenes/columns';

const title = 'Órdenes de compra';

export const metadata = {
  title: title,
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const id_solicitud = params.id;
  const tableData = await getOrdenesTableData(
    searchParams ?? {},
    Number(id_solicitud)
  );
  const years = await getUniqueYearsFromSolicitudes();

  return (
    <>
      <Header title="Órdenes de compra" />
      <PageWrapper>
        <ActionBar allowNew={false}>
          <FilterButton filterOptions={{ years }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
