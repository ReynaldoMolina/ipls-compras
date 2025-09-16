import ActionBar from '@/components/actionbar/action-bar';
import { columns } from './columns';
import {
  getUniqueRolsFromUsuarios,
  getUsersTableData,
} from '@/lib/data/usuarios';
import FilterButton from '@/components/actionbar/filter-button';
import { DataTable } from '@/components/tables/data-table';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';

const title = 'Usuarios';

export const metadata = {
  title: title,
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const tableData = await getUsersTableData(searchParams);
  const userRoles = await getUniqueRolsFromUsuarios();

  const userStates = [
    {
      value: 'true',
      label: 'Activo',
    },
    {
      value: 'false',
      label: 'Inactivo',
    },
  ];

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
