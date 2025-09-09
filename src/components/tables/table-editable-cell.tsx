'use client';

import { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import InlineEdit from './inline-edit';
import InlineComboBox from './inline-combobox';
import InlineSelectTable from './inline-select';

export function EditableCell<TData, TValue>({
  getValue,
  row,
  column,
  table,
}: CellContext<TData, TValue>) {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const type = columnMeta?.type;
  const [value, setValue] = useState<string | number>(
    initialValue as unknown as string | number
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function onSave() {
    tableMeta?.updateData?.(row.index, column.id, value);
  }

  function onSelectChange(newValue: string | number) {
    setValue(newValue);
    tableMeta?.updateData?.(row.index, column.id, newValue);
  }

  if (type === 'number:integer' || type === 'number:float')
    return (
      <InlineEdit
        value={value}
        onSave={onSave}
        type={type === 'number:integer' ? 'integer' : 'float'}
      />
    );

  if (type === 'combobox')
    return (
      <InlineComboBox
        data={columnMeta?.options ?? []}
        value={value}
        onChange={onSelectChange}
      />
    );

  if (type === 'select')
    return (
      <InlineSelectTable
        data={columnMeta?.options ?? []}
        value={value}
        onChange={onSelectChange}
      />
    );

  return <InlineEdit value={value} onSave={onSave} type="text" />;
}
