'use client';

import { TableEdit } from '@/components/tables/table-edit';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import TableBool from '@/components/tables/table-bool';
import DefaultCell from '@/components/tables/default-cell';
import { Usuario } from '@/types/types';
import TableId from '@/components/tables/table-id';

export const columns: ColumnDef<Usuario>[] = [
  {
    id: 'actions',
    header: 'Editar',
    cell: ({ row }) => (
      <TableEdit href={`/usuarios/${row.original.id}/editar`} />
    ),
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: TableId,
  },
  {
    accessorKey: 'nombre',
    header: ({ column }) => <SortButton column={column} label="Nombre" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'apellido',
    header: ({ column }) => <SortButton column={column} label="Apellido" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'correo',
    header: ({ column }) => <SortButton column={column} label="Correo" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'rol',
    header: ({ column }) => <SortButton column={column} label="Rol" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'activo',
    header: ({ column }) => <SortButton column={column} label="Estado" />,
    cell: ({ cell }) => <TableBool value={cell.getValue() as boolean | null} />,
  },
];
