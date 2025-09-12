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
  VisibilityState,
} from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
import { Input } from '../ui/input';
import { Delete, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { SolicitudDetalle } from '@/types/types';
import { TableNewRow, TableOptions } from './actions';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
}

export function DataTableDetalle<TData, TValue>({
  columns,
  initialData,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(() => [...initialData]);
  const [originalData, setOriginalData] = useState(() => [...initialData]);
  const [editedRows, setEditedRows] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) =>
              index === rowIndex ? (data[rowIndex] as TData) : row
            )
          );
        }
      },
      addRow: (newRow: SolicitudDetalle) => {
        const setFunc = (old: SolicitudDetalle[]) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        const setFilterFunc = (old: SolicitudDetalle[]) =>
          old.filter((_row, index) => !selectedRows.includes(index));
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const column = table.getColumn('producto_servicio');
  const searchText = (column?.getFilterValue() as string) ?? '';

  return (
    <>
      <div className="flex gap-3 justify-between items-center">
        <div className="flex items-center relative w-full max-w-xs">
          <Search className="absolute left-2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar"
            className="px-8 text-xs md:text-xs"
            value={
              (table
                .getColumn('producto_servicio')
                ?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table
                .getColumn('producto_servicio')
                ?.setFilterValue(event.target.value)
            }
          />
          {searchText.length > 0 && (
            <Delete
              className="absolute right-2 size-6 text-muted-foreground p-1 cursor-pointer"
              onClick={() =>
                table.getColumn('producto_servicio')?.setFilterValue('')
              }
            />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columnas</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-1">
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
        <TableFooter>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id} className="border-double border-t-3">
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
      </Table>

      <TableNewRow table={table} />
      <TableOptions table={table} />
      {/* <pre className="text-[10px]">{JSON.stringify(data[3], null, '\t')}</pre> */}
    </>
  );
}
