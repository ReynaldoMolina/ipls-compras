'use client';

import { ColumnDef } from '@tanstack/react-table';
import { OrdenDetalleTable } from '@/types/types';
import { SortButtonClient } from '@/components/tables/sort-button';
import {
  NumberIntegerCell,
  NumberFloatCell,
  NumberCellWithValue,
} from '@/components/tables/number-cell';
import {
  CheckBoxCell,
  CheckBoxCellHeader,
} from '@/components/tables/checkbox-cell';
import { sumColumn } from '@/lib/sum-column';
import { DefaultCell } from '@/components/tables/default-cell';
import { EditCell } from '@/components/tables/edit-cell';

export const columns: ColumnDef<OrdenDetalleTable>[] = [
  {
    id: 'select',
    header: CheckBoxCellHeader,
    cell: CheckBoxCell,
    enableSorting: false,
  },
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => (
      <EditCell
        href={`/solicitudes/${row.original.id_solicitud}/ordenes/${row.original.id_orden}/detalle/${row.original.id}`}
      />
    ),
  },
  {
    id: 'item',
    header: ({ column }) => <SortButtonClient column={column} label="Nº" />,
    cell: ({ row }) => (
      <span className="block w-full text-center">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: 'producto_servicio',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Producto / Servicio" />
    ),
    cell: DefaultCell,
    footer: 'Totales',
    maxSize: 100,
  },
  {
    accessorKey: 'cantidad',
    header: ({ column }) => <SortButtonClient column={column} label="Cant" />,
    cell: NumberIntegerCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'cantidad');
      return <NumberCellWithValue value={total} type="integer" />;
    },
  },
  {
    accessorKey: 'unidad_medida',
    header: ({ column }) => <SortButtonClient column={column} label="U/M" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'precio_real',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Precio real" />
    ),
    cell: NumberFloatCell,
  },
  {
    id: 'subtotal',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Subtotal" />
    ),
    cell: ({ row }) => (
      <NumberCellWithValue
        value={row.original.cantidad * (row.original.precio_real ?? 0)}
      />
    ),
    footer: ({ table }) => {
      const total = table.getFilteredRowModel().rows.reduce((sum, row) => {
        const cantidad = Number(row.getValue('cantidad')) || 0;
        const precio = Number(row.getValue('precio_real')) || 0;
        return sum + cantidad * precio;
      }, 0);

      return <NumberCellWithValue value={total} />;
    },
  },
  {
    accessorKey: 'observaciones',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Observaciones" />
    ),
    cell: DefaultCell,
  },
];
