'use client';

import { TableEdit } from '@/components/tables/table-edit';
import TableDate from '@/components/tables/table-date';
import Solvency from '@/components/tables/solvencia-state';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import DefaultCell from '@/components/tables/default-cell';
import { Solvencia } from '@/types/types';
import TableId from '@/components/tables/table-id';

export const columns: ColumnDef<Solvencia>[] = [
  {
    id: 'actions',
    header: 'Editar',
    cell: ({ row }) => (
      <TableEdit href={`solvencias/${row.original.id}/editar`} />
    ),
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: TableId,
  },
  {
    accessorKey: 'verificado',
    header: ({ column }) => {
      return <SortButton column={column} label="Verificado" />;
    },
    cell: TableDate,
  },
  {
    accessorKey: 'recibido',
    header: ({ column }) => <SortButton column={column} label="Recibido" />,
    cell: TableDate,
  },
  {
    accessorKey: 'emitida',
    header: ({ column }) => <SortButton column={column} label="Emitida" />,
    cell: TableDate,
  },
  {
    accessorKey: 'vence',
    header: ({ column }) => <SortButton column={column} label="Vence" />,
    cell: ({ row }) => <Solvency date={row.original.vence} />,
  },
  {
    accessorKey: 'url',
    header: ({ column }) => <SortButton column={column} label="Archivo" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'usuario',
    header: ({ column }) => {
      return <SortButton column={column} label="Verificado por" />;
    },
    cell: DefaultCell,
  },
];
