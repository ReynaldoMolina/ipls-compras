import { Checkbox } from '../ui/checkbox';
import { CellContext, HeaderContext } from '@tanstack/react-table';

export function CheckBoxCellHeader<TData, TValue>({
  table,
}: HeaderContext<TData, TValue>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="rounded"
      title="Seleccionar todo"
    />
  );
}

export function CheckBoxCell<TData, TValue>({
  row,
}: CellContext<TData, TValue>) {
  return (
    <div className="w-full h-full inline-flex justify-center items-center">
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
        aria-label="Select row"
        className="rounded"
        title="Seleccionar"
      />
    </div>
  );
}
