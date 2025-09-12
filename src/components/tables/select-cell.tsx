import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectOptions } from '@/types/types';

export function SelectTable({
  data,
  value,
  onChange,
  isEditing,
}: {
  data: SelectOptions[];
  value: string | number;
  onChange: (val: string | number) => void;
  isEditing: boolean;
}) {
  if (!isEditing) return <span className="whitespace-nowrap">{value}</span>;

  return (
    <Select value={value ? String(value) : undefined} onValueChange={onChange}>
      <SelectTrigger className="w-full h-6 px-2 gap-1.5 rounded bg-background">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {data.map((element) => (
          <SelectItem key={element.value} value={String(element.value)}>
            {element.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
