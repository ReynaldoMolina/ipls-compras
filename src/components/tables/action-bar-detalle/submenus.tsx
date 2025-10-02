import { OrdenExistingFormModal } from '@/components/forms/ordenes-add-to-existing';
import { OrdenNewFormModal } from '@/components/forms/ordenes-add-to-new';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { SelectOptions } from '@/types/types';
import { Table } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

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

interface GroupBySubMenuProps {
  grouped: boolean;
  setGrouped: Dispatch<SetStateAction<boolean>>;
}

export function GroupBySubMenu({ grouped, setGrouped }: GroupBySubMenuProps) {
  return (
    // <DropdownMenuSub>
    //   <DropdownMenuSubTrigger>Agrupar por</DropdownMenuSubTrigger>
    //   <DropdownMenuPortal>
    //     <DropdownMenuSubContent>
    <DropdownMenuCheckboxItem checked={grouped} onCheckedChange={setGrouped}>
      Agrupar por categoría
    </DropdownMenuCheckboxItem>
    //     </DropdownMenuSubContent>
    //   </DropdownMenuPortal>
    // </DropdownMenuSub>
  );
}

interface AddToOrderSubMenuProps<TData> {
  id_solicitud: number;
  table: Table<TData>;
  disabled?: boolean;
}

export function AddToOrderSubMenu<TData>({
  id_solicitud,
  table,
  disabled,
}: AddToOrderSubMenuProps<TData>) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        disabled={disabled}
        className={disabled ? 'text-muted-foreground' : ''}
      >
        Agregar a orden de compra
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <OrdenNewFormModal id_solicitud={id_solicitud} table={table} />
          <OrdenExistingFormModal table={table} />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
