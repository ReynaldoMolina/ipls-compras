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
}: {
  data: SelectOptions[];
  value: string | number;
  onChange: (val: string | number) => void;
}) {
  return (
    <Select value={value ? String(value) : undefined} onValueChange={onChange}>
      <SelectTrigger className="w-full h-6">
        <SelectValue placeholder="Selecciona una opción" />
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
