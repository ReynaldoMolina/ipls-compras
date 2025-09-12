'use client';

import { EditLink } from '@/components/tables/edit-link';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import TableDate from '@/components/tables/date-cell';
import { TableNumber } from '@/components/tables/number-cell';
import { Solicitudes } from '@/types/types';
import TableId from '@/components/tables/id-cell';

export const columns: ColumnDef<Solicitudes>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: TableId,
  },
  {
    accessorKey: 'entidad_academica',
    header: ({ column }) => (
      <SortButton column={column} label="Carrera / curso / área" />
    ),
    cell: ({ row }) => (
      <EditLink
        href={`/solicitudes/${row.original.id}/editar`}
        label={row.original.entidad_academica ?? 'Sin nombre'}
      />
    ),
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => (
      <SortButton column={column} label="Fecha solicitud" />
    ),
    cell: TableDate,
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
