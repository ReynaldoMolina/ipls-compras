import { OptionsMenu } from './options-menu';
import { SearchInput } from './search-input';
import { FilterButtonDetalle } from './filter-button-detalle';
import { NewButton } from '@/components/actionbar/new-button';
import { Table } from '@tanstack/react-table';

interface ActionsBarDetalleProps<TData> {
  table: Table<TData>;
  tableName: 'orden' | 'solicitud' | 'ordenmodal' | 'presupuesto';
  allowNew?: boolean;
}

export function ActionsBarDetalle<TData>({
  table,
  tableName,
  allowNew = true,
}: ActionsBarDetalleProps<TData>) {
  return (
    <div className="inline-flex gap-2 w-full">
      <SearchInput table={table} />
      <div className="inline-flex gap-2 ml-auto">
        <OptionsMenu table={table} tableName={tableName} />
        {/* <FilterButtonDetalle /> */}
        {allowNew && <NewButton isDetalle />}
      </div>
    </div>
  );
}
