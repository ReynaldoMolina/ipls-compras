import { OptionsMenu } from './options-menu/options-menu';
import { SearchInput } from '@/components/tables/action-bar-detalle/search-input';
import { Table } from '@tanstack/react-table';
import { AddProductDisabledModal, NuevoSolicitudDetalleForm } from '../nuevo';

interface ActionsBarDetalleProps<TData> {
  table: Table<TData>;
  id_presupuesto: number | null;
}

export function ActionsBarDetalle<TData>({
  table,
  id_presupuesto,
}: ActionsBarDetalleProps<TData>) {
  return (
    <div className="inline-flex gap-2 w-full">
      <SearchInput table={table} />
      <div className="inline-flex gap-2 ml-auto">
        <OptionsMenu table={table} />
        {!id_presupuesto ? (
          <NuevoSolicitudDetalleForm table={table} />
        ) : (
          <AddProductDisabledModal id_presupuesto={id_presupuesto} />
        )}
      </div>
    </div>
  );
}
