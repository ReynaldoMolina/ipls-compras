import { OptionsMenu } from './options-menu/options-menu';
import { SearchInput } from '@/components/tables/action-bar-detalle/search-input';
import { Table } from '@tanstack/react-table';
import { NuevoPresupuestoDetalleForm } from '../nuevo';
import { PresupuestoDetalleTable } from '@/types/types';

interface ActionsBarDetalleProps<TData extends PresupuestoDetalleTable> {
  table: Table<TData>;
}

export function ActionsBarDetalle<TData extends PresupuestoDetalleTable>({
  table,
}: ActionsBarDetalleProps<TData>) {
  return (
    <div className="inline-flex gap-2 w-full">
      <SearchInput table={table} />
      <div className="inline-flex gap-2 ml-auto">
        <OptionsMenu table={table} />
        <NuevoPresupuestoDetalleForm table={table} />
      </div>
    </div>
  );
}
