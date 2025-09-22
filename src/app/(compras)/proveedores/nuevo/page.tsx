import { ProveedorForm } from '@/components/forms/proveedor';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import {
  getDepartamentos,
  getSectores,
  getSubsectoresBySector,
} from '@/lib/data/form-elements';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Nuevo proveedor',
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const sectorId = searchParams?.sector
    ? Number(searchParams.sector)
    : undefined;
  const departamentos = await getDepartamentos();
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(sectorId);

  return (
    <>
      <Header title="Nuevo proveedor" />
      <PageWrapper>
        <ProveedorForm
          action="create"
          departamentos={departamentos}
          sectores={sectores}
          subsectores={subsectores}
        />
      </PageWrapper>
    </>
  );
}
