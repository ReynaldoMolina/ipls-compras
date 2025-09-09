import { useState } from 'react';
import { cn } from '@/lib/utils';
import { SelectOptions } from '@/types/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

export default function ComboBoxTable({
  data,
  value,
  onChange,
}: {
  data: SelectOptions[];
  value: string | number;
  onChange: (val: string | number) => void;
}) {
  const [open, setOpen] = useState(true);
  const selectedOption = data.find((el) => el.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal h-6 px-1 rounded-md text-muted-foreground"
        >
          {selectedOption ? selectedOption.label : 'Selecciona una opción'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command className="max-h-50">
          <CommandInput placeholder="Buscar" className="h-9" />
          <CommandList>
            <CommandEmpty>No hay resultados</CommandEmpty>
            <CommandGroup>
              {data.map((element) => (
                <CommandItem
                  key={element.value}
                  value={element.label}
                  onSelect={() => {
                    onChange(element.value);
                    setOpen(false);
                  }}
                >
                  {element.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === element.value ? 'opacity-100' : 'opacity-0'
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
