import ActionBar from '@/components/actionbar/action-bar';
import { columns } from './columns';
import {
  getUniqueRolsFromUsuarios,
  getUsersTableData,
} from '@/fetch-data/usuarios';
import FilterButton from '@/components/actionbar/filter-button';
import { DataTable } from '@/components/tables/data-table';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { PageProps } from '@/types/types';
import { userStates } from '@/components/select-options-data';

export const metadata = {
  title: 'Usuarios',
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const tableData = await getUsersTableData(searchParams || {});
  const userRoles = await getUniqueRolsFromUsuarios();

  return (
    <>
      <Header title="Usuarios" showBackIcon={false} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterOptions={{ userStates, userRoles }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
