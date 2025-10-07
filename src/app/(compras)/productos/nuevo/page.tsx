import { NuevoProductoForm } from '@/components/forms/producto/nuevo';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getUnidadesMedida } from '@/fetch-data/solicitudes-detalle';

export const metadata = {
  title: 'Nuevo producto',
};

export default async function Page() {
  const unidadesMedida = await getUnidadesMedida();

  return (
    <>
      <Header title="Nuevo producto" />
      <PageWrapper>
        <NuevoProductoForm selectOptions={{ unidadesMedida }} />
      </PageWrapper>
    </>
  );
}
