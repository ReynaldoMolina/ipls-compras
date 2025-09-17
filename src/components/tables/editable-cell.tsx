'use client';

import { useEffect, useState } from 'react';
import { CellContext } from '@tanstack/react-table';
import ComboBoxCell from './combobox-cell';
import SelectCell from './select-cell';
import { Input } from '../ui/input';
import { formatNumber } from '@/lib/formatters';

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
  const [value, setValue] = useState<string | number>(
    initialValue as unknown as string | number
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function onSave(newValue: string | number) {
    setValue(newValue);
    tableMeta?.updateRow?.(row.index, column.id, newValue);
  }

  function onSelectChange(newValue: string | number) {
    setValue(newValue);
    tableMeta?.updateRow?.(row.index, column.id, newValue);
  }

  if (type === 'integer' || type === 'float')
    return <InlineEdit value={value} onSave={onSave} type={type} />;

  if (type === 'combobox')
    return (
      <ComboBoxCell
        options={columnMeta?.options ?? []}
        value={value}
        onChange={onSelectChange}
      />
    );

  if (type === 'select')
    return (
      <SelectCell
        data={columnMeta?.options ?? []}
        value={value}
        onChange={onSelectChange}
      />
    );

  return <InlineEdit value={value} onSave={onSave} type="text" />;
}

interface InlineEditProps {
  value: string | number;
  onSave: (newValue: string | number) => void;
  type: 'text' | 'integer' | 'float';
  required?: boolean;
}

function InlineEdit({
  value,
  onSave,
  type = 'text',
  required = false,
}: InlineEditProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  function handleBlur() {
    onSave(currentValue);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setCurrentValue(value);
      setIsEditing(false);
    }
  }

  function handleKeyDownEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key.length === 1) {
      setIsEditing(true);
    }
  }

  if (!isEditing)
    return (
      <span
        className={`${alignment[type]} ${currentValue === 0 && 'text-muted-foreground'} block w-full h-6 py-1 whitespace-nowrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded`}
        onClick={() => setIsEditing(true)}
        tabIndex={0}
        onKeyDown={handleKeyDownEnter}
      >
        {type === 'float' &&
        typeof currentValue === 'number' &&
        currentValue !== 0
          ? formatNumber(currentValue ?? 0)
          : currentValue !== 0
            ? currentValue
            : '-'}
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
      autoFocus
      required={required}
    />
  );
}
