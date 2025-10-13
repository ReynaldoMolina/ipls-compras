import { db } from '@/database/db';
import { solicitud_detalle } from '@/database/schema/solicitud-detalle';
import { unidad_medida } from '@/database/schema/unidad-medida';
import { SolicitudDetalleFormType, SolicitudDetalleTable } from '@/types/types';
import { asc, sql, eq } from 'drizzle-orm';

export async function getSolicitudDetalleBySolicitudId(
  id_solicitud: number | string
): Promise<SolicitudDetalleTable[]> {
  const selectFields = {
    id: solicitud_detalle.id,
    id_solicitud: solicitud_detalle.id_solicitud,
    producto_servicio: solicitud_detalle.producto_servicio,
    cantidad: solicitud_detalle.cantidad,
    unidad_medida: unidad_medida.nombre,
    observacion: solicitud_detalle.observacion,
  };
  try {
    const data = await db
      .select(selectFields)
      .from(solicitud_detalle)
      .leftJoin(
        unidad_medida,
        eq(solicitud_detalle.id_unidad_medida, unidad_medida.id)
      )
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

export async function getUnidadesMedida() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${unidad_medida.id} AS TEXT)`,
        label: unidad_medida.nombre,
      })
      .from(unidad_medida)
      .orderBy(asc(unidad_medida.nombre));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los unidades de medida, por favor intenta de nuevo'
    );
  }
}
