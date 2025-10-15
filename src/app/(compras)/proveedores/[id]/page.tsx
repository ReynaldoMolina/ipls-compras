import { EditarProveedorForm } from '@/components/forms/proveedor/editar';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import {
  getSectores,
  getSubsectoresBySector,
} from '@/fetch-data/form-select-options';
import { getProveedorById } from '@/fetch-data/proveedor';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const provider = await getProveedorById(id);

  return {
    title: `${provider.nombre_comercial}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { sector } = await searchParams;
  const { id } = await params;

  const provider = await getProveedorById(id);
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(
    sector || (provider.id_sector ?? 0)
  );

  return (
    <>
      <Header title={provider.nombre_comercial} />
      <PageWrapper>
        <EditarProveedorForm
          proveedor={provider}
          selectOptions={{ sectores, subsectores }}
        />
      </PageWrapper>
    </>
  );
}
