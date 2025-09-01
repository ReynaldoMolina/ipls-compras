import { ProviderForm } from '@/components/forms/provider';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import {
  getDepartamentos,
  getSectores,
  getSubsectoresBySector,
} from '@/lib/data/forms';

const title = 'Nuevo proveedor';

export const metadata = {
  title: title,
};

type Props = {
  searchParams?: {
    sector?: string;
  };
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const sectorId = searchParams?.sector
    ? Number(searchParams.sector)
    : undefined;
  const departamentos = await getDepartamentos();
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(sectorId);

  return (
    <>
      <Header title={title} />
      <PageWrapper>
        <ProviderForm
          action="create"
          departamentos={departamentos}
          sectores={sectores}
          subsectores={subsectores}
        />
      </PageWrapper>
    </>
  );
}
