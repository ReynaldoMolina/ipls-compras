'use client';

import { SolvenciaDialog } from '@/components/forms/dialogs/solvencias';
import TableDate from '@/components/tables/default-date';
import Solvency from '@/components/tables/solvency';
import SortButton from '@/components/tables/sort-button';
import TableCell from '@/components/tables/table-cell';
import { ColumnDef } from '@tanstack/react-table';

export interface Solvencias {
  id: number;
  id_proveedor: number;
  emitida: Date;
  vence: Date;
  verificado: Date | undefined;
  recibido: Date | undefined;
  url: string | undefined;
  usuario: string | undefined;
}

export const columns: ColumnDef<Solvencias>[] = [
  {
    id: 'actions',
    header: () => {
      return <span className="text-xs">Editar</span>;
    },
    cell: ({ row }) => {
      return <SolvenciaDialog id_proveedor={row.original.id_proveedor} />;
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
          <Solvency expirationDate={row.original.vence} />
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
    accessorKey: 'usuario',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Verificado por" />;
    },
    cell: ({ row }) => {
      return <TableCell fullWidth={true}>{row.original.usuario}</TableCell>;
    },
  },
];
