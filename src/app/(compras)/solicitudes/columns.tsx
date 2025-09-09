'use client';

import { TableEdit } from '@/components/tables/table-edit';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import TableDate from '@/components/tables/table-date';
import { TableNumber } from '@/components/tables/table-number';
import { Solicitudes } from '@/types/types';
import DefaultCell from '@/components/tables/default-cell';
import TableId from '@/components/tables/table-id';

export const columns: ColumnDef<Solicitudes>[] = [
  {
    id: 'edit',
    header: 'Editar',
    cell: ({ row }) => (
      <TableEdit href={`/solicitudes/${row.original.id}/editar`} />
    ),
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: TableId,
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => (
      <SortButton column={column} label="Fecha solicitud" />
    ),
    cell: TableDate,
  },
  {
    accessorKey: 'entidad_academica',
    header: ({ column }) => (
      <SortButton column={column} label="Carrera / curso / área" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'presupuestado',
    header: ({ column }) => (
      <SortButton column={column} label="Presupuestado" />
    ),
    cell: TableNumber,
  },
  {
    accessorKey: 'asignado',
    header: ({ column }) => <SortButton column={column} label="Asignado" />,
    cell: TableNumber,
  },
  {
    accessorKey: 'restante',
    header: ({ column }) => <SortButton column={column} label="Restante" />,
    cell: TableNumber,
  },
];
