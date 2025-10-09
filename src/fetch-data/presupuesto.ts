import { db } from '@/database/db';
import { PresupuestoFormType, SearchParamsProps } from '@/types/types';
import { eq, and, sql, desc } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import { buildFilterPresupuestosByYear } from './build-filter';
import { presupuesto } from '@/database/schema/presupuesto';
import { entidad_academica } from '@/database/schema/entidad-academica';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';

export async function getPresupuestosTableData(
  searchParams: SearchParamsProps
) {
  const selectFields = {
    id: presupuesto.id,
    entidad_academica: entidad_academica.nombre,
    year: presupuesto.year,
    tipo: entidad_academica.tipo,
    presupuestado: sql<number>`SUM(${presupuesto_detalle.cantidad} * ${presupuesto_detalle.precio_sugerido})`,
    // restante: sql<number>`
    //   SUM(${presupuesto_detalle.cantidad} * ${presupuesto_detalle.precio})
    //   - (
    //     COALESCE(SUM(${presupuesto_detalle.precio_compra}), 0)
    //     + COALESCE(SUM(${presupuesto_detalle.precio_bodega}), 0)
    //   )
    // `,
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
      'No se pudieron obtener las presupuesto, por favor intenta de nuevo.'
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
      'No se pudieron obtener los años únicos desde las presupuesto, por favor intenta de nuevo'
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
