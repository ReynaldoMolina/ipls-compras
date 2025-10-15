'use client';

import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import { SolicitudTable } from '@/types/types';
import { IdCell } from '@/components/tables/id-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { EditCell } from '@/components/tables/edit-cell';
import { DateStatusCell } from '@/components/tables/date-cell';
import { SemestreCell } from '@/components/tables/semestre-cell';

export const columns: ColumnDef<SolicitudTable>[] = [
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => <EditCell href={`/solicitudes/${row.original.id}`} />,
    size: 40,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: IdCell,
    size: 50,
  },
  {
    accessorKey: 'entidad_academica',
    header: ({ column }) => (
      <SortButton column={column} label="Carrera / curso / área" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'fecha_a_utilizar',
    header: ({ column }) => (
      <SortButton column={column} label="Fecha a utilizar" />
    ),
    cell: DateStatusCell,
    size: 80,
  },
  {
    id: 'semestre',
    accessorKey: 'fecha_a_utilizar',
    header: ({ column }) => <SortButton column={column} label="Semestre" />,
    cell: SemestreCell,
    size: 80,
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => <SortButton column={column} label="Estado" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'usuario',
    header: ({ column }) => (
      <SortButton column={column} label="Solicitado por" />
    ),
    cell: DefaultCell,
    size: 200,
  },
];
