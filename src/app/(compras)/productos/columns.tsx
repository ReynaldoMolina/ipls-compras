'use client';

import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import { ProductosTable } from '@/types/types';
import { IdCell } from '@/components/tables/id-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { EditCell } from '@/components/tables/edit-cell';

export const columns: ColumnDef<ProductosTable>[] = [
  {
    id: 'edit',
    header: 'Editar',
    cell: ({ row }) => {
      return <EditCell href={`/productos/${row.original.id}`} />;
    },
    size: 50,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: IdCell,
    size: 50,
  },

  {
    accessorKey: 'nombre_producto',
    header: ({ column }) => <SortButton column={column} label="Nombre" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'unidad_medida',
    header: ({ column }) => <SortButton column={column} label="U/M" />,
    cell: DefaultCell,
    size: 100,
  },
];
