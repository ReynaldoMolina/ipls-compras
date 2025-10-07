import { getSolvenciaById } from '@/fetch-data/proveedor-solvencia';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { PageProps } from '@/types/types';
import { EditarSolvenciaForm } from '@/components/forms/solvencia/editar';

export async function generateMetadata({ params }: PageProps) {
  const { id, id_solvencia } = await params;
  return {
    title: `Proveedor ${id} - Solvencia ${id_solvencia}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, id_solvencia } = await params;
  const solvencia = await getSolvenciaById(id_solvencia);

  return (
    <>
      <Header title={`Proveedor ${id} - Solvencia ${id_solvencia}`} />
      <PageWrapper>
        <EditarSolvenciaForm solvencia={solvencia} />
      </PageWrapper>
    </>
  );
}
