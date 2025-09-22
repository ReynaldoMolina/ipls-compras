import { DataTable } from '@/components/tables/data-table';
import { PageProps } from '@/types/types';
import { columns } from './columns';
import {
  getSolvenciasByProviderId,
  getUniqueYearsFromSolvencias,
} from '@/fetch-data/solvencias';
import ActionBar from '@/components/actionbar/action-bar';
import FilterButton from '@/components/actionbar/filter-button';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  return {
    title: `Proveedor ${id} - Solvencias`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id_proveedor = Number(params?.id);
  const tableData = await getSolvenciasByProviderId(
    id_proveedor,
    searchParams || {}
  );
  const years = await getUniqueYearsFromSolvencias();

  return (
    <>
      <Header title={`Proveedor ${id_proveedor} - Solvencias`} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterOptions={{ years }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
