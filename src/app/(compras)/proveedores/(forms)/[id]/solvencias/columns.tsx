'use client';

import SortButton from '@/components/tables/sort-button';
import TableCell from '@/components/tables/table-cell';
import { ColumnDef } from '@tanstack/react-table';

export interface Solvencias {
  id: number;
  emitida: string;
  vence: string;
  verificado: string | undefined;
  recibido: string | undefined;
  url: string | undefined;
}

export const columns: ColumnDef<Solvencias>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Id" />;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="center">{row.original.id}</TableCell>;
    },
  },
  {
    accessorKey: 'emitida',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Emitida" />;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="center">{row.original.id}</TableCell>;
    },
  },
];
