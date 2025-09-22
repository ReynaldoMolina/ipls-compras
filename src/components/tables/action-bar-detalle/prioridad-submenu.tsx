import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { SelectOptions } from '@/types/types';

interface PrioridadSubMenuProps {
  options: SelectOptions[];
  handleChange: (value: string) => void;
  disabled: boolean;
}

export function PrioridadSubMenu({
  options,
  handleChange,
  disabled,
}: PrioridadSubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        disabled={disabled}
        className={disabled ? 'text-muted-foreground' : ''}
      >
        Prioridad
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {options?.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleChange(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
