'use client';

import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import {
  NumberCellWithValue,
  NumberFloatCell,
} from '@/components/tables/number-cell';
import { PresupuestoTable } from '@/types/types';
import { IdCell } from '@/components/tables/id-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { EditCell } from '@/components/tables/edit-cell';
import { sumColumn } from '@/lib/sum-column';

export const columns: ColumnDef<PresupuestoTable>[] = [
  {
    id: 'edit',
    cell: ({ row }) => {
      return <EditCell href={`/presupuesto/${row.original.id}`} />;
    },
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
      <SortButton column={column} label="Carrera / Curso" />
    ),
    cell: DefaultCell,
    footer: 'Totales',
  },
  {
    accessorKey: 'year',
    header: ({ column }) => <SortButton column={column} label="Año" />,
    cell: DefaultCell,
    size: 80,
  },
  {
    accessorKey: 'presupuestado',
    header: ({ column }) => (
      <SortButton column={column} label="Presupuestado" />
    ),
    cell: NumberFloatCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'presupuestado');
      return <NumberCellWithValue value={total} />;
    },
    size: 140,
  },
];
