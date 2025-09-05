'use client';

import TableCell from '@/components/tables/table-cell';
import { ColumnDef } from '@tanstack/react-table';
import { SolicitudDetalle } from '@/types/types';
import { SortButtonClient } from '@/components/tables/sort-button';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<SolicitudDetalle>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'producto_servicio',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Producto / Servicio" />;
    },
    cell: ({ row }) => {
      return <TableCell>{row.original.producto_servicio}</TableCell>;
    },
  },
  {
    accessorKey: 'cantidad',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Cantidad" />;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="center">{row.original.cantidad}</TableCell>;
    },
  },
  {
    accessorKey: 'id_unidad_medida',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="U/M" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="center">
          {row.original.id_unidad_medida}
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'precio',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Precio" />;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="center">{row.original.precio}</TableCell>;
    },
  },
  {
    accessorKey: 'observaciones',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Observaciones" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="center">{row.original.observaciones}</TableCell>
      );
    },
  },
  {
    accessorKey: 'prioridad',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Prioridad" />;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="center">{row.original.prioridad}</TableCell>;
    },
  },
  {
    accessorKey: 'id_estado',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Estado" />;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="center">{row.original.id_estado}</TableCell>;
    },
  },
  {
    accessorKey: 'comprado',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Comprado" />;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="center">{row.original.comprado}</TableCell>;
    },
  },
  {
    accessorKey: 'recibido',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Recibido" />;
    },
    cell: ({ row }) => {
      return <TableCell textAlign="center">{row.original.recibido}</TableCell>;
    },
  },
  {
    accessorKey: 'precio_compra',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Precio compra" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="center">{row.original.precio_compra}</TableCell>
      );
    },
  },
  {
    accessorKey: 'entrega_bodega',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Entrega bodega" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="center">{row.original.entrega_bodega}</TableCell>
      );
    },
  },
  {
    accessorKey: 'precio_bodega',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Precio bodega" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="center">{row.original.precio_bodega}</TableCell>
      );
    },
  },
  {
    accessorKey: 'id_ubicacion',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Ubicación" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="center">{row.original.id_ubicacion}</TableCell>
      );
    },
  },
  {
    accessorKey: 'id_categoria',
    header: ({ column }) => {
      return <SortButtonClient column={column} label="Categoría" />;
    },
    cell: ({ row }) => {
      return (
        <TableCell textAlign="center">{row.original.id_categoria}</TableCell>
      );
    },
  },
];
