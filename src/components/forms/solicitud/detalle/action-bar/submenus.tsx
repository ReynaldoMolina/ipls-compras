import { OrdenExistingFormModal } from '@/components/forms/ordenes-add-to-existing';
import { OrdenNewFormModal } from '@/components/forms/ordenes-add-to-new';
import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';

interface AddToOrdenSubMenuProps<TData extends { id: number }> {
  id_solicitud: number;
  table: Table<TData>;
  disabled?: boolean;
}

export function AddToOrdenSubMenu<TData extends { id: number }>({
  id_solicitud,
  table,
  disabled,
}: AddToOrdenSubMenuProps<TData>) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        disabled={disabled}
        className={disabled ? 'text-muted-foreground' : ''}
      >
        Agregar a orden
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
