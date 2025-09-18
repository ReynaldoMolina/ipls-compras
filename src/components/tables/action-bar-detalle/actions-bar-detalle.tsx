import { ActionsBarDetalleProps } from '@/types/types';
import { DetalleForm } from './detalle-form';
import { OptionsButton } from './options-button';
import { SearchInput } from './search-input';
import { FilterButtonDetalle } from './filter-button-detalle';

export function ActionsBarDetalle<TData>({
  idSolicitud,
  column,
  selectOptions,
}: ActionsBarDetalleProps<TData>) {
  return (
    <div className="inline-flex gap-2">
      <SearchInput column={column} />
      <div className="inline-flex gap-2 ml-auto">
        <OptionsButton />
        <FilterButtonDetalle />
        <DetalleForm
          action="create"
          idSolicitud={idSolicitud}
          selectOptions={selectOptions}
        />
      </div>
    </div>
  );
}
