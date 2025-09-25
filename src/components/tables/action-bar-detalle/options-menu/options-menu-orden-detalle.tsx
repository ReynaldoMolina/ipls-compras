import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { deleteSolicitudDetalleByIds } from '@/server-actions/solicitudes-detalle';
import { Table } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { GroupBySubMenu } from '../submenus';
import DeleteButton from '@/components/actionbar/delete-button';

interface OptionsMenuOrdenDetalleProps<TData> {
  table: Table<TData>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function OptionsMenuOrdenDetalle<TData>({
  table,
  setOpen,
}: OptionsMenuOrdenDetalleProps<TData>) {
  const { id_solicitud, grouped, setGrouped } = table.options.meta ?? {};

  const selectedRowsIds = table
    .getSelectedRowModel()
    .rows.map((r) => r.original.id);

  const isDisabled = selectedRowsIds.length <= 0;

  function handleDelete() {
    // deleteSolicitudDetalleByIds(selectedRowsIds, id_solicitud);
    alert('delete orden detalle test');
  }

  return (
    <>
      <DropdownMenuGroup>
        <GroupBySubMenu grouped={grouped ?? true} setGrouped={setGrouped!} />
      </DropdownMenuGroup>

      <DropdownMenuGroup>
        <DropdownMenuLabel>Modificar seleccionados</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem disabled={isDisabled} onClick={handleDelete} asChild>
          <DeleteButton
            setOpen={setOpen}
            count={selectedRowsIds.length}
            handleDelete={handleDelete}
            disabled={isDisabled}
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}
