import ActionBar from '@/components/actionbar/action-bar';
import { columns } from './columns';
import {
  getUniqueRolsFromUsuarios,
  getUsersTableData,
} from '@/lib/data/usuarios';
import FilterButton from '@/components/actionbar/filter-button';
import { DataTable } from '@/components/tables/data-table';

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
      <ActionBar>
        <FilterButton filterOptions={{ userStates, userRoles }} />
      </ActionBar>
      <DataTable columns={columns} data={tableData} />
    </>
  );
}
