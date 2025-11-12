import { db } from '@/database/db';
import { orden_detalle } from '@/database/schema/orden-detalle';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';
import { solicitud_detalle } from '@/database/schema/solicitud-detalle';
import { SolicitudDetalleFormType, SolicitudDetalleTable } from '@/types/types';
import { eq, sql } from 'drizzle-orm';

export async function getSolicitudDetalleBySolicitudId(
  id_solicitud: number | string
): Promise<SolicitudDetalleTable[]> {
  const selectFields = {
    id: solicitud_detalle.id,
    id_solicitud: solicitud_detalle.id_solicitud,
    producto_servicio: sql<string>`
      COALESCE(${solicitud_detalle.producto_servicio}, ${presupuesto_detalle.producto_servicio})
    `,
    cantidad: solicitud_detalle.cantidad,
    cantidad_bodega: solicitud_detalle.cantidad_bodega,
    en_orden: sql<number>`
      COALESCE(SUM(${orden_detalle.cantidad}), 0)
    `,
    restante: sql<number>`
      ${solicitud_detalle.cantidad} - COALESCE(${solicitud_detalle.cantidad_bodega}, 0) - COALESCE(SUM(${orden_detalle.cantidad}), 0)
    `,
    unidad_medida: solicitud_detalle.unidad_medida,
    observacion: solicitud_detalle.observacion,
  };
  try {
    const data = await db
      .select(selectFields)
      .from(solicitud_detalle)
      .leftJoin(
        presupuesto_detalle,
        eq(solicitud_detalle.id_presupuesto_detalle, presupuesto_detalle.id)
      )
      .leftJoin(
        orden_detalle,
        eq(solicitud_detalle.id, orden_detalle.id_solicitud_detalle)
      )
      .where(eq(solicitud_detalle.id_solicitud, Number(id_solicitud)))
      .groupBy(solicitud_detalle.id, presupuesto_detalle.producto_servicio)
      .orderBy(solicitud_detalle.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle de la solicitud, por favor intenta de nuevo'
    );
  }
}

export async function getSolicitudDetalleById(
  id: number | string | undefined
): Promise<SolicitudDetalleFormType> {
  try {
    const [data] = await db
      .select({
        id: solicitud_detalle.id,
        id_solicitud: solicitud_detalle.id_solicitud,
        producto_servicio: sql<string>`
          COALESCE(${solicitud_detalle.producto_servicio}, ${presupuesto_detalle.producto_servicio})
        `,
        cantidad: solicitud_detalle.cantidad,
        cantidad_bodega: solicitud_detalle.cantidad_bodega,
        unidad_medida: solicitud_detalle.unidad_medida,
        observacion: solicitud_detalle.observacion,
        id_presupuesto_detalle: solicitud_detalle.id_presupuesto_detalle,
      })
      .from(solicitud_detalle)
      .leftJoin(
        presupuesto_detalle,
        eq(solicitud_detalle.id_presupuesto_detalle, presupuesto_detalle.id)
      )
      .where(eq(solicitud_detalle.id, Number(id)))
      .orderBy(solicitud_detalle.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle de la solicitud, por favor intenta de nuevo'
    );
  }
}
