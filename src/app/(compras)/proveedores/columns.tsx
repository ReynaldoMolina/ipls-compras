'use client';

import { EditLink } from '@/components/tables/edit-link';
import SolvenciaState from '@/components/tables/solvencia-state-cell';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import DefaultCell from '@/components/tables/default-cell';
import { Proveedores } from '@/types/types';
import TableId from '@/components/tables/id-cell';

export const columns: ColumnDef<Proveedores>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: TableId,
  },
  {
    accessorKey: 'nombre_comercial',
    header: ({ column }) => (
      <SortButton column={column} label="Nombre comercial" />
    ),
    cell: ({ row }) => (
      <EditLink
        href={`/proveedores/${row.original.id}/editar`}
        label={row.original.nombre_comercial}
      />
    ),
  },
  {
    accessorKey: 'solvencia',
    header: ({ column }) => <SortButton column={column} label="Solvencia" />,
    cell: ({ row }) => (
      <SolvenciaState date={row.original.solvencia} id={row.original.id} />
    ),
  },
  {
    accessorKey: 'razon_social',
    header: ({ column }) => <SortButton column={column} label="Razón social" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'ruc',
    header: ({ column }) => <SortButton column={column} label="RUC" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'telefono',
    header: ({ column }) => <SortButton column={column} label="Teléfono" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'departamento',
    header: ({ column }) => <SortButton column={column} label="Departamento" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'correo',
    header: ({ column }) => <SortButton column={column} label="Correo" />,
    cell: DefaultCell,
  },
];
