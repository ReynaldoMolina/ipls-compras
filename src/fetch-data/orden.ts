import { db } from '@/database/db';
import { OrdenFormType, SearchParamsProps } from '@/types/types';
import { eq, and, sql } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import {
  buildFilterByOrderState,
  buildFilterSolicitudesByYear,
} from './build-filter';
import { solicitud } from '@/database/schema/solicitud';
import { entidad_academica } from '@/database/schema/entidad-academica';
import { solicitud_detalle } from '@/database/schema/solicitud-detalle';
import { orden } from '@/database/schema/orden';
import { orden_detalle } from '@/database/schema/orden-detalle';
import { orden_estado } from '@/database/schema/orden-estado';

export async function getOrdenesTableData(searchParams: SearchParamsProps) {
  const selectFields = {
    id: orden.id,
    entidad_academica: entidad_academica.nombre,
    id_solicitud: orden.id_solicitud,
    fecha_creacion: orden.fecha_creacion,
    estado: orden_estado.nombre,
    tipo: entidad_academica.tipo,
    subtotal: sql<number>`
      COALESCE(SUM(${orden_detalle.cantidad} * ${orden_detalle.precio}), 0)
    `,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    entidad_academica.nombre,
  ]);

  const filterByYear = buildFilterSolicitudesByYear(searchParams);
  const filterByOrderState = buildFilterByOrderState(searchParams);
  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(orden)
      .leftJoin(solicitud, eq(orden.id_solicitud, solicitud.id))
      .leftJoin(
        entidad_academica,
        eq(solicitud.id_entidad_academica, entidad_academica.id)
      )
      .leftJoin(orden_detalle, eq(orden.id, orden_detalle.id_orden))
      .leftJoin(orden_estado, eq(orden.id_estado, orden_estado.id))
      .where(and(filterBySearch, filterByYear, filterByOrderState))
      .groupBy(
        orden.id,
        entidad_academica.nombre,
        entidad_academica.tipo,
        orden_estado.id
      )
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las orden, por favor intenta de nuevo.'
    );
  }
}

export async function getOrdenById(
  id: number | string | undefined
): Promise<OrdenFormType> {
  try {
    const [data] = await db
      .select({
        id: orden.id,
        id_solicitud: orden.id_solicitud,
        fecha_creacion: orden.fecha_creacion,
        id_proveedor: orden.id_proveedor,
        id_estado: orden.id_estado,
        numero_cotizacion: orden.numero_cotizacion,
        termino_de_pago: orden.termino_de_pago,
        moneda: orden.moneda,
        descuento: orden.descuento,
        observacion: orden.observacion,
        calcular_iva: orden.calcular_iva,
        entidad_academica: entidad_academica.nombre,
      })
      .from(orden)
      .leftJoin(solicitud, eq(orden.id_solicitud, solicitud.id))
      .leftJoin(
        entidad_academica,
        eq(solicitud.id_entidad_academica, entidad_academica.id)
      )
      .where(eq(orden.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo obtener la orden, por favor intenta de nuevo');
  }
}

export async function getOrdenInfoById(id: number | string) {
  try {
    const [data] = await db
      .select({
        entidad_academica: entidad_academica.nombre,
      })
      .from(orden)
      .leftJoin(solicitud, eq(orden.id_solicitud, solicitud.id))
      .leftJoin(
        entidad_academica,
        eq(solicitud.id_entidad_academica, entidad_academica.id)
      )
      .where(eq(orden.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la información de la orden, por favor intenta de nuevo'
    );
  }
}

export async function getOrdenesAddToExistingModal(
  id_entidad_academica: number | undefined
) {
  const selectFields = {
    id: orden.id,
    entidad_academica: entidad_academica.nombre,
    id_solicitud: orden.id_solicitud,
    estado: orden_estado.nombre,
    fecha_creacion: orden.fecha_creacion,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(orden)
      .leftJoin(solicitud, eq(orden.id_solicitud, solicitud.id))
      .leftJoin(
        entidad_academica,
        eq(solicitud.id_entidad_academica, entidad_academica.id)
      )
      .leftJoin(orden_detalle, eq(orden.id, orden_detalle.id_orden))
      .leftJoin(
        solicitud_detalle,
        eq(orden_detalle.id_solicitud_detalle, solicitud_detalle.id)
      )
      .leftJoin(orden_estado, eq(orden.id_estado, orden_estado.id))
      .where(eq(solicitud.id_entidad_academica, Number(id_entidad_academica)))
      .groupBy(orden.id, entidad_academica.nombre, orden_estado.nombre)
      .orderBy(orden.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las orden, por favor intenta de nuevo.'
    );
  }
}

export async function getOrdenEstados() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${orden_estado.id} AS TEXT)`,
        label: orden_estado.nombre,
      })
      .from(orden_estado)
      .orderBy(orden_estado.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los estados de las ordenes, por favor intenta de nuevo.'
    );
  }
}
