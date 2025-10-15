import { Header } from '@/components/header/header';
import { OrdenPdfViewer } from '@/components/order-pdf/order-pdf';
import { getOrdenPdfById } from '@/fetch-data/orden-pdf';
import { OrdenPdfProps, PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Orden de compra ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const ordenToPrint = await getOrdenPdfById(id);

  const emptyOrden: OrdenPdfProps = {
    id_orden: 0,
    proveedor: null,
    numero_cotizacion: null,
    termino_de_pago: null,
    moneda: null,
    fecha_creacion: '',
    calcular_iva: false,
    descuento: 0,
    detalle: [],
  };

  return (
    <>
      <Header title={`Orden de compra ${id}`} />
      <OrdenPdfViewer register={ordenToPrint ?? emptyOrden} />
    </>
  );
}
