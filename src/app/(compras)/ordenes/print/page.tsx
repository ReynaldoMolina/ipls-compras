import { OrdenPdf } from '@/components/order-pdf/order-pdf';
import { getOrdenPdfById } from '@/fetch-data/orden-pdf';
import { OrdenPdfProps, PageProps } from '@/types/types';

const title = 'Órdenes de compra';

export const metadata = {
  title: title,
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const id_orden = params.id_orden;
  const ordenToPrint = await getOrdenPdfById(1);

  const emptyOrden: OrdenPdfProps = {
    id_orden: 0,
    proveedor: null,
    numero_cotizacion: null,
    termino_de_pago: null,
    moneda: null,
    fecha_creacion: '',
    detalle: [],
  };

  return <OrdenPdf register={ordenToPrint ?? emptyOrden} />;
}
