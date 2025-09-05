'use client';

import z from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormControl } from './ui/form';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

interface DatePickerProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

export function DatePicker<T extends FieldValues>({
  field,
}: DatePickerProps<T>) {
  const selectedDate =
    typeof field.value === 'string' && field.value
      ? parse(field.value, 'yyyy-MM-dd', new Date())
      : undefined;

  function handleSelect(date: Date | undefined) {
    field.onChange(date ? format(date, 'yyyy-MM-dd') : null);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              'w-full pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            <span className="text-xs">
              {selectedDate
                ? format(selectedDate, 'dd/MMM/yyyy', { locale: es })
                : 'Selecciona una fecha'}
            </span>
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
