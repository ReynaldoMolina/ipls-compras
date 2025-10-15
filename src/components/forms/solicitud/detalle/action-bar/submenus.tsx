import { OrdenExistingFormModal } from '@/components/forms/solicitud/detalle/add-to-existing-orden';
import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { AddToNewOrdenModal } from '../add-to-new-orden';
import { SolicitudDetalleTable } from '@/types/types';

interface AddToOrdenSubMenuProps<TData extends SolicitudDetalleTable> {
  table: Table<TData>;
  disabled?: boolean;
}

export function AddToOrdenSubMenu<TData extends SolicitudDetalleTable>({
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
          <AddToNewOrdenModal table={table} />
          <OrdenExistingFormModal table={table} />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
