import { SolvenciaForm } from '@/components/forms/solvencias';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Proveedor ${id} - Nueva solvencia`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <Header title={`Proveedor ${id} - Nueva solvencia`} />
      <PageWrapper>
        <SolvenciaForm action="create" id_proveedor={Number(id)} />
      </PageWrapper>
    </>
  );
}
