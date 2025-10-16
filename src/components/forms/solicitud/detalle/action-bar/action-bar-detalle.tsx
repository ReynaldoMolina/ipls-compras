import { OptionsMenu } from './options-menu/options-menu';
import { SearchInput } from '@/components/tables/action-bar-detalle/search-input';
import { Table } from '@tanstack/react-table';
import {
  AddProductFromPresupuestoModal,
  NuevoSolicitudDetalleForm,
} from '../nuevo';
import { SolicitudDetalleTable } from '@/types/types';

interface ActionsBarDetalleProps<TData extends SolicitudDetalleTable> {
  table: Table<TData>;
}

export function ActionsBarDetalle<TData extends SolicitudDetalleTable>({
  table,
}: ActionsBarDetalleProps<TData>) {
  const id_presupuesto = table.options.meta.solicitud.id_presupuesto;

  return (
    <div className="inline-flex gap-2 w-full">
      <SearchInput table={table} />
      <div className="inline-flex gap-2 ml-auto">
        <OptionsMenu table={table} />
        {!id_presupuesto ? (
          <NuevoSolicitudDetalleForm table={table} />
        ) : (
          <AddProductFromPresupuestoModal table={table} />
        )}
      </div>
    </div>
  );
}
