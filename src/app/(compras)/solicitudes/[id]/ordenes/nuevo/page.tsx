import { OrdenForm } from '@/components/forms/ordenes';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { getProveedores } from '@/fetch-data/form-select-options';
import { getOrdenesEstados } from '@/fetch-data/ordenes';
import { PageProps } from '@/types/types';

const title = 'Nueva orden';

export const metadata = {
  title: title,
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id_solicitud = Number(params.id);
  const estados = await getOrdenesEstados();
  const proveedores = await getProveedores();

  return (
    <>
      <Header title="Nueva orden" />
      <PageWrapper>
        <OrdenForm
          action="create"
          id_solicitud={id_solicitud}
          estados={estados}
          proveedores={proveedores}
        />
      </PageWrapper>
    </>
  );
}
