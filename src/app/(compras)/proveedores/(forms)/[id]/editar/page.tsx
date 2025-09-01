import { ProviderForm } from '@/components/forms/provider';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import {
  getDepartamentos,
  getSectores,
  getSubsectoresBySector,
} from '@/lib/data/forms';
import { getProviderById } from '@/lib/data/providers';
import { EditPageProps } from '@/types/types';

export async function generateMetadata(props: EditPageProps) {
  const { id } = props.params;
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
  const searchParams = await props.searchParams;
  const sectorId = searchParams?.sector
    ? Number(searchParams.sector)
    : undefined;

  const id = Number(props.params?.id);
  const provider = await getProviderById(id);
  const departamentos = await getDepartamentos();
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(
    sectorId || provider.id_sector
  );

  return (
    <>
      <Header title={`Proveedor ${id}`} />
      <PageWrapper>
        <ProviderForm
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
