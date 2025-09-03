import { EditPageProps } from '@/types/types';
import { SolvenciaForm } from '@/components/forms/solvencias';

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
      <SolvenciaForm action="create" id_proveedor={id_proveedor} />
    </>
  );
}
