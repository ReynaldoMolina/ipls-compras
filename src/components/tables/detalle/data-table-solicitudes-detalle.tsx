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
import { DetalleSelectOptions, SolicitudDetalleTable } from '@/types/types';
import { ActionsBarDetalle } from '../action-bar-detalle/action-bar-detalle';

interface DataTableProps<TData extends SolicitudDetalleTable, TValue, TModal> {
  columns: ColumnDef<TData, TValue>[];
  tableData?: TData[];
  tableDataModal?: TModal[];
  selectOptions?: DetalleSelectOptions;
  id_solicitud: number;
  id_entidad_academica: number;
}

export function DataTableSolicitudesDetalle<
  TData extends SolicitudDetalleTable,
  TValue,
  TModal,
>({
  columns,
  tableData,
  tableDataModal,
  selectOptions,
  id_solicitud,
  id_entidad_academica,
}: DataTableProps<TData, TValue, TModal>) {
  const [data, setData] = useState(tableData || []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [grouped, setGrouped] = useState(false);

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
      id_entidad_academica,
      setGrouped,
      grouped,
      tableDataModal,
    },
  });

  const colorMap: Record<string, string> = {
    1: 'bg-date-due hover:bg-date-due-hover/80 data-[state=selected]:bg-date-due-hover',
    2: 'bg-date-warning hover:bg-date-warning-hover/80 data-[state=selected]:bg-date-warning-hover',
    3: 'bg-date-active hover:bg-date-active-hover/80 data-[state=selected]:bg-date-active-hover',
  };

  return (
    <>
      <ActionsBarDetalle table={table} tableName="solicitud" />

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
                      className={colorMap[String(row.original.id_estado)]}
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
                className={colorMap[String(row.original.id_estado)]}
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
