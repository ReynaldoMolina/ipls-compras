import {
  DropdownMenuCheckboxItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { AddToNewSolicitudModal } from '../../add-to-new-solicitud';
import { PresupuestoDetalleTable } from '@/types/types';
import { AddToExistingSolicitudModal } from '../../add-to-existing-solicitud';

interface GroupBySubMenuProps {
  grouped: boolean;
  setGrouped: Dispatch<SetStateAction<boolean>>;
}

export function GroupBySubMenu({ grouped, setGrouped }: GroupBySubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Agrupar por</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuCheckboxItem
            checked={grouped}
            onCheckedChange={setGrouped}
          >
            Categoría
          </DropdownMenuCheckboxItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

interface AddToSolicitudSubMenuProps<TData extends PresupuestoDetalleTable> {
  table: Table<TData>;
  disabled?: boolean;
}

export function AddToSolicitudSubMenu<TData extends PresupuestoDetalleTable>({
  table,
  disabled,
}: AddToSolicitudSubMenuProps<TData>) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger
        disabled={disabled}
        className={disabled ? 'text-muted-foreground' : ''}
      >
        Agregar a solicitud
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <AddToNewSolicitudModal table={table} />
          <AddToExistingSolicitudModal table={table} />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
