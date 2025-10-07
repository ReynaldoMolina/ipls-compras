import { NuevoProveedorForm } from '@/components/forms/proveedor/nuevo';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import {
  getDepartamentos,
  getSectores,
  getSubsectoresBySector,
} from '@/fetch-data/form-select-options';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Nuevo proveedor',
};

export default async function Page({ searchParams }: PageProps) {
  const sectorId = (await searchParams).sector;

  const departamentos = await getDepartamentos();
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(sectorId);

  return (
    <>
      <Header title="Nuevo proveedor" />
      <PageWrapper>
        <NuevoProveedorForm
          selectOptions={{ departamentos, sectores, subsectores }}
        />
      </PageWrapper>
    </>
  );
}
