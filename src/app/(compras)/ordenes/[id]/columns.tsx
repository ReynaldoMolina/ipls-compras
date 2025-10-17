'use client';

import { ColumnDef } from '@tanstack/react-table';
import { OrdenDetalleTable } from '@/types/types';
import { SortButtonClient } from '@/components/tables/sort-button';
import {
  NumberIntegerCell,
  NumberCellWithValue,
  NumberFloatCell,
} from '@/components/tables/number-cell';
import {
  CheckBoxCell,
  CheckBoxCellHeader,
} from '@/components/tables/checkbox-cell';
import { sumColumn } from '@/lib/sum-column';
import { DefaultCell } from '@/components/tables/default-cell';
import { EditCell } from '@/components/tables/edit-cell';
import { DefaultCellWrap } from '@/components/tables/default-cell-wrap';

export const columns: ColumnDef<OrdenDetalleTable>[] = [
  {
    id: 'select',
    header: CheckBoxCellHeader,
    cell: CheckBoxCell,
    enableSorting: false,
    size: 30,
  },
  {
    id: 'edit',
    header: 'Edit',
    cell: ({ row }) => (
      <EditCell
        href={`/ordenes/${row.original.id_orden}/detalle/${row.original.id}`}
      />
    ),
    size: 40,
  },
  {
    id: 'item',
    header: ({ column }) => <SortButtonClient column={column} label="Nº" />,
    cell: ({ row }) => (
      <span className="block w-full text-center">{row.index + 1}</span>
    ),
    size: 30,
  },
  {
    accessorKey: 'producto_servicio',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Producto / servicio" />
    ),
    cell: DefaultCellWrap,
    footer: 'Totales',
  },
  {
    accessorKey: 'cantidad',
    header: 'Cant',
    cell: NumberIntegerCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'cantidad');
      return <NumberCellWithValue value={total} type="integer" />;
    },
    size: 50,
  },
  {
    accessorKey: 'unidad_medida',
    header: 'U/M',
    cell: DefaultCell,
    size: 60,
  },
  {
    accessorKey: 'precio',
    header: 'Precio',
    cell: NumberFloatCell,
    size: 70,
  },
  {
    id: 'subtotal',
    header: 'Subtotal',
    cell: ({ row }) => (
      <NumberCellWithValue
        value={row.original.cantidad * (row.original.precio ?? 0)}
      />
    ),
    footer: ({ table }) => {
      const total = table.getFilteredRowModel().rows.reduce((sum, row) => {
        const cantidad = Number(row.getValue('cantidad')) || 0;
        const precio = Number(row.getValue('precio')) || 0;
        return sum + cantidad * precio;
      }, 0);

      return <NumberCellWithValue value={total} />;
    },
    size: 70,
  },
  {
    accessorKey: 'observacion',
    header: 'Observación',
    cell: DefaultCellWrap,
    size: 200,
  },
];
