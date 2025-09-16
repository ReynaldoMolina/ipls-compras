'use client';

import { useMemo } from 'react';
import { DataTableDetalle } from './data-table-detalle';
import { SolicitudDetalle, SelectOptions } from '@/types/types';
import { getSolicitudesDetalleColumns } from '@/app/(compras)/solicitudes/(forms)/columns';

type Props = {
  idSolicitud: number;
  data?: SolicitudDetalle[];
  unidadesMedida: SelectOptions[];
  estados: SelectOptions[];
  ubicaciones: SelectOptions[];
  categorias: SelectOptions[];
};

export default function SolicitudesDetalleTable({
  idSolicitud,
  data,
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
      initialData={data}
    />
  );
}
