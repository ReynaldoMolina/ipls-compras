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
import { PresupuestoModal, SolicitudFormType } from '@/types/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

interface DataTableProps<TData extends PresupuestoModal, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
  form: UseFormReturn<SolicitudFormType>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DataTablePresupuestosModal<
  TData extends PresupuestoModal,
  TValue,
>({ columns, tableData, form, setOpen }: DataTableProps<TData, TValue>) {
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

  const [selectedPresupuesto] = table
    .getSelectedRowModel()
    .rows.map((r) => r.original.id);

  function handleSelect() {
    form.setValue('id_presupuesto', selectedPresupuesto ?? 0);
    toast.info(`Se ha seleccionado el presupuesto.`);
    setOpen(false);
  }

  return (
    <>
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

      <DialogFooter className="inline-flex gap-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="button"
          onClick={handleSelect}
          disabled={!selectedPresupuesto}
        >
          Seleccionar
        </Button>
      </DialogFooter>
    </>
  );
}
