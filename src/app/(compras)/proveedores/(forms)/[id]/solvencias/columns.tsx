'use client';

import { TableLink } from '@/components/tables/table-link';
import TableDate from '@/components/tables/table-date';
import Solvency from '@/components/tables/solvency';
import SortButton from '@/components/tables/sort-button';
import TableCell from '@/components/tables/table-cell';
import { ColumnDef } from '@tanstack/react-table';

export interface Solvencias {
  id: number;
  id_proveedor: number;
  emitida: string | null;
  vence: string | null;
  verificado: string | null;
  recibido: string | null;
  url: string | null;
  usuario: string | null;
}

export const columns: ColumnDef<Solvencias>[] = [
  {
    id: 'actions',
    header: () => {
      return <span className="text-xs">Editar</span>;
    },
    cell: ({ row }) => {
      return <TableLink href={`solvencias/${row.original.id}/editar`} />;
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
    accessorKey: 'verificado',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Verificado" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell>
          <TableDate date={row.original.verificado} />
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'recibido',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Recibido" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell>
          <TableDate date={row.original.recibido} />
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'emitida',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Emitida" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell>
          <TableDate date={row.original.emitida} />
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'vence',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Vence" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell>
          <Solvency date={row.original.vence} />
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'url',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Archivo" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.url}</TableCell>;
    },
  },
  {
    accessorKey: 'usuario',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Verificado por" />;
    },
    cell: ({ row }) => {
      return <TableCell fullWidth={true}>{row.original.usuario}</TableCell>;
    },
  },
];
