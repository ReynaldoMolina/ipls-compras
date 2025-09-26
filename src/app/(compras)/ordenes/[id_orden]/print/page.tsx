import { OrdenPdfViewer } from '@/components/order-pdf/order-pdf';
import { getOrdenPdfById } from '@/fetch-data/orden-pdf';
import { OrdenPdfProps, PageProps } from '@/types/types';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id_orden } = urlparams;
  return {
    title: `Órden de compra ${id_orden}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id_orden = params.id_orden;
  const ordenToPrint = await getOrdenPdfById(Number(id_orden));

  const emptyOrden: OrdenPdfProps = {
    id_orden: 0,
    proveedor: null,
    numero_cotizacion: null,
    termino_de_pago: null,
    moneda: null,
    fecha_creacion: '',
    detalle: [],
  };

  return <OrdenPdfViewer register={ordenToPrint ?? emptyOrden} />;
}
