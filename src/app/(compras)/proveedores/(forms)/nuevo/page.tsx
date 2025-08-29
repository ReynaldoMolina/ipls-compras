import { NewProviderForm } from '@/components/forms/new-provider';
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

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const sectorId = searchParams.sector
    ? Number(searchParams.sector)
    : undefined;
  const departamentos = await getDepartamentos();
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(sectorId);

  return (
    <>
      <Header title={title} />
      <PageWrapper>
        <NewProviderForm
          departamentos={departamentos}
          sectores={sectores}
          subsectores={subsectores}
        />
      </PageWrapper>
    </>
  );
}
