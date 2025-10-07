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

import { Dispatch, useState } from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { addToExistingOrdenDetalleBySelectedIds } from '@/server-actions/orden-detalle';
import { OrdenesModal } from '@/types/types';

interface DataTableProps<TData extends OrdenesModal, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
  selectedRowsIds: number[];
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function DataTableOrdenesModal<TData extends OrdenesModal, TValue>({
  columns,
  tableData,
  selectedRowsIds,
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

  const selectedOrden = table.getSelectedRowModel().rows.map((r) => r.original);

  function handleAdd() {
    addToExistingOrdenDetalleBySelectedIds(selectedRowsIds, selectedOrden[0]);
  }

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
                No hay resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DialogFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setOpen(false)}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={handleAdd}
          disabled={selectedOrden[0] === undefined}
        >
          Agregar
        </Button>
      </DialogFooter>
    </>
  );
}
