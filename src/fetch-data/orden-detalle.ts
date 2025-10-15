import { db } from '@/database/db';
import { orden_detalle } from '@/database/schema/orden-detalle';
import { solicitud_detalle } from '@/database/schema/solicitud-detalle';
import { OrdenDetalleFormType, OrdenDetalleTable } from '@/types/types';
import { eq } from 'drizzle-orm';

export async function getOrdenDetalleByOrdenId(
  id_orden: number | string | undefined
): Promise<OrdenDetalleTable[]> {
  const selectFields = {
    id: orden_detalle.id,
    id_orden: orden_detalle.id_orden,
    cantidad: orden_detalle.cantidad,
    producto_servicio: solicitud_detalle.producto_servicio,
    precio: orden_detalle.precio,
    unidad_medida: solicitud_detalle.unidad_medida,
    observacion: orden_detalle.observacion,
    id_solicitud_detalle: orden_detalle.id_solicitud_detalle,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(orden_detalle)
      .leftJoin(
        solicitud_detalle,
        eq(orden_detalle.id_solicitud_detalle, solicitud_detalle.id)
      )
      .where(eq(orden_detalle.id_orden, Number(id_orden)))
      .orderBy(orden_detalle.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle de la orden, por favor intenta de nuevo'
    );
  }
}

export async function getOrdenDetalleById(
  id: number | string | undefined
): Promise<OrdenDetalleFormType> {
  const selectFields = {
    id: orden_detalle.id,
    id_orden: orden_detalle.id_orden,
    id_solicitud_detalle: orden_detalle.id_solicitud_detalle,
    producto_servicio: solicitud_detalle.producto_servicio,
    cantidad_solicitud: solicitud_detalle.cantidad,
    cantidad: orden_detalle.cantidad,
    precio: orden_detalle.precio,
    observacion: orden_detalle.observacion,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(orden_detalle)
      .leftJoin(
        solicitud_detalle,
        eq(orden_detalle.id_solicitud_detalle, solicitud_detalle.id)
      )
      .where(eq(orden_detalle.id, Number(id)))
      .orderBy(orden_detalle.id);
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle de la orden, por favor intenta de nuevo'
    );
  }
}
