import { ActionsBarDetalleProps } from '@/types/types';
import { OptionsMenu } from './options-menu';
import { SearchInput } from './search-input';
import { FilterButtonDetalle } from './filter-button-detalle';
import NewButton from '@/components/actionbar/new-button';

export function ActionsBarDetalle<TData>({
  table,
  setGrouped,
  grouped,
}: ActionsBarDetalleProps<TData>) {
  return (
    <div className="inline-flex gap-2">
      <SearchInput table={table} />
      <div className="inline-flex gap-2 ml-auto">
        <OptionsMenu table={table} setGrouped={setGrouped} grouped={grouped} />
        <FilterButtonDetalle />
        <NewButton isDetalle />
      </div>
    </div>
  );
}
