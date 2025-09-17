'use client';

import DateStatus from '@/components/tables/date-status-cell';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import { EditCell } from '@/components/tables/edit-cell';
import DefaultCell from '@/components/tables/default-cell';
import { Proveedores } from '@/types/types';
import TableId from '@/components/tables/id-cell';

export const columns: ColumnDef<Proveedores>[] = [
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => <EditCell href={`/proveedores/${row.original.id}`} />,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: TableId,
  },
  {
    accessorKey: 'solvencia',
    header: ({ column }) => <SortButton column={column} label="Solvencia" />,
    cell: ({ row }) => <DateStatus date={row.original.solvencia} />,
  },
  {
    accessorKey: 'nombre_comercial',
    header: ({ column }) => (
      <SortButton column={column} label="Nombre comercial" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'ruc',
    header: ({ column }) => <SortButton column={column} label="RUC" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'telefono',
    header: ({ column }) => <SortButton column={column} label="Teléfono" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'departamento',
    header: ({ column }) => <SortButton column={column} label="Departamento" />,
    cell: DefaultCell,
  },
];
