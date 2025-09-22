import { ProveedorForm } from '@/components/forms/proveedor';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import {
  getDepartamentos,
  getSectores,
  getSubsectoresBySector,
} from '@/fetch-data/form-select-options';
import { getProveedorById } from '@/fetch-data/proveedores';
import { PageProps } from '@/types/types';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  return {
    title: `Proveedor ${id}`,
  };
}

type Props = {
  params?: {
    id: string;
  };
  searchParams?: {
    sector?: string;
  };
};

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const sectorId = searchParams?.sector
    ? Number(searchParams.sector)
    : undefined;

  const id = Number(params?.id);
  const provider = await getProveedorById(id);
  const departamentos = await getDepartamentos();
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(
    sectorId || (provider.id_sector ?? 0)
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
