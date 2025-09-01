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
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { providerSchema } from '@/validation-schemas';
import { useUpdateUrlParams } from './forms/elements/update-params';

type ProviderFormValues = z.infer<typeof providerSchema>;

interface ComboBoxProps {
  field: ControllerRenderProps<ProviderFormValues, keyof ProviderFormValues>;
  data: { value: number; label: string }[];
  form: UseFormReturn<z.infer<typeof providerSchema>>;
  updateParams?: boolean;
}

export function ComboBox({
  field,
  data,
  form,
  updateParams = false,
}: ComboBoxProps) {
  const setUrlParam = useUpdateUrlParams();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between text-xs',
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
        <Command>
          <CommandInput placeholder="Buscar..." className="h-9 text-xs" />
          <CommandList>
            <CommandEmpty>No hay resultados</CommandEmpty>
            <CommandGroup>
              {data.map((element) => (
                <CommandItem
                  value={element.label}
                  key={element.value}
                  className="text-xs"
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
