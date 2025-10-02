import { ProveedorForm } from '@/components/forms/proveedor';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import {
  getDepartamentos,
  getSectores,
  getSubsectoresBySector,
} from '@/fetch-data/form-select-options';
import { getProveedorById } from '@/fetch-data/proveedores';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Proveedor ${id}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { sector } = await searchParams;
  const { id } = await params;

  const provider = await getProveedorById(id);
  const departamentos = await getDepartamentos();
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(
    sector || (provider.id_sector ?? 0)
  );

  return (
    <>
      <Header title={`Proveedor ${id}`} />
      <PageWrapper>
        <ProveedorForm
          action="edit"
          provider={provider}
          departamentos={departamentos}
          sectores={sectores}
          subsectores={subsectores}
        />
      </PageWrapper>
    </>
  );
}
