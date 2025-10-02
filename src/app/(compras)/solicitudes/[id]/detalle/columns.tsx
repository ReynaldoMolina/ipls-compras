'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SolicitudDetalleTable } from '@/types/types';
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

export const columns: ColumnDef<SolicitudDetalleTable>[] = [
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
        href={`/solicitudes/${row.original.id_solicitud}/detalle/${row.original.id}`}
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
    accessorKey: 'precio',
    header: ({ column }) => <SortButtonClient column={column} label="Precio" />,
    cell: NumberFloatCell,
  },
  {
    id: 'subtotal',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Subtotal" />
    ),
    cell: ({ row }) => (
      <NumberCellWithValue
        value={row.original.cantidad * row.original.precio}
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
  },
  {
    accessorKey: 'observaciones',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Observaciones" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'prioridad',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Prioridad" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => <SortButtonClient column={column} label="Estado" />,
    cell: DefaultCell,
  },
  {
    accessorKey: 'comprado',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Comprado" />
    ),
    cell: NumberIntegerCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'comprado');
      return <NumberCellWithValue value={total} type="integer" />;
    },
  },
  {
    accessorKey: 'recibido',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Recibido" />
    ),
    cell: NumberIntegerCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'recibido');
      return <NumberCellWithValue value={total} type="integer" />;
    },
  },
  {
    accessorKey: 'precio_compra',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Precio compra" />
    ),
    cell: NumberFloatCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'precio_compra');
      return <NumberCellWithValue value={total} />;
    },
  },
  {
    accessorKey: 'entrega_bodega',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Entrega bodega" />
    ),
    cell: NumberIntegerCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'entrega_bodega');
      return <NumberCellWithValue value={total} type="integer" />;
    },
  },
  {
    accessorKey: 'precio_bodega',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Precio bodega" />
    ),
    cell: NumberFloatCell,
    footer: ({ table }) => {
      const total = sumColumn(table, 'precio_bodega');
      return <NumberCellWithValue value={total} />;
    },
  },
  {
    accessorKey: 'ubicacion',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Ubicación" />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: 'categoria',
    header: ({ column }) => (
      <SortButtonClient column={column} label="Categoría" />
    ),
    cell: DefaultCell,
  },
];
