'use client';

import Solvency from '@/components/tables/solvency';
import SortButton from '@/components/tables/sort-button';
import TableCell from '@/components/tables/table-cell';
import { ColumnDef } from '@tanstack/react-table';

export interface Providers {
  id: number;
  solvencia: string | null;
  nombre_comercial: string;
  razon_social: string;
  ruc: string | null;
  telefono: string | null;
  departamento: string | null;
  correo: string | null;
}

export const columns: ColumnDef<Providers>[] = [
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
    accessorKey: 'solvencia',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Solvencia" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell>
          <Solvency
            expirationDate={row.original.solvencia}
            id={row.original.id}
          />
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'nombre_comercial',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Nombre comercial" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.nombre_comercial}</TableCell>;
    },
  },
  {
    accessorKey: 'razon_social',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Razón social" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.razon_social}</TableCell>;
    },
  },
  {
    accessorKey: 'ruc',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="RUC" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.ruc}</TableCell>;
    },
  },
  {
    accessorKey: 'telefono',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Teléfono" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.telefono}</TableCell>;
    },
  },
  {
    accessorKey: 'departamento',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Departamento" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.departamento}</TableCell>;
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
];
