import ActionBar from '@/components/actionbar/action-bar';
import { columns } from './columns';
import { DataTable } from '../../../components/tables/data-table';
import {
  getProveedoresTableData,
  getUniqueDepartamentosFromProveedores,
} from '@/lib/data/proveedores';
import FilterButton from '@/components/actionbar/filter-button';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Proveedores',
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const proveedoresTableData = await getProveedoresTableData(
    searchParams ?? {}
  );
  const departamentosOptions = await getUniqueDepartamentosFromProveedores();

  return (
    <>
      <Header title="Proveedores" showBackIcon={false} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterOptions={{ departamentosOptions }} />
        </ActionBar>
        <DataTable columns={columns} data={proveedoresTableData} />
      </PageWrapper>
    </>
  );
}
