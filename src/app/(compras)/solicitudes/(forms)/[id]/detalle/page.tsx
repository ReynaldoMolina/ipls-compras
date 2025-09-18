import { PageProps } from '@/types/types';
import { getSolicitudDetalleByIdSolicitud } from '@/lib/data/solicitudes-detalle';
import {
  getDetalleCategorias,
  getDetalleEstados,
  getDetalleUbicaciones,
  getUnidadesMedida,
} from '@/lib/data/solicitudes-detalle';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { DataTableDetalle } from '@/components/tables/data-table-detalle';
import { columns } from './columns';

export async function generateMetadata(props: PageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  return {
    title: `Detalle solicitud ${id}`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const idSolicitud = Number(params?.id);
  const tableData = await getSolicitudDetalleByIdSolicitud(idSolicitud);
  const unidadesMedida = await getUnidadesMedida();
  const estados = await getDetalleEstados();
  const ubicaciones = await getDetalleUbicaciones();
  const categorias = await getDetalleCategorias();

  return (
    <>
      <Header title={`Detalle solicitud ${idSolicitud}`} />
      <PageWrapper>
        <DataTableDetalle
          idSolicitud={idSolicitud}
          columns={columns}
          tableData={tableData}
          selectOptions={{ unidadesMedida, estados, ubicaciones, categorias }}
        />
      </PageWrapper>
    </>
  );
}
