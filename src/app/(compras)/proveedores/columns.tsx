'use client';

import { Button } from '@/components/ui/button';
import SortButton from '@/ui/tables/components/SortButton';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export interface Providers {
  id: number;
  solvencia: string | null;
  nombre_comercial: string;
  razon_social: string;
  ruc: string | null;
  telefono: string | null;
  departamento: string | null;
  correo: string | null;
}

export const columns: ColumnDef<Providers>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Id" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-xs text-center whitespace-nowrap">
          {row.original.id}
        </div>
      );
    },
  },
  {
    accessorKey: 'solvencia',
    header: ({ column }) => {
      return <SortButton fieldName={column.id} label="Solvencia" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-xs whitespace-nowrap">
          {row.original.solvencia}
        </div>
      );
    },
  },
  {
    accessorKey: 'nombre_comercial',
    header: () => <div className="text-xs">Nombre comercial</div>,
    cell: ({ row }) => {
      return (
        <div className="text-xs whitespace-nowrap">
          {row.original.nombre_comercial}
        </div>
      );
    },
  },
  {
    accessorKey: 'razon_social',
    header: () => <div className="text-xs">Razón social</div>,
    cell: ({ row }) => {
      return (
        <div className="text-xs whitespace-nowrap">
          {row.original.razon_social}
        </div>
      );
    },
  },
  {
    accessorKey: 'ruc',
    header: () => <div className="text-xs">RUC</div>,
    cell: ({ row }) => {
      return (
        <div className="text-xs whitespace-nowrap">{row.original.ruc}</div>
      );
    },
  },
  {
    accessorKey: 'telefono',
    header: () => <div className="text-xs">Teléfono</div>,
    cell: ({ row }) => {
      return (
        <div className="text-xs whitespace-nowrap">{row.original.telefono}</div>
      );
    },
  },
  {
    accessorKey: 'departamento',
    header: () => <div className="text-xs">Departamento</div>,
    cell: ({ row }) => {
      return (
        <div className="text-xs whitespace-nowrap">
          {row.original.departamento}
        </div>
      );
    },
  },
  {
    accessorKey: 'correo',
    header: () => <div className="text-xs">Correo</div>,
    cell: ({ row }) => {
      return (
        <div className="text-xs whitespace-nowrap">{row.original.correo}</div>
      );
    },
  },
];
