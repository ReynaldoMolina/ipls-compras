import ActionBar from '@/components/actionbar/action-bar';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { DataTable } from '@/components/tables/data-table';
import { PageProps } from '@/types/types';
import { columns } from './columns';
import { getOrdenesTableData } from '@/fetch-data/ordenes';
import FilterButton from '@/components/actionbar/filter-button';
import { getUniqueYearsFromSolicitudes } from '@/fetch-data/solicitudes';

const title = 'Órdenes de compra';

export const metadata = {
  title: title,
};

export default async function Page(props: PageProps) {
  const params = await props.searchParams;
  const tableData = await getOrdenesTableData(params ?? {}, undefined);
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
