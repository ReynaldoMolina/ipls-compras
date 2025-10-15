import { db } from '@/database/db';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';
import {
  PresupuestoDetalleFormType,
  PresupuestoDetalleTable,
} from '@/types/types';
import { eq } from 'drizzle-orm';

export async function getPresupuestoDetalleByPresupuestoId(
  id_presupuesto: number | string
): Promise<PresupuestoDetalleTable[]> {
  const selectFields = {
    id: presupuesto_detalle.id,
    id_presupuesto: presupuesto_detalle.id_presupuesto,
    producto_servicio: presupuesto_detalle.producto_servicio,
    cantidad: presupuesto_detalle.cantidad,
    unidad_medida: presupuesto_detalle.unidad_medida,
    precio_sugerido: presupuesto_detalle.precio_sugerido,
    categoria: presupuesto_detalle.categoria,
    prioridad: presupuesto_detalle.prioridad,
    observacion: presupuesto_detalle.observacion,
  };
  try {
    const data = await db
      .select(selectFields)
      .from(presupuesto_detalle)
      .where(eq(presupuesto_detalle.id_presupuesto, Number(id_presupuesto)))
      .orderBy(presupuesto_detalle.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle del presupuesto, por favor intenta de nuevo'
    );
  }
}

export async function getPresupuestoDetalleById(
  id: number | string | undefined
): Promise<PresupuestoDetalleFormType> {
  try {
    const data = await db
      .select()
      .from(presupuesto_detalle)
      .where(eq(presupuesto_detalle.id, Number(id)))
      .orderBy(presupuesto_detalle.id);
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle de la solicitud, por favor intenta de nuevo'
    );
  }
}
