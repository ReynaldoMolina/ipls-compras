'use client';

import { TableLink } from '@/components/tables/table-link';
import SortButton from '@/components/tables/sort-button';
import TableCell from '@/components/tables/table-cell';
import { ColumnDef } from '@tanstack/react-table';
import TableDate from '@/components/tables/table-date';

export interface Solicitud {
  id: number;
  fecha: string | null;
  tipo: string | null;
  entidad_academica: string | null;
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
      return <SortButton fieldName={column.id} label="Fecha" />;
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
    accessorKey: 'tipo',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Tipo" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.tipo}</TableCell>;
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
    id: 'presupuestado',
    header: () => {
      return <span className="text-xs">Presupuestado</span>;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="right">{'1,000,000.00'}</TableCell>;
    },
  },
  {
    id: 'asignado',
    header: () => {
      return <span className="text-xs">Asignado</span>;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="right">{'1,000,000.00'}</TableCell>;
    },
  },
  {
    id: 'restante',
    header: () => {
      return <span className="text-xs">Restante</span>;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="right">{'500,000.00'}</TableCell>;
    },
  },
];
