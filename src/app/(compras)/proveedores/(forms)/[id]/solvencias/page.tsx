import FormBackButton from '@/components/forms/elements/form-back-button';
import { FormTabItem, FormTabList } from '@/components/forms/elements/form-tab';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { DataTable } from '@/components/tables/data-table';
import { EditPageProps } from '@/types/types';
import { columns } from './columns';
import { getSolvenciasById } from '@/lib/data/providers';

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
};

export default async function Page(props: Props) {
  const id = Number(props.params?.id);
  const data = await getSolvenciasById(id);
  console.log(data);

  return (
    <>
      <Header title={`Proveedor ${id} - Solvencias`} />
      <PageWrapper>
        <FormBackButton />
        <FormTabList>
          <FormTabItem href="editar" label="Información" />
          <FormTabItem href="solvencias" label="Solvencias" />
        </FormTabList>
        <DataTable columns={columns} data={data} />
      </PageWrapper>
    </>
  );
}
