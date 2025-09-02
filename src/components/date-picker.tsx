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
import { solvenciaSchema } from '@/validation-schemas';
import { ControllerRenderProps } from 'react-hook-form';
import { cn } from '@/lib/utils';

type SolvenciaFormValues = z.infer<typeof solvenciaSchema>;

interface DatePickerProps {
  field: ControllerRenderProps<SolvenciaFormValues, keyof SolvenciaFormValues>;
}

export function DatePicker({ field }: DatePickerProps) {
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
            {field.value ? (
              <span className="text-xs">{field.value.toLocaleString()}</span>
            ) : (
              <span className="text-xs">Selecciona una fecha</span>
            )}
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
