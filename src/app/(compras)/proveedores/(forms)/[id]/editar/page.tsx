import { ProviderForm } from '@/components/forms/provider';
import {
  getDepartamentos,
  getSectores,
  getSubsectoresBySector,
} from '@/lib/data/forms';
import { getProviderById } from '@/lib/data/proveedores';
import { EditPageProps } from '@/types/types';

export async function generateMetadata(props: EditPageProps) {
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
  const provider = await getProviderById(id);
  const departamentos = await getDepartamentos();
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(
    sectorId || provider.id_sector
  );

  return (
    <>
      <ProviderForm
        action="edit"
        provider={provider}
        departamentos={departamentos}
        sectores={sectores}
        subsectores={subsectores}
      />
    </>
  );
}
