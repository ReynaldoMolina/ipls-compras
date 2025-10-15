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
import { OrdenDetalleTable, ServerActionState } from '@/types/types';
import { stateDefault } from '@/server-actions/statusMessages';
import { deleteSolicitudDetalleByIds } from '@/server-actions/solicitud-detalle';

interface OptionsMenuOrdenDetalleProps<TData extends OrdenDetalleTable> {
  table: Table<TData>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function OptionsMenuOrdenDetalle<TData extends OrdenDetalleTable>({
  table,
  setOpen,
}: OptionsMenuOrdenDetalleProps<TData>) {
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

  return (
    <>
      <DropdownMenuGroup>
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
