import ActionBar from '@/components/actionbar/action-bar';
import Header from '@/components//header/header';
import PageWrapper from '@/components/page-wrapper';
import { columns } from './columns';
import { DataTable } from '../../../components/tables/data-table';
import { getProviders, getProvidersDepartamentos } from '@/lib/data/providers';
import FilterButton from '@/components/actionbar/filter-button';

const title = 'Proveedores';

export const metadata = {
  title: title,
};

export default async function Page(props) {
  const params = await props.searchParams;
  const data = await getProviders(params);
  const departamentos = await getProvidersDepartamentos();

  const filterData = {
    departamentos: departamentos,
  };

  return (
    <>
      <Header title={title} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterData={filterData} />
        </ActionBar>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
