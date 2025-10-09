import { db } from '@/database/db';
import { proveedor_solvencia } from '@/database/schema/proveedor-solvencia';
import { eq, and, desc, sql } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import { buildFilterBySolvencia } from './build-filter';
import { users } from '@/database/schema/user';
import { proveedor } from '@/database/schema/proveedor';
import { SearchParamsProps } from '@/types/types';

export async function getSolvenciasByProviderId(
  id_proveedor: number | string,
  searchParams: SearchParamsProps
) {
  const selectFields = {
    id: proveedor_solvencia.id,
    id_proveedor: proveedor_solvencia.id_proveedor,
    nombre_comercial: proveedor.nombre_comercial,
    emitida: proveedor_solvencia.emitida,
    vence: proveedor_solvencia.vence,
    url: proveedor_solvencia.url,
    verificado: proveedor_solvencia.verificado,
    recibido: proveedor_solvencia.recibido,
    id_usuario: proveedor_solvencia.id_usuario,
    usuario: users.name,
  };

  const filterBySearch = buildSearchFilter(searchParams, [users.name]);
  const filterBySolvencia = buildFilterBySolvencia(searchParams);
  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(proveedor_solvencia)
      .leftJoin(users, eq(proveedor_solvencia.id_usuario, users.id))
      .leftJoin(proveedor, eq(proveedor_solvencia.id_proveedor, proveedor.id))
      .where(
        and(
          filterBySearch,
          eq(proveedor_solvencia.id_proveedor, Number(id_proveedor))
        )
      )
      .groupBy(proveedor_solvencia.id, users.name, proveedor.id)
      .having(filterBySolvencia)
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las proveedor_solvencia, por favor intenta de nuevo.'
    );
  }
}

export async function getSolvenciaProveedorInfoById(
  id: number | string | undefined
) {
  if (!id) return;

  try {
    const [data] = await db
      .select({
        nombre_comercial: proveedor.nombre_comercial,
      })
      .from(proveedor)
      .where(eq(proveedor.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el nombre del proveedor, por favor intenta de nuevo.'
    );
  }
}

export async function getSolvenciaById(id: number | string | undefined) {
  if (!id) return;

  try {
    const data = await db
      .select()
      .from(proveedor_solvencia)
      .where(eq(proveedor_solvencia.id, Number(id)));
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la solvencia, por favor intenta de nuevo.'
    );
  }
}

export async function getUniqueYearsFromSolvencias() {
  const selectedFields = {
    year: sql<number>`extract(year from ${proveedor_solvencia.verificado})`.as(
      'year'
    ),
  };

  try {
    const data = await db
      .selectDistinct(selectedFields)
      .from(proveedor_solvencia)
      .orderBy(desc(selectedFields.year));

    return data.map((e) => ({
      value: String(e.year),
      label: String(e.year),
    }));
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los años únicos desde las proveedor_solvencia, por favor intenta de nuevo'
    );
  }
}
