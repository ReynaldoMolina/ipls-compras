import { OrdenPdfProps, PageProps } from '@/types/types';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { getOrdenById, getOrdenesEstados } from '@/fetch-data/ordenes';
import { OrdenForm } from '@/components/forms/ordenes';
import { getProveedores } from '@/fetch-data/form-select-options';
import { getOrdenPdfById } from '@/fetch-data/orden-pdf';

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { id, id_orden } = params;
  return {
    title: `Solicitud ${id} - Orden ${id_orden}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id_solicitud = Number(params?.id);
  const id_orden = Number(params?.id_orden);

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
      <Header title={`Solicitud ${id_solicitud} - Orden ${id_orden}`} />
      <PageWrapper>
        <OrdenForm
          action="edit"
          orden={orden}
          id_solicitud={id_solicitud}
          estados={estados}
          proveedores={proveedores}
          ordenPdf={ordenPdf ?? emptyOrden}
        />
      </PageWrapper>
    </>
  );
}
