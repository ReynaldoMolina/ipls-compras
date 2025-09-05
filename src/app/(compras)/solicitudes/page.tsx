import ActionBar from '@/components/actionbar/action-bar';
import Header from '@/components//header/header';
import PageWrapper from '@/components/page-wrapper';
import { columns } from './columns';
import { DataTable } from '../../../components/tables/data-table';
import FilterButton from '@/components/actionbar/filter-button';
import { SearchParamsProps } from '@/types/types';
import { getSolicitudes } from '@/lib/data/solicitudes';

const title = 'Solicitudes de compra';

export const metadata = {
  title: title,
};

type Props = {
  searchParams: SearchParamsProps;
};

export default async function Page(props: Props) {
  const params = await props.searchParams;
  const data = await getSolicitudes(params);
  // const departamentos = await getProvidersDepartamentos();

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
