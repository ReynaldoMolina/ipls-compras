'use server';

import { db } from '@/db/db';
import { PrevState, SolicitudDetalle } from '@/types/types';
import { goBackTo } from './actionsUtils';
import { solicitudes_detalle } from '@/db/schema/solicitudes-detalle';
import { eq } from 'drizzle-orm';

interface SaveProductsParams {
  newRows: SolicitudDetalle[];
  editedRows: SolicitudDetalle[];
  deletedRows: SolicitudDetalle[];
}

export async function saveSolicitudesDetalle({
  newRows,
  editedRows,
  deletedRows,
}: SaveProductsParams) {
  try {
    // Create new rows
    for (const row of newRows) {
      await db.insert(solicitudes_detalle).values({
        id_solicitud: row.id_solicitud,
        producto_servicio: row.producto_servicio,
        cantidad: row.cantidad,
        id_unidad_medida: row.id_unidad_medida,
        precio: row.precio,
        observaciones: row.observaciones ?? null,
        prioridad: row.prioridad ?? null,
        id_estado: row.id_estado ?? null,
        comprado: row.comprado ?? null,
        recibido: row.recibido ?? null,
        precio_compra: row.precio_compra ?? null,
        entrega_bodega: row.entrega_bodega ?? null,
        precio_bodega: row.precio_bodega ?? null,
        id_ubicacion: row.id_ubicacion ?? null,
        id_categoria: row.id_categoria ?? null,
      });
    }

    // Update edited rows
    for (const row of editedRows) {
      if (row.id) {
        await db
          .update(solicitudes_detalle)
          .set({
            id_solicitud: row.id_solicitud,
            producto_servicio: row.producto_servicio,
            cantidad: row.cantidad,
            id_unidad_medida: row.id_unidad_medida,
            precio: row.precio,
            observaciones: row.observaciones ?? null,
            prioridad: row.prioridad ?? null,
            id_estado: row.id_estado ?? null,
            comprado: row.comprado ?? null,
            recibido: row.recibido ?? null,
            precio_compra: row.precio_compra ?? null,
            entrega_bodega: row.entrega_bodega ?? null,
            precio_bodega: row.precio_bodega ?? null,
            id_ubicacion: row.id_ubicacion ?? null,
            id_categoria: row.id_categoria ?? null,
          })
          .where(eq(solicitudes_detalle.id, row.id));
      }
    }

    // Delete rows
    for (const row of deletedRows) {
      if (row.id) {
        await db
          .delete(solicitudes_detalle)
          .where(eq(solicitudes_detalle.id, row.id));
      }
    }
  } catch (error) {
    console.error(error);
    return { message: 'Error creating solicitud' };
  }
  await goBackTo('/solicitudes');
}
