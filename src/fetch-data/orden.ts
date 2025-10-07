import { db } from '@/database/db';
import { OrdenFormType, SearchParamsProps } from '@/types/types';
import { eq, and, sql, asc } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import {
  buildFilterByOrderState,
  buildFilterSolicitudesByYear,
  buildOrdenesByIdSolicitud,
} from './build-filter';
import { solicitudes } from '@/database/schema/presupuesto';
import { entidades_academicas } from '@/database/schema/entidad-academica';
import { solicitudes_detalle } from '@/database/schema/presupuesto-detalle';
import { ordenes } from '@/database/schema/orden';
import { ordenes_detalle } from '@/database/schema/orden-detalle';
import { ordenes_estados } from '@/database/schema/orden-estado';

export async function getOrdenesTableData(
  searchParams: SearchParamsProps,
  id_solicitud?: number | string | undefined
) {
  const selectFields = {
    id: ordenes.id,
    entidad_academica: entidades_academicas.nombre,
    id_solicitud: ordenes.id_solicitud,
    fecha_creacion: ordenes.fecha_creacion,
    fecha_a_utilizar: ordenes.fecha_a_utilizar,
    estado: ordenes_estados.estado,
    year: solicitudes.year,
    tipo: entidades_academicas.tipo,
    presupuestado: sql<number>`
      COALESCE(SUM(${ordenes_detalle.cantidad} * ${solicitudes_detalle.precio}), 0)
    `,
    asignado: sql<number>`
      COALESCE(SUM(${ordenes_detalle.cantidad} * ${ordenes_detalle.precio_real}), 0)
    `,
    restante: sql<number>`
      COALESCE(SUM(${ordenes_detalle.cantidad} * ${solicitudes_detalle.precio}), 0)
      - COALESCE(SUM(${ordenes_detalle.cantidad} * ${ordenes_detalle.precio_real}), 0)
    `,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    entidades_academicas.nombre,
  ]);

  const filterByIdSolicitud = buildOrdenesByIdSolicitud(id_solicitud);
  const filterByYear = buildFilterSolicitudesByYear(searchParams);
  const filterByOrderState = buildFilterByOrderState(searchParams);
  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(ordenes)
      .leftJoin(solicitudes, eq(ordenes.id_solicitud, solicitudes.id))
      .leftJoin(
        entidades_academicas,
        eq(solicitudes.id_entidad_academica, entidades_academicas.id)
      )
      .leftJoin(ordenes_detalle, eq(ordenes.id, ordenes_detalle.id_orden))
      .leftJoin(
        solicitudes_detalle,
        eq(ordenes_detalle.id_solicitud_detalle, solicitudes_detalle.id)
      )
      .leftJoin(ordenes_estados, eq(ordenes.id_estado, ordenes_estados.id))
      .where(
        and(
          filterBySearch,
          filterByYear,
          filterByIdSolicitud,
          filterByOrderState
        )
      )
      .groupBy(
        ordenes.id,
        solicitudes.year,
        entidades_academicas.nombre,
        entidades_academicas.tipo,
        ordenes_estados.estado
      )
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las ordenes, por favor intenta de nuevo.'
    );
  }
}

export async function getOrdenById(
  id: number | string | undefined
): Promise<OrdenFormType> {
  try {
    const data = await db
      .select()
      .from(ordenes)
      .where(eq(ordenes.id, Number(id)));
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la orden, por favor intenta de nuevo');
  }
}

export async function getOrdenesEstados() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${ordenes_estados.id} AS TEXT)`,
        label: ordenes_estados.estado,
      })
      .from(ordenes_estados)
      .orderBy(asc(ordenes_estados.estado));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los estados, por favor intenta de nuevo'
    );
  }
}

export async function getOrdenesAddToExistingModal(
  id_entidad_academica: number | undefined
) {
  const selectFields = {
    id: ordenes.id,
    entidad_academica: entidades_academicas.nombre,
    id_solicitud: ordenes.id_solicitud,
    year: solicitudes.year,
    estado: ordenes_estados.estado,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(ordenes)
      .leftJoin(solicitudes, eq(ordenes.id_solicitud, solicitudes.id))
      .leftJoin(
        entidades_academicas,
        eq(solicitudes.id_entidad_academica, entidades_academicas.id)
      )
      .leftJoin(ordenes_detalle, eq(ordenes.id, ordenes_detalle.id_orden))
      .leftJoin(
        solicitudes_detalle,
        eq(ordenes_detalle.id_solicitud_detalle, solicitudes_detalle.id)
      )
      .leftJoin(ordenes_estados, eq(ordenes.id_estado, ordenes_estados.id))
      .where(eq(solicitudes.id_entidad_academica, Number(id_entidad_academica)))
      .groupBy(
        ordenes.id,
        solicitudes.year,
        entidades_academicas.nombre,
        entidades_academicas.tipo,
        ordenes_estados.estado
      )
      .orderBy(ordenes.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las ordenes, por favor intenta de nuevo.'
    );
  }
}
