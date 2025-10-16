import { db } from '@/database/db';
import { eq, sql } from 'drizzle-orm';
import { solicitud } from '@/database/schema/solicitud';
import { solicitud_detalle } from '@/database/schema/solicitud-detalle';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';

export async function getSolicitudPdfById(
  id_solicitud: number | string | undefined
) {
  if (!id_solicitud) return null;

  try {
    // Get solicitud header (one row)
    const [solicitudInfo] = await db
      .select({
        id_solicitud: solicitud.id,
        fecha: solicitud.fecha,
      })
      .from(solicitud)
      .where(eq(solicitud.id, Number(id_solicitud)));

    if (!solicitudInfo) return null;

    // Get detalle rows
    const detalle = await db
      .select({
        id: solicitud_detalle.id,
        producto_servicio: sql<string>`
          COALESCE(${solicitud_detalle.producto_servicio}, ${presupuesto_detalle.producto_servicio})
        `,
        unidad_medida: solicitud_detalle.unidad_medida,
        cantidad: solicitud_detalle.cantidad,
      })
      .from(solicitud_detalle)
      .leftJoin(
        presupuesto_detalle,
        eq(solicitud_detalle.id_presupuesto_detalle, presupuesto_detalle.id)
      )
      .where(eq(solicitud_detalle.id_solicitud, Number(id_solicitud)))
      .orderBy(solicitud_detalle.id);

    // Combine into single object
    return {
      ...solicitudInfo,
      detalle,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la solicitud para imprimir, por favor intenta de nuevo.'
    );
  }
}
