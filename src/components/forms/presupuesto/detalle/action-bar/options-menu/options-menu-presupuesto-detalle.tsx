import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { deletePresupuestoDetalleByIds } from '@/server-actions/presupuesto-detalle';
import { Table } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { AddToSolicitudSubMenu, GroupBySubMenu } from './submenus';
import { DeleteButton } from '@/components/delete-button';
import { toast } from 'sonner';
import { PresupuestoDetalleTable, ServerActionState } from '@/types/types';
import { stateDefault } from '@/server-actions/statusMessages';
import { useUser } from '@/hooks/use-user';
import { Can } from '@casl/react';

interface OptionsMenuPresupuestoDetalleProps<
  TData extends PresupuestoDetalleTable,
> {
  table: Table<TData>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function OptionsMenuPresupuestoDetalle<
  TData extends PresupuestoDetalleTable,
>({ table, setOpen }: OptionsMenuPresupuestoDetalleProps<TData>) {
  const { grouped, setGrouped } = table.options.meta ?? {};
  const router = useRouter();

  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
  const selectedRowsIds = selectedRows.map((r) => r.id || 0);

  const rowsEmpty = selectedRowsIds.length <= 0;

  async function handleDelete() {
    if (rowsEmpty) return;

    let state: ServerActionState = stateDefault;
    try {
      state = await deletePresupuestoDetalleByIds(selectedRowsIds);

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
        <Can I="create" a="SolicitudDesdePresupuesto" ability={userPermissions}>
          <AddToSolicitudSubMenu table={table} disabled={rowsEmpty} />
        </Can>

        <GroupBySubMenu grouped={grouped ?? true} setGrouped={setGrouped!} />

        <DropdownMenuSeparator />

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
