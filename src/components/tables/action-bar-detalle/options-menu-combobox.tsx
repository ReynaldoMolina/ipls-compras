import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { ComboBoxData } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

interface OptionsMenuComboboxProps {
  options?: ComboBoxData;
  label: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleChange: (value: number) => void;
  disabled: boolean;
}

export function OptionsMenuCombobox({
  options,
  label,
  setOpen,
  handleChange,
  disabled,
}: OptionsMenuComboboxProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        className={disabled ? 'text-muted-foreground' : ''}
        disabled={disabled}
      >
        {label}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="p-0">
        <Command className="max-h-50 w-fit">
          <CommandInput placeholder="Buscar" autoFocus={true} className="h-9" />
          <CommandList>
            <CommandEmpty>No hay resultados</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    setOpen(false);
                    handleChange(Number(option.value));
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
