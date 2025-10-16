import { db } from '@/database/db';
import {
  PresupuestoDetalleModal,
  PresupuestoFormType,
  SearchParamsProps,
} from '@/types/types';
import { eq, and, sql, desc, asc } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import { buildFilterPresupuestosByYear } from './build-filter';
import { presupuesto } from '@/database/schema/presupuesto';
import { entidad_academica } from '@/database/schema/entidad-academica';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';
import { solicitud_detalle } from '@/database/schema/solicitud-detalle';
import { orden_detalle } from '@/database/schema/orden-detalle';

export async function getPresupuestosTableData(
  searchParams: SearchParamsProps
) {
  const selectFields = {
    id: presupuesto.id,
    entidad_academica: entidad_academica.nombre,
    year: presupuesto.year,
    tipo: entidad_academica.tipo,
    presupuestado: sql<number>`SUM(${presupuesto_detalle.cantidad} * ${presupuesto_detalle.precio_sugerido})`,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    entidad_academica.nombre,
  ]);
  const filterByYear = buildFilterPresupuestosByYear(searchParams);
  const orderBy = buildOrderByFragment(searchParams, selectFields);

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
      .where(and(filterBySearch, filterByYear))
      .groupBy(presupuesto.id, entidad_academica.tipo, entidad_academica.nombre)
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los presupuestos, por favor intenta de nuevo.'
    );
  }
}

export async function getPresupuestosModal(
  id_entidad: number | string | undefined
) {
  const selectFields = {
    id: presupuesto.id,
    entidad_academica: entidad_academica.nombre,
    year: presupuesto.year,
    tipo: entidad_academica.tipo,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(presupuesto)
      .leftJoin(
        entidad_academica,
        eq(presupuesto.id_entidad_academica, entidad_academica.id)
      )
      .where(
        id_entidad
          ? eq(presupuesto.id_entidad_academica, Number(id_entidad))
          : undefined
      )
      .groupBy(presupuesto.id, entidad_academica.tipo, entidad_academica.nombre)
      .orderBy(asc(presupuesto.id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los presupuestos, por favor intenta de nuevo.'
    );
  }
}

export async function getPresupuestoDetalleModal(): Promise<
  PresupuestoDetalleModal[]
> {
  try {
    const data = await db
      .select({
        id: presupuesto_detalle.id,
        producto_servicio: presupuesto_detalle.producto_servicio,
        prioridad: presupuesto_detalle.prioridad,
        restante: sql<number>`
          ${presupuesto_detalle.cantidad} - COALESCE(SUM(${solicitud_detalle.cantidad}), 0)
        `,
        unidad_medida: presupuesto_detalle.unidad_medida,
      })
      .from(presupuesto_detalle)
      .leftJoin(
        solicitud_detalle,
        eq(presupuesto_detalle.id, solicitud_detalle.id_presupuesto_detalle)
      )
      .leftJoin(
        orden_detalle,
        eq(solicitud_detalle.id, orden_detalle.id_solicitud_detalle)
      )
      .groupBy(presupuesto_detalle.id)
      .orderBy(asc(presupuesto_detalle.id));

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los presupuestos, por favor intenta de nuevo.'
    );
  }
}

export async function getPresupuestoById(
  id: number | string
): Promise<PresupuestoFormType> {
  try {
    const data = await db
      .select({
        id: presupuesto.id,
        year: presupuesto.year,
        id_entidad_academica: presupuesto.id_entidad_academica,
        entidad_academica: entidad_academica.nombre,
      })
      .from(presupuesto)
      .leftJoin(
        entidad_academica,
        eq(presupuesto.id_entidad_academica, entidad_academica.id)
      )
      .where(eq(presupuesto.id, Number(id)));
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el presupuesto, por favor intenta de nuevo'
    );
  }
}

export async function getUniqueYearsFromPresupuestos() {
  try {
    const data = await db
      .selectDistinct({
        year: presupuesto.year,
      })
      .from(presupuesto)
      .orderBy(desc(presupuesto.year));

    return data.map((e) => ({ value: String(e.year), label: String(e.year) }));
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los años únicos desde los presupuestos, por favor intenta de nuevo'
    );
  }
}

export async function getEntidadAcademicaByPresupuestoId(
  id: number | string
): Promise<number> {
  try {
    const [data] = await db
      .select({
        id_entidad_academica: presupuesto.id_entidad_academica,
      })
      .from(presupuesto)
      .where(eq(presupuesto.id, Number(id)));
    return data.id_entidad_academica;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la entidad academica del presupuesto, por favor intenta de nuevo'
    );
  }
}
