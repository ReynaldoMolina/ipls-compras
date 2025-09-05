import { db } from '@/db/db';
import { SearchParamsProps, Solicitud, SolicitudDetalle } from '@/types/types';
import { eq, and, asc, sql } from 'drizzle-orm';
import { buildSearchFilter } from './buildSearchFilter';
import { buildOrderFragment } from './buildOrderFragment';
import { buildFiltersProviders } from './buildFilterFragment';
import { solicitudes } from '@/db/schema/solicitudes';
import { entidades_academicas } from '@/db/schema/entidades-academicas';
import { solicitudes_detalle } from '@/db/schema/solicitudes-detalle';
import { unidades_medida } from '@/db/schema/unidades-medida';
import { solicitudes_estados } from '@/db/schema/solicitudes-estados';

export async function getSolicitudes(params: SearchParamsProps) {
  const selectFields = {
    id: solicitudes.id,
    fecha: solicitudes.fecha,
    tipo: entidades_academicas.tipo,
    entidad_academica: entidades_academicas.nombre,
    presupuestado: sql<number>`SUM(${solicitudes_detalle.cantidad} * ${solicitudes_detalle.precio})`,
    asignado: sql<number>`COALESCE(SUM(${solicitudes_detalle.precio_compra}), 0) + COALESCE(SUM(${solicitudes_detalle.precio_bodega}), 0)`,
    restante: sql<number>`
      SUM(${solicitudes_detalle.cantidad} * ${solicitudes_detalle.precio})
      - (
        COALESCE(SUM(${solicitudes_detalle.precio_compra}), 0)
        + COALESCE(SUM(${solicitudes_detalle.precio_bodega}), 0)
      )
    `,
  };

  const searchFilter = buildSearchFilter(params, [entidades_academicas.nombre]);

  const { solvenciaFilter } = buildFiltersProviders(params);
  const orderFragment = buildOrderFragment(params, selectFields);

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
      .where(and(searchFilter))
      .groupBy(
        solicitudes.id,
        entidades_academicas.tipo,
        entidades_academicas.nombre
      )
      .having(solvenciaFilter)
      .orderBy(orderFragment);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las solicitudes, por favor intenta de nuevo.'
    );
  }
}

export async function getSolicitudById(id: number): Promise<Solicitud> {
  try {
    const data = await db
      .select()
      .from(solicitudes)
      .where(eq(solicitudes.id, id));
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la solicitud, por favor intenta de nuevo'
    );
  }
}

export async function getSolicitudDetalleById(
  id: number
): Promise<SolicitudDetalle[]> {
  try {
    const data = await db
      .select()
      .from(solicitudes_detalle)
      .where(eq(solicitudes_detalle.id_solicitud, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la solicitud, por favor intenta de nuevo'
    );
  }
}
