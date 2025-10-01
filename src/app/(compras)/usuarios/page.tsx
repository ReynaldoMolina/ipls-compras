import ActionBar from '@/components/actionbar/action-bar';
import { columns } from './columns';
import {
  getUniqueRolesFromUsuarios,
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

export default async function Page({ searchParams }: PageProps) {
  const tableData = await getUsersTableData(await searchParams);
  const userRoles = await getUniqueRolesFromUsuarios();

  return (
    <>
      <Header title="Usuarios" showBackIcon={false} />
      <PageWrapper>
        <ActionBar allowNew={false}>
          <FilterButton filterOptions={{ userStates, userRoles }} />
        </ActionBar>
        <DataTable columns={columns} data={tableData} />
      </PageWrapper>
    </>
  );
}
