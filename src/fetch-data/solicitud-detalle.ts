import { db } from '@/database/db';
import { solicitud_detalle } from '@/database/schema/solicitud-detalle';
import { SolicitudDetalleFormType, SolicitudDetalleTable } from '@/types/types';
import { eq } from 'drizzle-orm';

export async function getSolicitudDetalleBySolicitudId(
  id_solicitud: number | string
): Promise<SolicitudDetalleTable[]> {
  const selectFields = {
    id: solicitud_detalle.id,
    id_solicitud: solicitud_detalle.id_solicitud,
    producto_servicio: solicitud_detalle.producto_servicio,
    cantidad: solicitud_detalle.cantidad,
    unidad_medida: solicitud_detalle.unidad_medida,
    observacion: solicitud_detalle.observacion,
  };
  try {
    const data = await db
      .select(selectFields)
      .from(solicitud_detalle)
      .where(eq(solicitud_detalle.id_solicitud, Number(id_solicitud)))
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
      .select()
      .from(solicitud_detalle)
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
