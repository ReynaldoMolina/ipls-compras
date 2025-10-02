'use client';

import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import { BoolCell } from '@/components/tables/bool-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { UsuarioTable } from '@/types/types';
import { EditCell } from '@/components/tables/edit-cell';

export const columns: ColumnDef<UsuarioTable>[] = [
  {
    id: 'actions',
    header: 'Edit',
    cell: ({ row }) => <EditCell href={`/usuarios/${row.original.id}`} />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column} label="Nombre" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortButton column={column} label="Correo" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <SortButton column={column} label="Rol" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'activo',
    header: ({ column }) => <SortButton column={column} label="Estado" />,
    cell: ({ cell }) => <BoolCell value={cell.getValue() as boolean | null} />,
  },
];
