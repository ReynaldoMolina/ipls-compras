'use client';

import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import { DateCell } from '@/components/tables/date-cell';
import {
  NumberCellWithValue,
  NumberFloatCell,
} from '@/components/tables/number-cell';
import { OrdenTable } from '@/types/types';
import { IdCell } from '@/components/tables/id-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { sumColumn } from '@/lib/sum-column';
import { EditCell } from '@/components/tables/edit-cell';
import { DefaultCellWrap } from '@/components/tables/default-cell-wrap';

export const columns: ColumnDef<OrdenTable>[] = [
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => {
      return <EditCell href={`/ordenes/${row.original.id}`} />;
    },
    size: 50,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: IdCell,
    size: 40,
  },

  {
    accessorKey: 'entidad_academica',
    header: ({ column }) => (
      <SortButton column={column} label="Carrera / curso / área" />
    ),
    cell: DefaultCellWrap,
    footer: 'Totales',
  },
  {
    accessorKey: 'fecha_creacion',
    header: ({ column }) => (
      <SortButton column={column} label="Fecha creación" />
    ),
    cell: DateCell,
    size: 120,
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => <SortButton column={column} label="Estado" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'subtotal',
    header: ({ column }) => <SortButton column={column} label="Subtotal" />,
    cell: NumberFloatCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'subtotal');
      return <NumberCellWithValue value={total} />;
    },
    size: 140,
  },
];
