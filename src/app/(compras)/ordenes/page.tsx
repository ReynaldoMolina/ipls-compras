import { ActionBar } from '@/components/actionbar/action-bar';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { DataTable } from '@/components/tables/data-table';
import { PageProps } from '@/types/types';
import { columns } from './columns';
import { getOrdenesEstados, getOrdenesTableData } from '@/fetch-data/ordenes';
import { FilterButton } from '@/components/actionbar/filter-button';
import { getUniqueYearsFromSolicitudes } from '@/fetch-data/solicitudes';

const title = 'Órdenes de compra';

export const metadata = {
  title: title,
};

export default async function Page({ searchParams }: PageProps) {
  const tableData = await getOrdenesTableData(await searchParams, undefined);
  const years = await getUniqueYearsFromSolicitudes();
  const ordenesStates = await getOrdenesEstados();

  return (
    <>
      <Header title="Órdenes de compra" />
      <PageWrapper>
        <ActionBar allowNew={false}>
          <FilterButton filterOptions={{ years, ordenesStates }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
