import { EditPageProps } from '@/types/types';
import { SolvenciaForm } from '@/components/forms/solvencias';
import FormTitle from '@/components/forms/elements/form-title';

export async function generateMetadata(props: EditPageProps) {
  const params = await props.params;
  const { id } = params;
  return {
    title: `Proveedor ${id} - Nueva solvencia`,
  };
}

type Props = {
  params?: {
    id: string;
    idsol: string;
  };
  searchParams?: {
    solvencia?: string;
  };
};

export default async function Page(props: Props) {
  const params = await props.params;
  const id_proveedor = Number(params?.id);

  return (
    <>
      <FormTitle title={`Proveedor ${id_proveedor} - Nueva solvencia`} />
      <SolvenciaForm action="create" id_proveedor={id_proveedor} />
    </>
  );
}
