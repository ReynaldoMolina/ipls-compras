import ActionBar from '@/components/actionbar/action-bar';
import { DataTable } from '../../../components/tables/data-table';
import { columns } from './columns';
import { getUsers } from '@/lib/data/usuarios';

const title = 'Usuarios';

export const metadata = {
  title: title,
};

export default async function Page(props) {
  const params = await props.searchParams;
  const data = await getUsers(params);

  // const filterData = {
  //   departamentos: departamentos,
  // };

  return (
    <>
      <ActionBar>{/* <FilterButton filterData={filterData} /> */}</ActionBar>
      <DataTable columns={columns} data={data} />
    </>
  );
}
