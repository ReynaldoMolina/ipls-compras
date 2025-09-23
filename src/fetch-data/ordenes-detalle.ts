import { db } from '@/database/db';
import { categoria_productos } from '@/database/schema/categoria_productos';
import { ordenes_detalle } from '@/database/schema/ordenes-detalle';
import { solicitudes_detalle } from '@/database/schema/solicitudes-detalle';
import { unidades_medida } from '@/database/schema/unidades-medida';
import {
  OrdenDetalleTable,
  SearchParamsProps,
  SolicitudDetalleFormType,
} from '@/types/types';
import { asc, sql, eq } from 'drizzle-orm';

export async function getOrdenDetalleById(
  id_orden: number
): Promise<OrdenDetalleTable[]> {
  const selectFields = {
    id: ordenes_detalle.id,
    id_solicitud: solicitudes_detalle.id_solicitud,
    producto_servicio: solicitudes_detalle.producto_servicio,
    cantidad: ordenes_detalle.cantidad,
    unidad_medida: unidades_medida.unidad_medida,
    precio_real: ordenes_detalle.precio_real,
    categoria: categoria_productos.categoria,
    observaciones: ordenes_detalle.observaciones,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(ordenes_detalle)
      .leftJoin(
        solicitudes_detalle,
        eq(ordenes_detalle.id_solicitud_detalle, solicitudes_detalle.id)
      )
      .leftJoin(
        unidades_medida,
        eq(solicitudes_detalle.id_unidad_medida, unidades_medida.id)
      )
      .leftJoin(
        categoria_productos,
        eq(solicitudes_detalle.id_categoria, categoria_productos.id)
      )
      .where(eq(ordenes_detalle.id_orden, id_orden))
      .orderBy(ordenes_detalle.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle de la orden, por favor intenta de nuevo'
    );
  }
}

export async function getSolicitudDetalleById(
  id: number
): Promise<SolicitudDetalleFormType> {
  try {
    const data = await db
      .select()
      .from(solicitudes_detalle)
      .where(eq(solicitudes_detalle.id, id))
      .orderBy(solicitudes_detalle.id);
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle de la solicitud, por favor intenta de nuevo'
    );
  }
}
