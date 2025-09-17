'use client';

import { CornerDownLeft, Keyboard, Plus, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { Input } from '../ui/input';

interface TableActionsProps<TData> {
  table: Table<TData>;
  idSolicitud?: number;
}

export function TableNewRow<TData>({
  table,
  idSolicitud,
}: TableActionsProps<TData>) {
  const emptyRow = {
    id_solicitud: Number(idSolicitud),
    producto_servicio: '',
    cantidad: 1,
    id_unidad_medida: 1,
    precio: 0,
    observaciones: '',
    prioridad: '',
    id_estado: null,
    comprado: 0,
    recibido: 0,
    precio_compra: 0,
    entrega_bodega: 0,
    precio_bodega: 0,
    id_ubicacion: null,
    id_categoria: null,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [newRow, setNewRow] = useState(emptyRow);
  const meta = table.options.meta;
  const isProductEmpty = newRow.producto_servicio.length === 0;

  function createRow() {
    if (!isProductEmpty) {
      meta?.addRow?.(newRow);
    }
  }

  const resetRow = () => setNewRow({ ...newRow, producto_servicio: '' });

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      createRow();
      resetRow();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      resetRow();
    }
  }

  if (isEditing)
    return (
      <div className="relative flex gap-2 rounded-md items-center p-1">
        <Keyboard className="size-4 absolute left-3" />

        <Input
          id="crear-input"
          autoFocus
          aria-invalid={isProductEmpty}
          placeholder="Escribe el producto o servicio"
          value={newRow.producto_servicio}
          onBlur={(e) => {
            if (!e.relatedTarget || e.relatedTarget.id !== 'crear-btn') {
              setIsEditing(false);
            }
          }}
          onChange={(e) => {
            setNewRow({
              ...newRow,
              producto_servicio: e?.target.value,
            });
          }}
          onKeyDown={handleKeyDown}
          className="pl-9"
        />

        <Button
          id="crear-btn"
          variant="outline"
          size="table"
          className="absolute right-2 font-normal"
          disabled={isProductEmpty}
          onClick={() => {
            createRow();
            resetRow();
          }}
          onBlur={(e) => {
            if (!e.relatedTarget || e.relatedTarget.id !== 'crear-input') {
              setIsEditing(false);
            }
          }}
        >
          Crear
          <CornerDownLeft className="size-3.5 rounded-xs h-4 w-5 bg-muted-foreground/20 px-1" />
        </Button>
      </div>
    );

  return (
    <Button
      variant="outline"
      className="font-normal justify-start"
      onClick={() => setIsEditing(true)}
    >
      <Plus className="size-4" />
      Agregar
    </Button>
  );
}

export function TableOptions<TData>({ table }: TableActionsProps<TData>) {
  const meta = table.options.meta;
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function removeRows() {
    meta?.deleteRows?.(selectedRows);
    table.resetRowSelection();
  }

  if (selectedRows.length <= 0) return null;

  return (
    <div className="flex bg-muted/50 bottom-2 gap-2 w-fit rounded-md border p-1 mx-auto">
      <div className="inline-flex gap-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="py-1 h-full"
          onClick={() => table.resetRowSelection()}
        >
          <X className="size-4" />
        </Button>
        <span className="text-sm">{`${selectedRows.length} seleccionado(s)`}</span>
      </div>
      <div className="h-full w-0.5 bg-border"></div>
      <Button
        variant="destructive"
        className="font-normal sticky bottom-0 rounded"
        onClick={removeRows}
        size="sm"
      >
        <Trash2 className="size-3.5" />
        <span className="hidden sm:block">Eliminar</span>
      </Button>
    </div>
  );
}
