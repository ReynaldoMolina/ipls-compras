'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { OptionsMenuCombobox } from './options-menu-combobox';
import { prioridad } from '@/components/actionbar/filter/filter-states-data';
import { PrioridadSubMenu } from './prioridad-submenu';
import {
  deleteSolicitudDetalleByIds,
  SolicitudDetalleColumn,
  updateSolicitudDetalleColumnByIds,
} from '@/lib/actions/solicitudes-detalle';
import FormDelete from '@/components/actionbar/delete-button';
import { usePathname, useRouter } from 'next/navigation';

export function OptionsMenu<TData>({ table }: { table: Table<TData> }) {
  const [open, setOpen] = useState(false);
  const { selectOptions, id_solicitud } = table.options.meta ?? {};
  const router = useRouter();
  const pathname = usePathname();

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
      await updateSolicitudDetalleColumnByIds(
        selectedRowsIds,
        column,
        value,
        id_solicitud
      );

      // router.refresh();
      router.replace(pathname);
    } catch (error) {
      console.error(error);
    }
  }

  function handleDelete() {
    deleteSolicitudDetalleByIds(selectedRowsIds, id_solicitud);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col gap-3">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Órden de compra</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={isDisabled}>Crear orden</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuLabel>Editar</DropdownMenuLabel>
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
          <DropdownMenuItem
            disabled={isDisabled}
            onClick={handleDelete}
            asChild
          >
            <FormDelete
              setOpen={setOpen}
              count={selectedRowsIds.length}
              handleDelete={handleDelete}
              disabled={isDisabled}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
