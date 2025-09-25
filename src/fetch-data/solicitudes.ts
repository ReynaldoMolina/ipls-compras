import { db } from '@/database/db';
import { SearchParamsProps, SolicitudFormType } from '@/types/types';
import { eq, and, sql, desc } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import { buildFilterSolicitudesByYear } from './build-filters';
import { solicitudes } from '@/database/schema/solicitudes';
import { entidades_academicas } from '@/database/schema/entidades-academicas';
import { solicitudes_detalle } from '@/database/schema/solicitudes-detalle';

export async function getSolicitudesTableData(params: SearchParamsProps) {
  const selectFields = {
    id: solicitudes.id,
    year: solicitudes.year,
    tipo: entidades_academicas.tipo,
    entidad_academica: entidades_academicas.nombre,
    abreviacion: entidades_academicas.abreviacion,
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

  const filterBySearch = buildSearchFilter(params, [
    entidades_academicas.nombre,
  ]);

  const filterByYear = buildFilterSolicitudesByYear(params);
  const orderBy = buildOrderByFragment(params, selectFields);

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
      .where(and(filterBySearch, filterByYear))
      .groupBy(
        solicitudes.id,
        entidades_academicas.tipo,
        entidades_academicas.nombre,
        entidades_academicas.abreviacion
      )
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las solicitudes, por favor intenta de nuevo.'
    );
  }
}

export async function getSolicitudById(id: number): Promise<SolicitudFormType> {
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

export async function getUniqueYearsFromSolicitudes() {
  try {
    const data = await db
      .selectDistinct({
        year: solicitudes.year,
      })
      .from(solicitudes)
      .orderBy(desc(solicitudes.year));

    return data.map((e) => ({ value: String(e.year), label: String(e.year) }));
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los años únicos desde las solicitudes, por favor intenta de nuevo'
    );
  }
}
