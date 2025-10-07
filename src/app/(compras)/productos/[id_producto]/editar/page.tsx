import { EditarProductoForm } from '@/components/forms/producto/editar';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getProductById } from '@/fetch-data/productos';
import { getUnidadesMedida } from '@/fetch-data/solicitudes-detalle';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Producto ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id_producto } = await params;
  const product = await getProductById(id_producto);
  const unidadesMedida = await getUnidadesMedida();

  return (
    <>
      <Header title={`Producto ${id_producto}`} />
      <PageWrapper>
        <EditarProductoForm
          producto={product}
          selectOptions={{ unidadesMedida }}
        />
      </PageWrapper>
    </>
  );
}
