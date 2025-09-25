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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useState } from 'react';
import { ActionsBarDetalle } from '../action-bar-detalle/actions-bar-detalle';
import { DetalleSelectOptions } from '@/types/types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData?: TData[];
  selectOptions?: DetalleSelectOptions;
  id_solicitud: number;
}

export function DataTableOrdenDetalle<TData, TValue>({
  columns,
  tableData,
  selectOptions,
  id_solicitud,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(tableData || []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [grouped, setGrouped] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    meta: {
      selectOptions,
      id_solicitud,
      setGrouped,
      grouped,
    },
  });

  return (
    <>
      <ActionsBarDetalle table={table} tableName="orden" allowNew={false} />

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

        {table.getRowModel().rows.length === 0 ? (
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay resultados
              </TableCell>
            </TableRow>
          </TableBody>
        ) : grouped ? (
          // Grouped by categoria
          <>
            {Array.from(
              new Set(
                table
                  .getRowModel()
                  .rows.map((row) => row.original.categoria ?? 'Sin categoría')
              )
            ).map((categoria) => {
              const rows = table
                .getRowModel()
                .rows.filter(
                  (row) =>
                    (row.original.categoria ?? 'Sin categoría') === categoria
                );

              return (
                <TableBody key={categoria}>
                  {/* Category header */}
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableCell
                      colSpan={columns.length}
                      className="font-semibold text-left"
                    >
                      {categoria}
                    </TableCell>
                  </TableRow>

                  {/* Rows in this category */}
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              );
            })}
          </>
        ) : (
          // Flat rows
          <TableBody>
            {table.getRowModel().rows.map((row) => (
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
            ))}
          </TableBody>
        )}

        {table.getRowModel().rows.length > 0 && (
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow
                key={footerGroup.id}
                className="border-double border-t-3"
              >
                {footerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        )}
      </Table>
    </>
  );
}
