import { db } from '@/database/db';
import { eq } from 'drizzle-orm';
import { ordenes } from '@/database/schema/ordenes';
import { proveedores } from '@/database/schema/proveedores';
import { ordenes_detalle } from '@/database/schema/ordenes-detalle';
import { solicitudes_detalle } from '@/database/schema/solicitudes-detalle';
import { unidades_medida } from '@/database/schema/unidades-medida';

export async function getOrdenPdfById(id_orden: number | string | undefined) {
  if (!id_orden) return null;

  try {
    // Get orden header (one row)
    const [orden] = await db
      .select({
        id_orden: ordenes.id,
        proveedor: proveedores.nombre_comercial,
        termino_de_pago: ordenes.termino_de_pago,
        numero_cotizacion: ordenes.numero_cotizacion,
        moneda: ordenes.moneda,
        fecha_creacion: ordenes.fecha_creacion,
      })
      .from(ordenes)
      .leftJoin(proveedores, eq(ordenes.id_proveedor, proveedores.id))
      .where(eq(ordenes.id, Number(id_orden)));

    if (!orden) return null;

    // Get detalle rows
    const detalle = await db
      .select({
        id_solicitud_detalle: ordenes_detalle.id_solicitud_detalle,
        cantidad: ordenes_detalle.cantidad,
        unidad_medida: unidades_medida.unidad_medida,
        producto_servicio: solicitudes_detalle.producto_servicio,
        precio_real: ordenes_detalle.precio_real,
      })
      .from(ordenes_detalle)
      .leftJoin(
        solicitudes_detalle,
        eq(ordenes_detalle.id_solicitud_detalle, solicitudes_detalle.id)
      )
      .leftJoin(
        unidades_medida,
        eq(solicitudes_detalle.id_unidad_medida, unidades_medida.id)
      )
      .where(eq(ordenes_detalle.id_orden, Number(id_orden)))
      .orderBy(ordenes_detalle.id);

    // Combine into single object
    return {
      ...orden,
      detalle,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la orden para imprimir, por favor intenta de nuevo.'
    );
  }
}
