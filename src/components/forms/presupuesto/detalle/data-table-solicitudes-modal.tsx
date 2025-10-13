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
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SolicitudDetalleFormType, SolicitudesTableModal } from '@/types/types';
import { addToExistingSolicitudDetalleBySelectedRows } from '@/server-actions/solicitud-detalle';
import { stateDefault } from '@/server-actions/statusMessages';
import { DialogClose } from '@radix-ui/react-dialog';
import { Spinner } from '@/components/ui/spinner';
import { useServerActionFeedback } from '@/server-actions/useServerActionFeedBack';

interface DataTableProps<TData extends SolicitudesTableModal, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
  selectedRows: SolicitudDetalleFormType[];
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function DataTableSolicitudesModal<
  TData extends SolicitudesTableModal,
  TValue,
>({
  columns,
  tableData,
  selectedRows,
  setOpen,
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
    enableMultiRowSelection: false,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const [selectedSolicitud] = table
    .getSelectedRowModel()
    .rows.map((r) => r.original.id);

  const [state, formAction, isPending] = useActionState(
    addToExistingSolicitudDetalleBySelectedRows,
    stateDefault
  );

  function onSubmit() {
    startTransition(() => {
      formAction({
        selectedRows,
        id_solicitud: selectedSolicitud,
      });
    });
  }

  useServerActionFeedback(state, {
    redirectTo: `/solicitudes/${selectedSolicitud}`,
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DialogFooter>
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
          disabled={selectedSolicitud === undefined || isPending}
        >
          {isPending ? (
            <>
              <Spinner />
              Procesando
            </>
          ) : (
            'Guardar'
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
