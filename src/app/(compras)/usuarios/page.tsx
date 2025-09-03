import ActionBar from '@/components/actionbar/action-bar';
import Header from '@/components//header/header';
import PageWrapper from '@/components/page-wrapper';
import { DataTable } from '../../../components/tables/data-table';
import FilterButton from '@/components/actionbar/filter-button';
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
      <Header title={title} />
      <PageWrapper>
        <ActionBar>{/* <FilterButton filterData={filterData} /> */}</ActionBar>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
