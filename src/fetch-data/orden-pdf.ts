import { db } from '@/database/db';
import { eq, sql } from 'drizzle-orm';
import { orden } from '@/database/schema/orden';
import { proveedor } from '@/database/schema/proveedor';
import { orden_detalle } from '@/database/schema/orden-detalle';
import { solicitud_detalle } from '@/database/schema/solicitud-detalle';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';

export async function getOrdenPdfById(id_orden: number | string | undefined) {
  if (!id_orden) return null;

  try {
    // Get orden header (one row)
    const [ordenInfo] = await db
      .select({
        id_orden: orden.id,
        proveedor: proveedor.nombre_comercial,
        termino_de_pago: orden.termino_de_pago,
        numero_cotizacion: orden.numero_cotizacion,
        moneda: orden.moneda,
        fecha_creacion: orden.fecha_creacion,
        descuento: orden.descuento,
        calcular_iva: orden.calcular_iva,
      })
      .from(orden)
      .leftJoin(proveedor, eq(orden.id_proveedor, proveedor.id))
      .where(eq(orden.id, Number(id_orden)));

    if (!ordenInfo) return null;

    // Get detalle rows
    const detalle = await db
      .select({
        id_solicitud_detalle: orden_detalle.id_solicitud_detalle,
        cantidad: orden_detalle.cantidad,
        unidad_medida: solicitud_detalle.unidad_medida,
        producto_servicio: sql<string>`
          COALESCE(${solicitud_detalle.producto_servicio}, ${presupuesto_detalle.producto_servicio})
        `,
        precio: orden_detalle.precio,
      })
      .from(orden_detalle)
      .leftJoin(
        solicitud_detalle,
        eq(orden_detalle.id_solicitud_detalle, solicitud_detalle.id)
      )
      .leftJoin(
        presupuesto_detalle,
        eq(solicitud_detalle.id_presupuesto_detalle, presupuesto_detalle.id)
      )
      .where(eq(orden_detalle.id_orden, Number(id_orden)))
      .orderBy(orden_detalle.id);

    // Combine into single object
    return {
      ...ordenInfo,
      detalle,
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la orden para imprimir, por favor intenta de nuevo.'
    );
  }
}
