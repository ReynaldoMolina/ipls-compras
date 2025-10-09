import { NuevaSolvenciaForm } from '@/components/forms/solvencia/nuevo';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getSolvenciaProveedorInfoById } from '@/fetch-data/proveedor-solvencia';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const proveedor = await getSolvenciaProveedorInfoById(id);

  return {
    title: `Nueva solvencia / ${proveedor?.nombre_comercial}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const proveedor = await getSolvenciaProveedorInfoById(id);

  return (
    <>
      <Header title={`Nueva solvencia / ${proveedor?.nombre_comercial}`} />
      <PageWrapper>
        <NuevaSolvenciaForm id_proveedor={Number(id)} />
      </PageWrapper>
    </>
  );
}
