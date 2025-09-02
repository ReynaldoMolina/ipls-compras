import FormBackButton from '@/components/forms/elements/form-back-button';
import { FormTabItem, FormTabList } from '@/components/forms/elements/form-tab';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { DataTable } from '@/components/tables/data-table';
import { EditPageProps } from '@/types/types';
import { columns } from './columns';
import { getSolvenciasById } from '@/lib/data/solvencias';
import ActionBar from '@/components/actionbar/action-bar';
import FilterButton from '@/components/actionbar/filter-button';

export async function generateMetadata(props: EditPageProps) {
  const { id } = props.params;
  return {
    title: `Proveedor ${id} - Solvencias`,
  };
}

type Props = {
  params?: {
    id: string;
  };
  searchParams?: {
    solvencia?: string;
  };
};

export default async function Page(props: Props) {
  const id_proveedor = Number(props.params?.id);
  const searchParams = await props.searchParams;
  const data = await getSolvenciasById(id_proveedor, searchParams);

  const years = [
    {
      value: 2025,
      label: '2025',
    },
  ];

  const filterData = {
    years,
  };

  return (
    <>
      <Header title={`Proveedor ${id_proveedor} - Solvencias`} />
      <PageWrapper>
        <FormBackButton />
        <FormTabList>
          <FormTabItem href="editar" label="Información" />
          <FormTabItem href="solvencias" label="Solvencias" />
        </FormTabList>
        <ActionBar allowSearch={false}>
          <FilterButton filterData={filterData} />
        </ActionBar>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
