import { db } from '@/database/db';
import { eq, sql } from 'drizzle-orm';
import { entidad_academica } from '@/database/schema/entidad-academica';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';
import { presupuesto } from '@/database/schema/presupuesto';

export async function getResumenComparisonChartByEntidad(year: number) {
  const selectFields = {
    entidad_academica: entidad_academica.abreviacion,
    presupuesto: sql<number>`SUM(${presupuesto_detalle.cantidad} * ${presupuesto_detalle.precio_sugerido})`,
    // asignado: sql<number>`COALESCE(SUM(${presupuesto_detalle.precio_sugerido}), 0) + COALESCE(SUM(${presupuesto_detalle.precio_bodega}), 0)`,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(presupuesto)
      .leftJoin(
        entidad_academica,
        eq(presupuesto.id_entidad_academica, entidad_academica.id)
      )
      .leftJoin(
        presupuesto_detalle,
        eq(presupuesto.id, presupuesto_detalle.id_presupuesto)
      )
      .where(eq(presupuesto.year, year))
      .groupBy(
        presupuesto.id,
        entidad_academica.tipo,
        entidad_academica.abreviacion
      );
    // .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los datos de la tabla proveedores, por favor intenta de nuevo.'
    );
  }
}
