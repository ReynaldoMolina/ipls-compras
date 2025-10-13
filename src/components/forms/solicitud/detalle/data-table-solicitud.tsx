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

import { useEffect, useState } from 'react';
import { FormSelectOptions, SolicitudDetalleTable } from '@/types/types';
import { ActionsBarDetalle } from './action-bar/action-bar-detalle';

interface DataTableProps<TData extends SolicitudDetalleTable, TValue, TModal> {
  columns: ColumnDef<TData, TValue>[];
  tableData?: TData[];
  tableDataModal?: TModal[];
  selectOptions?: FormSelectOptions;
  id_solicitud: number;
  id_presupuesto: number | null;
}

export function DataTableSolicitud<
  TData extends SolicitudDetalleTable,
  TValue,
  TModal,
>({
  columns,
  tableData,
  tableDataModal,
  selectOptions,
  id_solicitud,
  id_presupuesto,
}: DataTableProps<TData, TValue, TModal>) {
  const [data, setData] = useState(tableData || []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    setData(tableData || []);
  }, [tableData]);

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
      tableDataModal,
    },
  });

  return (
    <>
      <ActionsBarDetalle table={table} id_presupuesto={id_presupuesto} />

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

        {table.getRowModel().rows.length === 0 ? (
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay resultados.
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  const size = cell.column.getSize();
                  const maxSize = cell.column.columnDef.maxSize;

                  return (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: size !== 150 ? cell.column.getSize() : undefined,
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
