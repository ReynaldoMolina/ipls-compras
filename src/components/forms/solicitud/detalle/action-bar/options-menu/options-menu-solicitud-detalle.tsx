import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { DeleteButton } from '@/components/delete-button';
import { toast } from 'sonner';
import { SolicitudDetalleTable, ServerActionState } from '@/types/types';
import { stateDefault } from '@/server-actions/statusMessages';
import { AddToOrdenSubMenu } from '../submenus';
import { deleteSolicitudDetalleByIds } from '@/server-actions/solicitud-detalle';
import { Can } from '@casl/react';
import { useUser } from '@/hooks/use-user';

interface OptionsMenuSolicitudDetalleProps<
  TData extends SolicitudDetalleTable,
> {
  table: Table<TData>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function OptionsMenuSolicitudDetalle<
  TData extends SolicitudDetalleTable,
>({ table, setOpen }: OptionsMenuSolicitudDetalleProps<TData>) {
  const router = useRouter();

  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
  const selectedRowsIds = selectedRows.map((r) => r.id || 0);
  const rowsEmpty = selectedRowsIds.length <= 0;

  async function handleDelete() {
    if (rowsEmpty) return;

    let state: ServerActionState = stateDefault;

    try {
      state = await deleteSolicitudDetalleByIds(selectedRowsIds);

      table.toggleAllPageRowsSelected(false);
      router.refresh();
      toast.success(state?.title, {
        description: state?.description,
      });
    } catch (error) {
      console.error(error);
      toast.success(state?.title, {
        description: state?.description,
      });
    }
  }

  const { userPermissions } = useUser();

  return (
    <>
      <DropdownMenuGroup>
        <Can I="create" a="Orden" ability={userPermissions}>
          <AddToOrdenSubMenu table={table} disabled={rowsEmpty} />
          <DropdownMenuSeparator />
        </Can>
        <DropdownMenuItem disabled={rowsEmpty} onClick={handleDelete} asChild>
          <DeleteButton
            setOpen={setOpen}
            count={selectedRowsIds.length}
            handleDelete={handleDelete}
            disabled={rowsEmpty}
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}
