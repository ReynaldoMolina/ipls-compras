'use client';

import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import { SolvenciaTable } from '@/types/types';
import { IdCell } from '@/components/tables/id-cell';
import { DefaultCell } from '@/components/tables/default-cell';
import { DateCell, DateStatusCell } from '@/components/tables/date-cell';
import { EditCell } from '@/components/tables/edit-cell';
import { DefaultCellWrap } from '@/components/tables/default-cell-wrap';

export const columns: ColumnDef<SolvenciaTable>[] = [
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => (
      <EditCell
        href={`/proveedores/${row.original.id_proveedor}/solvencias/${row.original.id}`}
      />
    ),
    size: 40,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: IdCell,
    size: 50,
  },
  {
    accessorKey: 'nombre_comercial',
    header: ({ column }) => (
      <SortButton column={column} label="Nombre comercial" />
    ),
    cell: DefaultCellWrap,
  },
  {
    accessorKey: 'verificado',
    header: ({ column }) => <SortButton column={column} label="Verificado" />,
    cell: DateCell,
  },
  {
    accessorKey: 'recibido',
    header: ({ column }) => <SortButton column={column} label="Recibido" />,
    cell: DateCell,
  },
  {
    accessorKey: 'emitida',
    header: ({ column }) => <SortButton column={column} label="Emitida" />,
    cell: DateCell,
  },
  {
    accessorKey: 'vence',
    header: ({ column }) => <SortButton column={column} label="Vence" />,
    cell: DateStatusCell,
  },
  {
    accessorKey: 'url',
    header: ({ column }) => <SortButton column={column} label="Archivo" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'usuario',
    header: ({ column }) => (
      <SortButton column={column} label="Verificado por" />
    ),
    cell: DefaultCell,
  },
];
