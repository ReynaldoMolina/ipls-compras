import { Header } from '@/components/header/header';
import { OrdenPdfViewer } from '@/components/order-pdf/order-pdf';
import { getOrdenPdfById } from '@/fetch-data/orden-pdf';
import { OrdenPdfProps, PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id_orden } = await params;
  return {
    title: `Orden de compra ${id_orden}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id_orden } = await params;
  const ordenToPrint = await getOrdenPdfById(id_orden);

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
      <Header title={`Orden de compra ${id_orden}`} />
      <OrdenPdfViewer register={ordenToPrint ?? emptyOrden} />;
    </>
  );
}
