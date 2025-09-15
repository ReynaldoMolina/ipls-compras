import ActionBar from '@/components/actionbar/action-bar';
import { columns } from './columns';
import { DataTable } from '../../../components/tables/data-table';
import {
  getProveedoresTableData,
  getUniqueDepartamentosFromProveedores,
} from '@/lib/data/proveedores';
import FilterButton from '@/components/actionbar/filter-button';

export const metadata = {
  title: 'Proveedores',
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const proveedoresTableData = await getProveedoresTableData(searchParams);
  const departamentosOptions = await getUniqueDepartamentosFromProveedores();

  return (
    <>
      <ActionBar>
        <FilterButton filterOptions={{ departamentosOptions }} />
      </ActionBar>
      <DataTable columns={columns} data={proveedoresTableData} />
    </>
  );
}
