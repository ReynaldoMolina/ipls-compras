import { SearchInput } from '@/components/tables/action-bar-detalle/search-input';
import { Table } from '@tanstack/react-table';
import { PresupuestoDetalleModal } from '@/types/types';
interface ActionsBarDetalleProps<TData extends PresupuestoDetalleModal> {
  table: Table<TData>;
}

export function ActionsBarDetalle<TData extends PresupuestoDetalleModal>({
  table,
}: ActionsBarDetalleProps<TData>) {
  return (
    <div className="inline-flex gap-2 w-full">
      <SearchInput table={table} />
    </div>
  );
}
