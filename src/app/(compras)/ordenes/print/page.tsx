import { OrdenPdf } from '@/components/order-pdf/order-pdf';
import { PageProps } from '@/types/types';

const title = 'Órdenes de compra';

export const metadata = {
  title: title,
};

export default async function Page(props: PageProps) {
  // const params = await props.searchParams;
  // const tableData = await getOrdenesTableData(params ?? {}, undefined);
  // const years = await getUniqueYearsFromSolicitudes();
  // const ordenesStates = await getOrdenesEstados();

  const register = {
    id_orden: 1,
    proveedor: 'FERRETERIA MORALES',
    numero_cotizacion: 123456,
    termino_de_pago: 'cheque',
    moneda: 'cordobas',
    fecha_creacion: '2025-08-11',
    detalle: [
      {
        id_solicitud_detalle: 1,
        cantidad: 2,
        unidad_medida: 'unidad',
        producto_servicio: 'CONECTOR MACHO 1/2 PVC',
        precio_real: 123.45,
      },
      {
        id_solicitud_detalle: 2,
        cantidad: 3,
        unidad_medida: 'unidad',
        producto_servicio: 'LLAVE DE CHORRO METALICA',
        precio_real: 1234.56,
      },
    ],
  };

  return (
    <>
      <OrdenPdf register={register} />
    </>
  );
}
