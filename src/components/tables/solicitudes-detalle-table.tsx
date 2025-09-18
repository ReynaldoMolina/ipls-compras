'use client';

import { useMemo } from 'react';
import { DataTableDetalle } from './data-table-detalle';
import { SolicitudDetalle, SelectOptions } from '@/types/types';
import { getSolicitudesDetalleColumns } from '@/app/(compras)/solicitudes/(forms)/[id]/detalle/columns';

type Props = {
  idSolicitud: number;
  tableData?: SolicitudDetalle[];
  unidadesMedida: SelectOptions[];
  estados: SelectOptions[];
  ubicaciones: SelectOptions[];
  categorias: SelectOptions[];
};

export default function SolicitudesDetalleTable({
  idSolicitud,
  tableData,
  unidadesMedida,
  estados,
  ubicaciones,
  categorias,
}: Props) {
  const columns = useMemo(
    () =>
      getSolicitudesDetalleColumns(
        unidadesMedida,
        estados,
        ubicaciones,
        categorias
      ),
    [unidadesMedida, estados, ubicaciones, categorias]
  );

  return (
    <DataTableDetalle
      idSolicitud={idSolicitud}
      columns={columns}
      initialData={tableData}
    />
  );
}
