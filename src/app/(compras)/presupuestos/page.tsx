import { ActionBar } from '@/components/actionbar/action-bar';
import { Header } from '@/components//header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { columns } from './columns';
import { DataTable } from '../../../components/tables/data-table';
import { PageProps } from '@/types/types';
import {
  getPresupuestosTableData,
  getUniqueYearsFromPresupuestos,
} from '@/fetch-data/presupuesto';
import { FilterButton } from '@/components/actionbar/filter-button';

const title = 'Presupuestos';

export const metadata = {
  title: title,
};

export default async function Page({ searchParams }: PageProps) {
  const tableData = await getPresupuestosTableData(await searchParams);
  const years = await getUniqueYearsFromPresupuestos();

  return (
    <>
      <Header title={title} showBackIcon={false} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterOptions={{ years }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
