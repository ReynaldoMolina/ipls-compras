'use client';

import { SortButton } from '@/components/tables/sort-button';
import { ColumnDef } from '@tanstack/react-table';
import TableDate from '@/components/tables/date-cell';
import {
  NumberCellWithValue,
  NumberFloatCell,
} from '@/components/tables/number-cell';
import { OrdenesTable } from '@/types/types';
import TableId from '@/components/tables/id-cell';
import DefaultCell from '@/components/tables/default-cell';
import { EditCell, GoToListCell } from '@/components/tables/edit-cell';
import { sumColumn } from '@/lib/sum-column';
import { DateStatusCell } from '@/components/tables/date-status-cell';

export const columns: ColumnDef<OrdenesTable>[] = [
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      return (
        <div className="inline-flex gap-1">
          <EditCell
            href={`/solicitudes/${row.original.id_solicitud}/ordenes/${row.original.id}`}
          />
          <GoToListCell
            href={`/solicitudes/${row.original.id_solicitud}/ordenes/${row.original.id}/detalle`}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <SortButton column={column} label="Id" />,
    cell: TableId,
  },

  {
    accessorKey: 'entidad_academica',
    header: ({ column }) => (
      <SortButton column={column} label="Carrera / curso / área" />
    ),
    cell: DefaultCell,
    footer: 'Totales',
  },
  {
    accessorKey: 'id_solicitud',
    header: ({ column }) => <SortButton column={column} label="Solicitud" />,
    cell: TableId,
  },
  {
    accessorKey: 'year',
    header: ({ column }) => <SortButton column={column} label="Año" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'fecha_creacion',
    header: ({ column }) => (
      <SortButton column={column} label="Fecha creación" />
    ),
    cell: TableDate,
  },
  {
    accessorKey: 'fecha_a_utilizar',
    header: ({ column }) => (
      <SortButton column={column} label="Fecha a utilizar" />
    ),
    cell: ({ row }) => <DateStatusCell date={row.original.fecha_a_utilizar} />,
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => <SortButton column={column} label="Estado" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'presupuestado',
    header: ({ column }) => (
      <SortButton column={column} label="Presupuestado" />
    ),
    cell: NumberFloatCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'presupuestado');
      return <NumberCellWithValue value={total} />;
    },
  },
  {
    accessorKey: 'asignado',
    header: ({ column }) => <SortButton column={column} label="Asignado" />,
    cell: NumberFloatCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'asignado');
      return <NumberCellWithValue value={total} />;
    },
  },
  {
    accessorKey: 'restante',
    header: ({ column }) => <SortButton column={column} label="Restante" />,
    cell: NumberFloatCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'restante');
      return <NumberCellWithValue value={total} />;
    },
  },
];
