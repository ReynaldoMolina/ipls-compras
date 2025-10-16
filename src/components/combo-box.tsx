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
import { SelectOptions } from '@/types/types';

interface ComboBoxProps {
  options: SelectOptions[];
  value: string;
  disabled?: boolean;
  onChange: (value: number | string) => void;
  onParamUpdate?: (value: string) => void;
  outPutType: 'number' | 'string';
}

export function ComboBox({
  options,
  value,
  disabled = false,
  onChange,
  onParamUpdate,
  outPutType,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    // add modal={true} to allow scroll inside modal
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            className={cn(
              'w-full justify-between text-sm font-normal truncate overflow-ellipsis',
              !value && 'text-muted-foreground'
            )}
          >
            {value
              ? options.find((option) => option.value === String(value))?.label
              : 'Selecciona una opción'}
            <ChevronsUpDown className="opacity-50 ml-auto" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command className="max-h-50">
          <CommandInput placeholder="Buscar..." className="h-9" />
          <CommandList>
            <CommandEmpty>No hay resultados</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    onChange(
                      outPutType === 'number'
                        ? Number(option.value)
                        : option.value
                    );
                    if (onParamUpdate) onParamUpdate(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      option.value === String(value)
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
