'use client';

import { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import ComboBoxTable from './combobox-table';
import { SelectTable } from './select-cell';
import { Input } from '../ui/input';
import { formatter } from './number-cell';

const alignment = {
  text: 'text-left',
  integer: 'text-center',
  float: 'text-right pr-1',
};

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
  const isEditing = tableMeta?.editedRows?.[row.id];
  const [value, setValue] = useState<string | number>(
    initialValue as unknown as string | number
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function onSave(newValue: string | number) {
    setValue(newValue);
    tableMeta?.updateData?.(row.index, column.id, newValue);
  }

  function onSelectChange(newValue: string | number) {
    setValue(newValue);
    tableMeta?.updateData?.(row.index, column.id, newValue);
  }

  if (type === 'integer' || type === 'float')
    return (
      <InlineEdit
        value={value}
        onSave={onSave}
        type={type}
        isEditing={isEditing ? isEditing : false}
        required={columnMeta?.required}
      />
    );

  if (type === 'combobox')
    return (
      <ComboBoxTable
        data={columnMeta?.options ?? []}
        value={value}
        onChange={onSelectChange}
        isEditing={isEditing ? isEditing : false}
      />
    );

  if (type === 'select')
    return (
      <SelectTable
        data={columnMeta?.options ?? []}
        value={value}
        onChange={onSelectChange}
        isEditing={isEditing ? isEditing : false}
      />
    );

  return (
    <InlineEdit
      value={value}
      onSave={onSave}
      type="text"
      isEditing={isEditing ? isEditing : false}
      required={columnMeta?.required}
    />
  );
}

interface InlineEditProps {
  value: string | number;
  onSave: (newValue: string | number) => void;
  type: 'text' | 'integer' | 'float';
  isEditing: boolean;
  required?: boolean;
}

function InlineEdit({
  value,
  onSave,
  type = 'text',
  isEditing,
  required = false,
}: InlineEditProps) {
  const [currentValue, setCurrentValue] = useState(value);

  function handleBlur() {
    onSave(currentValue);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setCurrentValue(value); // cancel changes
    }
  }

  if (!isEditing)
    return (
      <span className={`${alignment[type]} block w-full whitespace-nowrap`}>
        {type === 'float' &&
        typeof currentValue === 'number' &&
        currentValue !== 0
          ? formatter.format(currentValue ?? 0)
          : currentValue !== 0
            ? currentValue
            : ''}
      </span>
    );

  return (
    <Input
      type={type === 'text' ? 'text' : 'number'}
      value={currentValue}
      onChange={(e) =>
        setCurrentValue(
          type === 'text' ? e.target.value : e.target.valueAsNumber
        )
      }
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${alignment[type]} w-full h-6 px-1 rounded invalid:border-destructive/70 border`}
      required={required}
    />
  );
}
