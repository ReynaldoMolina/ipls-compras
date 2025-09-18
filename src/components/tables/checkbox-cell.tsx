import { Checkbox } from '../ui/checkbox';
import { CellContext, HeaderContext } from '@tanstack/react-table';

export function CheckBoxCellHeader<TData, TValue>({
  table,
}: HeaderContext<TData, TValue>) {
  const isAllPageSelected = table.getIsAllPageRowsSelected();
  const isSomePageSelected = table.getIsSomePageRowsSelected();

  return (
    <Checkbox
      checked={isAllPageSelected || (isSomePageSelected && 'indeterminate')}
      onCheckedChange={(value) => {
        if (isSomePageSelected && !isAllPageSelected) {
          table.toggleAllPageRowsSelected(false);
        } else {
          table.toggleAllPageRowsSelected(!!value);
        }
      }}
      aria-label="Seleccionar todo"
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
