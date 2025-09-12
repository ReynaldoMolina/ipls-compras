'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormControl } from './ui/form';
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import z from 'zod';
import { providerSchema } from '@/validation-schemas';
import { useUpdateUrlParams } from './forms/elements/update-params';

interface ComboBoxProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  data: { value: number; label: string }[];
  form: UseFormReturn<z.infer<typeof providerSchema>>;
  updateParams?: boolean;
}

export function ComboBox<T extends FieldValues>({
  field,
  data,
  form,
  updateParams = false,
}: ComboBoxProps<T>) {
  const setUrlParam = useUpdateUrlParams();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between text-xs font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value
              ? data.find((element) => element.value === Number(field.value))
                  ?.label
              : 'Selecciona una opción'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="max-h-50">
          <CommandInput placeholder="Buscar..." className="h-9" />
          <CommandList>
            <CommandEmpty>No hay resultados</CommandEmpty>
            <CommandGroup>
              {data.map((element) => (
                <CommandItem
                  key={element.value}
                  value={element.label}
                  onSelect={() => {
                    form.setValue(field.name, Number(element.value));
                    if (updateParams)
                      setUrlParam('sector', String(element.value));
                  }}
                >
                  {element.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      element.value === field.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
