'use client';

import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import TableDate from '@/components/tables/date-cell';
import { NumberCell } from '@/components/tables/number-cell';
import { Solicitudes } from '@/types/types';
import TableId from '@/components/tables/id-cell';
import DefaultCell from '@/components/tables/default-cell';

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
    cell: DefaultCell,
  },
  {
    accessorKey: 'year',
    header: ({ column }) => <SortButton column={column} label="Año" />,
    cell: DefaultCell,
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
    cell: NumberCell,
  },
  {
    accessorKey: 'asignado',
    header: ({ column }) => <SortButton column={column} label="Asignado" />,
    cell: NumberCell,
  },
  {
    accessorKey: 'restante',
    header: ({ column }) => <SortButton column={column} label="Restante" />,
    cell: NumberCell,
  },
];
