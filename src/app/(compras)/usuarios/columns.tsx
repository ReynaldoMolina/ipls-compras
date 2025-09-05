'use client';

import { TableLink } from '@/components/tables/table-link';
import { SortButton } from '@/components/tables/sort-button';
import TableCell from '@/components/tables/table-cell';
import { ColumnDef } from '@tanstack/react-table';
import TableBool from '@/components/tables/table-bool';

export interface Users {
  id: number;
  nombre: string | null;
  apellido: string | null;
  correo: string | null;
  rol: string | null;
  activo: boolean | null;
}

export const columns: ColumnDef<Users>[] = [
  {
    id: 'actions',
    header: () => {
      return <span className="text-xs">Editar</span>;
    },
    cell: ({ row }) => {
      return <TableLink href={`/usuarios/${row.original.id}/editar`} />;
    },
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Id" />;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="center">{row.original.id}</TableCell>;
    },
  },
  {
    accessorKey: 'nombre',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Nombre" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.nombre}</TableCell>;
    },
  },
  {
    accessorKey: 'apellido',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Apellido" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.apellido}</TableCell>;
    },
  },
  {
    accessorKey: 'correo',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Correo" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.correo}</TableCell>;
    },
  },
  {
    accessorKey: 'rol',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Rol" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.rol}</TableCell>;
    },
  },
  {
    accessorKey: 'activo',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Estado" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell>
          <TableBool value={row.original.activo} />
        </TableCell>
      );
    },
  },
];
