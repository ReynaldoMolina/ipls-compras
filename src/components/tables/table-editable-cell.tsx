import { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import { Input } from '../ui/input';

export default function TableEditableCell<TData, TValue>({
  getValue,
  row,
  column,
  table,
}: CellContext<TData, TValue>) {
  const initialValue = getValue();
  const [value, setValue] = useState<string | number>(
    initialValue as unknown as string | number
  );

  const type = column.columnDef.meta?.type || 'text';

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function onBlur() {
    table.options.meta?.updateData?.(row.index, column.id, value);
  }

  return (
    <Input
      type={type}
      value={String(value ?? '')}
      name={String(getValue())}
      onChange={(e) =>
        setValue(type === 'number' ? e.target.valueAsNumber : e.target.value)
      }
      onBlur={onBlur}
      size={String(value ?? '').length || 1}
    />
  );
}
