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
  id_solicitud: number;
  table: Table<TData>;
  disabled?: boolean;
}

export function AddToOrdenSubMenu<TData extends SolicitudDetalleTable>({
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
          <AddToNewOrdenModal id_solicitud={id_solicitud} table={table} />
          <OrdenExistingFormModal table={table} />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
