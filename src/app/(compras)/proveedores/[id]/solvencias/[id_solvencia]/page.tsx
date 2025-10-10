import {
  getSolvenciaById,
  getSolvenciaProveedorInfoById,
} from '@/fetch-data/proveedor-solvencia';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { PageProps } from '@/types/types';
import { EditarSolvenciaForm } from '@/components/forms/solvencia/editar';

export async function generateMetadata({ params }: PageProps) {
  const { id, id_solvencia } = await params;
  const proveedor = await getSolvenciaProveedorInfoById(id);

  return {
    title: `Solvencia ${id_solvencia} / ${proveedor?.nombre_comercial}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, id_solvencia } = await params;
  const proveedor = await getSolvenciaProveedorInfoById(id);
  const solvencia = await getSolvenciaById(id_solvencia);

  return (
    <>
      <Header
        title={`Solvencia ${id_solvencia} / ${proveedor?.nombre_comercial} `}
      />
      <PageWrapper>
        <EditarSolvenciaForm solvencia={solvencia} />
      </PageWrapper>
    </>
  );
}
