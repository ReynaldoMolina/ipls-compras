'use client';

import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import { OrdenesModal } from '@/types/types';
import TableId from '@/components/tables/id-cell';
import DefaultCell from '@/components/tables/default-cell';
import { CheckBoxCell } from '@/components/tables/checkbox-cell';

export const columns: ColumnDef<OrdenesModal>[] = [
  {
    id: 'select',
    header: '',
    cell: CheckBoxCell,
    enableSorting: false,
  },
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
    accessorKey: 'id_solicitud',
    header: ({ column }) => <SortButton column={column} label="Solicitud" />,
    cell: TableId,
  },
  {
    accessorKey: 'year',
    header: ({ column }) => <SortButton column={column} label="Año" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => <SortButton column={column} label="Estado" />,
    cell: DefaultCell,
  },
];
