'use client';

import { DateSolvenciaCell } from '@/components/tables/date-solvencia-cell';
import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import { EditCell } from '@/components/tables/edit-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { ProveedorTable } from '@/types/types';
import { DefaultCellWrap } from '@/components/tables/default-cell-wrap';

export const columns: ColumnDef<ProveedorTable>[] = [
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => {
      return <EditCell href={`/proveedores/${row.original.id}`} />;
    },
    size: 40,
  },
  {
    accessorKey: 'nombre_comercial',
    header: ({ column }) => (
      <SortButton column={column} label="Nombre comercial" />
    ),
    cell: DefaultCellWrap,
  },
  {
    accessorKey: 'solvencia',
    header: ({ column }) => <SortButton column={column} label="Solvencia" />,
    cell: ({ row }) => (
      <DateSolvenciaCell
        date={row.original.solvencia}
        id_proveedor={row.original.id}
      />
    ),
    size: 110,
  },
  {
    accessorKey: 'ruc',
    header: ({ column }) => <SortButton column={column} label="RUC" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'telefono',
    header: ({ column }) => <SortButton column={column} label="Teléfono" />,
    cell: DefaultCellWrap,
  },
  {
    accessorKey: 'departamento',
    header: ({ column }) => <SortButton column={column} label="Departamento" />,
    cell: DefaultCell,
    size: 149,
  },
];
