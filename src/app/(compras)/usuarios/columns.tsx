'use client';

import { EditLink } from '@/components/tables/edit-link';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import TableBool from '@/components/tables/bool-cell';
import DefaultCell from '@/components/tables/default-cell';
import { Usuario } from '@/types/types';
import TableId from '@/components/tables/id-cell';

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: TableId,
  },
  {
    id: 'nombre',
    header: ({ column }) => <SortButton column={column} label="Nombre" />,
    accessorFn: (row) => `${row.nombre ?? ''} ${row.apellido ?? ''}`.trim(),
    cell: ({ row }) => (
      <EditLink
        href={`/usuarios/${row.original.id}/editar`}
        label={
          `${row.original.nombre ?? ''} ${row.original.apellido ?? ''}`.trim() ||
          'Sin nombre'
        }
      />
    ),
    sortingFn: 'alphanumeric',
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
