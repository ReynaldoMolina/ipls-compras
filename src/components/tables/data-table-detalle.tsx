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
import { Input } from '../ui/input';
import { Delete, Save, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { TableNewRow, TableOptions } from './actions';
import { saveSolicitudesDetalle } from '@/lib/actions/solicitudes-detalle';

interface DataTableProps<TData, TValue> {
  idSolicitud: number;
  columns: ColumnDef<TData, TValue>[];
  initialData?: TData[];
}

export function DataTableDetalle<TData, TValue>({
  idSolicitud,
  columns,
  initialData,
}: DataTableProps<TData, TValue>) {
  // data
  const [data, setData] = useState(initialData || []);
  const [newRows, setNewRows] = useState<TData[]>([]);
  const [editedRows, setEditedRows] = useState<TData[]>([]);
  const [deletedRows, setDeletedRows] = useState<TData[]>([]);

  // table actions
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const addRow = (newRow: TData) => {
    setData((prev) => [...prev, newRow]);
    setNewRows((prev) => [...prev, newRow]);
  };

  const updateRow = (
    rowIndex: number,
    columnId: keyof TData,
    value: unknown
  ) => {
    setData((prev) =>
      prev.map((row, idx) =>
        idx === rowIndex ? { ...row, [columnId]: value } : row
      )
    );

    const row = data[rowIndex];

    if (row?.id) {
      // existing row → mark as edited
      setEditedRows((prev) => {
        const already = prev.find((r) => r.id === row.id);
        if (already) {
          return prev.map((r) =>
            r.id === row.id ? { ...r, [columnId]: value } : r
          );
        }
        return [...prev, { ...row, [columnId]: value }];
      });
    } else {
      // if it's new, it's already tracked in newRows
      setNewRows((prev) =>
        prev.map((r, idx) =>
          data.indexOf(r) === rowIndex ? { ...r, [columnId]: value } : r
        )
      );
    }
  };

  const deleteRows = (rows: TData[]) => {
    setData((prev) => prev.filter((r) => !rows.includes(r)));

    const toDeleteNew: TData[] = [];
    const toDeleteExisting: TData[] = [];

    for (const row of rows) {
      if (!row.id) {
        // it was new → remove from newRows
        toDeleteNew.push(row);
      } else {
        // existing → track as deleted
        toDeleteExisting.push(row);
      }
    }

    setNewRows((prev) => prev.filter((r) => !toDeleteNew.includes(r)));
    setDeletedRows((prev) => [...prev, ...toDeleteExisting]);
    setEditedRows((prev) =>
      prev.filter((r) => !toDeleteExisting.some((d) => d.id === r.id))
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    meta: {
      newRows,
      editedRows,
      deletedRows,
      setNewRows,
      setEditedRows,
      setDeletedRows,
      addRow,
      updateRow,
      deleteRows,
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  function handleSave() {
    saveSolicitudesDetalle({ newRows, editedRows, deletedRows });
    // console.log(newRows);
    // console.log(editedRows);
    // console.log(deletedRows);
  }

  const column = table.getColumn('producto_servicio');
  const searchText = (column?.getFilterValue() as string) ?? '';

  return (
    <>
      <div className="flex gap-3 justify-between items-center">
        <div className="flex items-center relative w-full max-w-60">
          <Search className="absolute left-2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar"
            className="px-8 text-sm"
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
        <Button onClick={handleSave}>
          <Save />
          <span className="hidden sm:flex">Guardar</span>
        </Button>
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

      <TableNewRow table={table} idSolicitud={idSolicitud} />
      <TableOptions table={table} />
    </>
  );
}
