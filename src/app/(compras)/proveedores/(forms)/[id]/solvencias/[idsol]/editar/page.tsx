import { EditPageProps } from '@/types/types';
import { getSolvenciaById } from '@/lib/data/solvencias';
import { SolvenciaForm } from '@/components/forms/solvencias';
import FormTitle from '@/components/forms/elements/form-title';

export async function generateMetadata(props: EditPageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  const { idsol } = urlparams;
  return {
    title: `Proveedor ${id} - Solvencia ${idsol}`,
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
  const id = Number(params?.idsol);
  const data = await getSolvenciaById(id);

  return (
    <>
      <FormTitle title={`Proveedor ${id_proveedor} - Solvencia ${id}`} />
      <SolvenciaForm
        action="edit"
        solvencia={data}
        id_proveedor={id_proveedor}
      />
    </>
  );
}
