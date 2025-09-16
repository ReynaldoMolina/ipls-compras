import { db } from '@/db/db';
import { eq, sql } from 'drizzle-orm';
import { entidades_academicas } from '@/db/schema/entidades-academicas';
import { solicitudes_detalle } from '@/db/schema/solicitudes-detalle';
import { solicitudes } from '@/db/schema/solicitudes';

export async function getResumenComparisonChartByEntidad(year: number) {
  const selectFields = {
    entidad_academica: entidades_academicas.abreviacion,
    presupuesto: sql<number>`SUM(${solicitudes_detalle.cantidad} * ${solicitudes_detalle.precio})`,
    asignado: sql<number>`COALESCE(SUM(${solicitudes_detalle.precio_compra}), 0) + COALESCE(SUM(${solicitudes_detalle.precio_bodega}), 0)`,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(solicitudes)
      .leftJoin(
        entidades_academicas,
        eq(solicitudes.id_entidad_academica, entidades_academicas.id)
      )
      .leftJoin(
        solicitudes_detalle,
        eq(solicitudes.id, solicitudes_detalle.id_solicitud)
      )
      .where(eq(solicitudes.year, year))
      .groupBy(
        solicitudes.id,
        entidades_academicas.tipo,
        entidades_academicas.abreviacion
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
