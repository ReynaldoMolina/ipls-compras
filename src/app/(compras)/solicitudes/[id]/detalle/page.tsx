export const dynamic = 'force-dynamic';

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

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  return {
    title: `Solicitud ${id} - Detalle`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id_solicitud = Number(params?.id);
  const tableData = await getSolicitudDetalleBySolicitudId(
    id_solicitud,
    searchParams || {}
  );

  const unidadesMedida = await getUnidadesMedida();
  const estados = await getDetalleEstados();
  const categorias = await getDetalleCategorias();
  const proveedores = await getProveedores();

  const ordenesTableDataModal = await getOrdenesAddToExistingModal(
    searchParams || {},
    undefined
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
          id_solicitud={id_solicitud}
        />
      </PageWrapper>
    </>
  );
}
