import ActionBar from '@/components/actionbar/action-bar';
import Header from '@/components//header/header';
import PageWrapper from '@/components/page-wrapper';
import { columns } from './columns';
import { DataTable } from '../../../components/tables/data-table';
import {
  getProveedoresTableData,
  getDepartamentosFromProveedores,
} from '@/lib/data/proveedores';
import FilterButton from '@/components/actionbar/filter-button';

const title = 'Proveedores';

export const metadata = {
  title: title,
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const proveedoresTableData = await getProveedoresTableData(searchParams);
  const departamentoOptions = await getDepartamentosFromProveedores();

  const filterData = {
    departamentosOptions: departamentoOptions,
  };

  return (
    <>
      <Header title={title} />
      <PageWrapper>
        <ActionBar>
          <FilterButton filterData={filterData} />
        </ActionBar>
        <DataTable columns={columns} data={proveedoresTableData} />
      </PageWrapper>
    </>
  );
}
