'use client';

import { TableLink } from '@/components/tables/table-link';
import { SortButton } from '@/components/tables/sort-button';
import TableCell from '@/components/tables/table-cell';
import { ColumnDef } from '@tanstack/react-table';
import TableDate from '@/components/tables/table-date';
import TableNumber from '@/components/tables/table-number';

export interface Solicitud {
  id: number;
  fecha: string | null;
  tipo: string | null;
  entidad_academica: string | null;
  presupuestado: number | null;
  asignado: number | null;
  restante: number | null;
}

export const columns: ColumnDef<Solicitud>[] = [
  {
    id: 'actions',
    header: () => {
      return <span className="text-xs">Editar</span>;
    },
    cell: ({ row }) => {
      return <TableLink href={`/solicitudes/${row.original.id}/editar`} />;
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
    accessorKey: 'fecha',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Fecha solicitud" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell>
          <TableDate date={row.original.fecha} />
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'entidad_academica',
    header: ({ column }) => {
      return (
        <SortButton fieldName={column.id} label="Carrera / curso / área" />
      );
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.entidad_academica}</TableCell>;
    },
  },
  {
    accessorKey: 'presupuestado',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Presupuestado" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="right">
          {' '}
          <TableNumber value={row.original.presupuestado} />
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'asignado',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Asignado" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="right">
          {' '}
          <TableNumber value={row.original.asignado} />
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'restante',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Restante" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="right">
          <TableNumber value={row.original.restante} />
        </TableCell>
      );
    },
  },
];
