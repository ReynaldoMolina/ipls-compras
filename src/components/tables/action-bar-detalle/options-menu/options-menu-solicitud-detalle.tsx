import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  deleteSolicitudDetalleByIds,
  SolicitudDetalleColumn,
  updateSolicitudDetalleColumnByIds,
} from '@/server-actions/solicitudes-detalle';
import { Table } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import {
  AddToOrderSubMenu,
  GroupBySubMenu,
  PrioridadSubMenu,
} from '../submenus';
import { prioridad } from '@/lib/select-options-data';
import { OptionsMenuCombobox } from '../options-menu-combobox';
import { DeleteButton } from '@/components/delete-button';

interface OptionsMenuSolicitudDetalleProps<TData extends { id: number }> {
  table: Table<TData>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function OptionsMenuSolicitudDetalle<TData extends { id: number }>({
  table,
  setOpen,
}: OptionsMenuSolicitudDetalleProps<TData>) {
  const { selectOptions, id_solicitud, grouped, setGrouped } =
    table.options.meta ?? {};
  const router = useRouter();

  const selectedRowsIds = table
    .getSelectedRowModel()
    .rows.map((r) => r.original.id);

  const isDisabled = selectedRowsIds.length <= 0;

  async function handleUpdate(
    column: SolicitudDetalleColumn,
    value: number | string
  ) {
    if (!id_solicitud || selectedRowsIds.length === 0) return;

    try {
      await updateSolicitudDetalleColumnByIds(selectedRowsIds, column, value);
      table.toggleAllPageRowsSelected(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  function handleDelete() {
    deleteSolicitudDetalleByIds(selectedRowsIds, id_solicitud);
    router.refresh();
  }

  return (
    <>
      <DropdownMenuGroup>
        <AddToOrderSubMenu
          id_solicitud={id_solicitud ?? 0}
          table={table}
          disabled={isDisabled}
        />
        <GroupBySubMenu grouped={grouped ?? true} setGrouped={setGrouped!} />
      </DropdownMenuGroup>

      <DropdownMenuGroup>
        <DropdownMenuLabel>Modificar seleccionados</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <OptionsMenuCombobox
          options={selectOptions?.unidadesMedida}
          label="Unidad de medida"
          setOpen={setOpen}
          handleChange={(value) => handleUpdate('id_unidad_medida', value)}
          disabled={isDisabled}
        />
        <PrioridadSubMenu
          options={prioridad}
          handleChange={(value) => handleUpdate('prioridad', value)}
          disabled={isDisabled}
        />
        <OptionsMenuCombobox
          options={selectOptions?.estados}
          label="Estado"
          setOpen={setOpen}
          handleChange={(value) => handleUpdate('id_estado', value)}
          disabled={isDisabled}
        />
        <OptionsMenuCombobox
          options={selectOptions?.categorias}
          label="Categoría"
          setOpen={setOpen}
          handleChange={(value) => handleUpdate('id_categoria', value)}
          disabled={isDisabled}
        />
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
