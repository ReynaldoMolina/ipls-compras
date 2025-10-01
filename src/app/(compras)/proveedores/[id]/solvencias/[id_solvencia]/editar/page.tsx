import { getSolvenciaById } from '@/fetch-data/solvencias';
import { SolvenciaForm } from '@/components/forms/solvencias';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id, id_solvencia } = await params;
  return {
    title: `Proveedor ${id} - Solvencia ${id_solvencia}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, id_solvencia } = await params;
  const data = await getSolvenciaById(id_solvencia);

  return (
    <>
      <Header title={`Proveedor ${id} - Solvencia ${id_solvencia}`} />
      <PageWrapper>
        <SolvenciaForm
          action="edit"
          solvencia={data}
          id_proveedor={Number(id)}
        />
      </PageWrapper>
    </>
  );
}
