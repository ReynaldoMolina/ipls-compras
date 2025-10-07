import { OrdenPdfProps, PageProps } from '@/types/types';
import { Header } from '@/components/header/header';
import { PageWrapper } from '@/components/page-wrapper';
import { getOrdenById, getOrdenesEstados } from '@/fetch-data/orden';
import { OrdenForm } from '@/components/forms/ordenes';
import { getProveedores } from '@/fetch-data/form-select-options';
import { getOrdenPdfById } from '@/fetch-data/orden-pdf';

export async function generateMetadata({ params }: PageProps) {
  const { id, id_orden } = await params;
  return {
    title: `Solicitud ${id} - Orden ${id_orden}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id, id_orden } = await params;
  const orden = await getOrdenById(id_orden);
  const estados = await getOrdenesEstados();
  const proveedores = await getProveedores();

  const ordenPdf = await getOrdenPdfById(id_orden);
  const emptyOrden: OrdenPdfProps = {
    id_orden: 0,
    proveedor: null,
    numero_cotizacion: null,
    termino_de_pago: null,
    moneda: null,
    fecha_creacion: '',
    detalle: [],
  };

  return (
    <>
      <Header title={`Solicitud ${id} - Orden ${id_orden}`} />
      <PageWrapper>
        <OrdenForm
          action="edit"
          orden={orden}
          id_solicitud={Number(id)}
          estados={estados}
          proveedores={proveedores}
          ordenPdf={ordenPdf ?? emptyOrden}
        />
      </PageWrapper>
    </>
  );
}
