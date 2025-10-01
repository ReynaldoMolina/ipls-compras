import Header from '@/components/header/header';
import { OrdenPdfViewer } from '@/components/order-pdf/order-pdf';
import { getOrdenPdfById } from '@/fetch-data/orden-pdf';
import { OrdenPdfProps } from '@/types/types';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id_orden } = urlparams;
  return {
    title: `Orden de compra ${id_orden}`,
  };
}

type PageProps = {
  params: {
    id_orden: string;
  };
};

export default async function Page(props: PageProps) {
  const params = props.params;
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

  return (
    <>
      <Header title={`Orden de compra ${id_orden}`} />
      <OrdenPdfViewer register={ordenToPrint ?? emptyOrden} />;
    </>
  );
}
