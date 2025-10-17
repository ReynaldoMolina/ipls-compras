'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Dispatch, startTransition, useActionState, useState } from 'react';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  PresupuestoDetalleModal,
  SolicitudDetalleFormType,
} from '@/types/types';
import { stateDefault } from '@/server-actions/statusMessages';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';
import { Spinner } from '@/components/ui/spinner';
import { addToExistingSolicitudDetalleBySelectedRows } from '@/server-actions/solicitud-detalle';
import { ActionsBarDetalle } from './nuevo/action-bar-detalle';

interface DataTableProps<TData extends PresupuestoDetalleModal, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  id_solicitud: number;
}

export function DataTablePresupuestoDetalleModal<
  TData extends PresupuestoDetalleModal,
  TValue,
>({
  columns,
  tableData,
  setOpen,
  id_solicitud,
}: DataTableProps<TData, TValue>) {
  const [data] = useState(tableData || []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: (row) => {
      return row.original.restante > 0;
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const selectedRows: SolicitudDetalleFormType[] = table
    .getSelectedRowModel()
    .rows.map((row) => {
      const r = row.original;

      return {
        id_solicitud: id_solicitud,
        producto_servicio: null,
        cantidad: r.restante,
        cantidad_bodega: null,
        observacion: null,
        unidad_medida: r.unidad_medida,
        id_presupuesto_detalle: r.id,
      };
    });

  const [state, formAction, isPending] = useActionState(
    addToExistingSolicitudDetalleBySelectedRows,
    stateDefault
  );

  function onSubmit() {
    startTransition(() => {
      formAction({
        selectedRows,
        id_solicitud: id_solicitud,
      });
    });
  }

  useServerActionFeedback(state, {
    refresh: true,
  });

  return (
    <>
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh]">
        <ActionsBarDetalle table={table} />

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const size = header.getSize();
                  const maxSize = header.column.columnDef.maxSize;

                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: size !== 150 ? header.getSize() : undefined,
                        maxWidth: maxSize ? maxSize : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={
                    row.original.restante < 1 ? 'text-muted-foreground' : ''
                  }
                >
                  {row.getVisibleCells().map((cell) => {
                    const size = cell.column.getSize();
                    const maxSize = cell.column.columnDef.maxSize;

                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          width:
                            size !== 150 ? cell.column.getSize() : undefined,
                          maxWidth: maxSize ? maxSize : undefined,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <span className="text-muted-foreground text-xs">
          {`${selectedRows.length} seleccionado${selectedRows.length === 1 ? '.' : 's.'}`}
        </span>
      </div>

      <DialogFooter className="space-x-2">
        <DialogClose asChild>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="button"
          onClick={() => onSubmit()}
          disabled={selectedRows === undefined || isPending}
        >
          {isPending ? (
            <>
              <Spinner />
              Procesando
            </>
          ) : (
            'Agregar'
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
