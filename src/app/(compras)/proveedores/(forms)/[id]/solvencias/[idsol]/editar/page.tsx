import { PageProps } from '@/types/types';
import { getSolvenciaById } from '@/lib/data/solvencias';
import { SolvenciaForm } from '@/components/forms/solvencias';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  const { idsol } = urlparams;
  return {
    title: `Proveedor ${id} - Solvencia ${idsol}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id_proveedor = Number(params?.id);
  const id_solvencia = Number(params?.idsol);
  const data = await getSolvenciaById(id_solvencia);

  return (
    <>
      <Header title={`Proveedor ${id_proveedor} - Solvencia ${id_solvencia}`} />
      <PageWrapper>
        <SolvenciaForm
          action="edit"
          solvencia={data}
          id_proveedor={id_proveedor}
        />
      </PageWrapper>
    </>
  );
}
