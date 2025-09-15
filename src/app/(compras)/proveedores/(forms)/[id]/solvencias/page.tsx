import { DataTable } from '@/components/tables/data-table';
import { EditPageProps } from '@/types/types';
import { columns } from './columns';
import { getSolvenciasByProviderId } from '@/lib/data/solvencias';
import ActionBar from '@/components/actionbar/action-bar';
import FilterButton from '@/components/actionbar/filter-button';
import FormTitle from '@/components/forms/elements/form-title';

export async function generateMetadata(props: EditPageProps) {
  const params = await props.params;
  const { id } = params;
  return {
    title: `Proveedor ${id} - Solvencias`,
  };
}

type Props = {
  params?: {
    id: string;
  };
  searchParams: {
    solvencia?: string;
  };
};

export default async function Page(props: Props) {
  const params = await props.params;
  const id_proveedor = Number(params?.id);
  const searchParams = await props.searchParams;
  const tableData = await getSolvenciasByProviderId(id_proveedor, searchParams);

  const years = [
    {
      value: '2025',
      label: '2025',
    },
  ];

  return (
    <>
      <FormTitle title={`Proveedor ${id_proveedor} - Solvencias`} />
      <ActionBar>
        <FilterButton filterOptions={{ years }} />
      </ActionBar>
      <DataTable columns={columns} data={tableData} />
    </>
  );
}
