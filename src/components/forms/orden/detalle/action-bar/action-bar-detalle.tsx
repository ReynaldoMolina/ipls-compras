import { OptionsMenu } from './options-menu/options-menu';
import { SearchInput } from '@/components/tables/action-bar-detalle/search-input';
import { OrdenDetalleTable } from '@/types/types';
import { Table } from '@tanstack/react-table';

interface ActionsBarDetalleProps<TData extends OrdenDetalleTable> {
  table: Table<TData>;
}

export function ActionsBarDetalle<TData extends OrdenDetalleTable>({
  table,
}: ActionsBarDetalleProps<TData>) {
  return (
    <div className="inline-flex gap-2 w-full">
      <SearchInput table={table} />
      <div className="inline-flex gap-2 ml-auto">
        <OptionsMenu table={table} />
      </div>
    </div>
  );
}
