import { ActionsBarDetalleProps } from '@/types/types';
import { OptionsButton } from './options-button';
import { SearchInput } from './search-input';
import { FilterButtonDetalle } from './filter-button-detalle';
import NewButton from '@/components/actionbar/new-button';

export function ActionsBarDetalle<TData>({
  column,
}: ActionsBarDetalleProps<TData>) {
  return (
    <div className="inline-flex gap-2">
      <SearchInput column={column} />
      <div className="inline-flex gap-2 ml-auto">
        <OptionsButton />
        <FilterButtonDetalle />
        <NewButton />
      </div>
    </div>
  );
}
