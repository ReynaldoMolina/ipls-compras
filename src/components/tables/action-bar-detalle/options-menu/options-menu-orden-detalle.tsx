import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { GroupBySubMenu } from '../submenus';
import { DeleteButton } from '@/components/delete-button';
import { deleteOrdenDetalleByIds } from '@/server-actions/orden-detalle';
import { useRouter } from 'next/navigation';

interface OptionsMenuOrdenDetalleProps<TData extends { id: number }> {
  table: Table<TData>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function OptionsMenuOrdenDetalle<TData extends { id: number }>({
  table,
  setOpen,
}: OptionsMenuOrdenDetalleProps<TData>) {
  const { grouped, setGrouped, id_orden, id_solicitud } =
    table.options.meta ?? {};

  const router = useRouter();

  const selectedRowsIds = table
    .getSelectedRowModel()
    .rows.map((r) => r.original.id);

  const isDisabled = selectedRowsIds.length <= 0;

  function handleDelete() {
    deleteOrdenDetalleByIds(selectedRowsIds, id_orden, id_solicitud);
    router.refresh();
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
