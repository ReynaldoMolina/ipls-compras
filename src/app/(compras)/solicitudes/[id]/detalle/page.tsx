export const dynamic = 'force-dynamic'; // to allow data refresh without full reload

import { PageProps } from '@/types/types';
import {
  getDetalleCategorias,
  getDetalleEstados,
  getSolicitudDetalleBySolicitudId,
  getUnidadesMedida,
} from '@/fetch-data/solicitudes-detalle';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { columns } from './columns';
import { getProveedores } from '@/fetch-data/form-select-options';
import { getOrdenesAddToExistingModal } from '@/fetch-data/ordenes';
import { DataTableSolicitudesDetalle } from '@/components/tables/detalle/data-table-solicitudes-detalle';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Solicitud ${id} - Detalle`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const id_solicitud = (await params).id;
  const tableData = await getSolicitudDetalleBySolicitudId(id_solicitud);

  const unidadesMedida = await getUnidadesMedida();
  const estados = await getDetalleEstados();
  const categorias = await getDetalleCategorias();
  const proveedores = await getProveedores();

  const ordenesTableDataModal = await getOrdenesAddToExistingModal(
    await searchParams
  );

  return (
    <>
      <Header title={`Solicitud ${id_solicitud} - Detalle`} />
      <PageWrapper>
        <DataTableSolicitudesDetalle
          columns={columns}
          tableData={tableData}
          tableDataModal={ordenesTableDataModal}
          selectOptions={{ unidadesMedida, estados, categorias, proveedores }}
          id_solicitud={Number(id_solicitud)}
        />
      </PageWrapper>
    </>
  );
}
