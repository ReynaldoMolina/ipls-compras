'use client';

import TableDate from '@/components/tables/date-cell';
import Solvency from '@/components/tables/solvencia-state-cell';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import DefaultCell from '@/components/tables/default-cell';
import { Solvencia } from '@/types/types';
import TableId from '@/components/tables/id-cell';
import { EditLink } from '@/components/tables/edit-link';

export const columns: ColumnDef<Solvencia>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: TableId,
  },
  {
    accessorKey: 'nombre_comercial',
    header: ({ column }) => {
      return <SortButton column={column} label="Nombre comercial" />;
    },
    cell: ({ row }) => (
      <EditLink
        href={`/proveedores/${row.original.id_proveedor}/solvencias/${row.original.id}/editar`}
        label={row.original.proveedor ?? ''}
      />
    ),
  },
  {
    accessorKey: 'verificado',
    header: ({ column }) => {
      return <SortButton column={column} label="Verificado" />;
    },
    cell: TableDate,
  },
  {
    accessorKey: 'recibido',
    header: ({ column }) => <SortButton column={column} label="Recibido" />,
    cell: TableDate,
  },
  {
    accessorKey: 'emitida',
    header: ({ column }) => <SortButton column={column} label="Emitida" />,
    cell: TableDate,
  },
  {
    accessorKey: 'vence',
    header: ({ column }) => <SortButton column={column} label="Vence" />,
    cell: ({ row }) => <Solvency date={row.original.vence} />,
  },
  {
    accessorKey: 'url',
    header: ({ column }) => <SortButton column={column} label="Archivo" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'usuario',
    header: ({ column }) => {
      return <SortButton column={column} label="Verificado por" />;
    },
    cell: DefaultCell,
  },
];
