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
  isEditing,
}: {
  data: SelectOptions[];
  value: string | number;
  onChange: (val: string | number) => void;
  isEditing: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selectedOption = data.find((el) => el.value === value);

  if (!isEditing)
    return (
      <span className="whitespace-nowrap">
        {selectedOption ? String(selectedOption?.label) : ''}
      </span>
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${selectedOption ? '' : 'text-muted-foreground'} w-full font-normal rounded`}
          size="table"
        >
          {selectedOption ? selectedOption.label : ''}
          <ChevronsUpDown className="opacity-50 ml-auto" />
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
