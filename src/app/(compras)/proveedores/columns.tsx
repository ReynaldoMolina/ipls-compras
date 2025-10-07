'use client';

import { DateStatusCell } from '@/components/tables/date-status-cell';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import { EditCell, GoToListCell } from '@/components/tables/edit-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { Proveedores } from '@/types/types';

export const columns: ColumnDef<Proveedores>[] = [
  {
    id: 'edit',
    header: 'Editar',
    cell: ({ row }) => {
      return <EditCell href={`/proveedores/${row.original.id}`} />;
    },
    size: 50,
  },
  {
    accessorKey: 'nombre_comercial',
    header: ({ column }) => (
      <SortButton column={column} label="Nombre comercial" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'solvencia',
    header: ({ column }) => <SortButton column={column} label="Solvencia" />,
    cell: ({ row }) => (
      <DateStatusCell
        date={row.original.solvencia}
        id_proveedor={row.original.id}
      />
    ),
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
