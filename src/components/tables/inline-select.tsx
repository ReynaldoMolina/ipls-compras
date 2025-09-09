import { useState } from 'react';
import { SelectOptions } from '@/types/types';
import { SelectTable } from './select-table';

export default function InlineSelectTable({
  data,
  value,
  onChange,
}: {
  data: SelectOptions[];
  value: string | number;
  onChange: (val: string | number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const selectedOption = data.find((el) => el.value === value);

  if (!editing) {
    return (
      <span
        className="whitespace-nowrap block w-full py-1 cursor-pointer hover:bg-muted/40 rounded"
        onClick={() => setEditing(true)}
        title="Haz click para editar"
      >
        {selectedOption ? selectedOption.label : ''}
      </span>
    );
  }

  return (
    <SelectTable
      data={data}
      value={value}
      onChange={(val) => {
        onChange(val);
        setEditing(false);
      }}
    />
  );
}
