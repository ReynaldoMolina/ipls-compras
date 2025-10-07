import { db } from '@/database/db';
import { solvencias } from '@/database/schema/proveedor-solvencia';
import { eq, and, desc, sql } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import { buildFilterBySolvencia } from './build-filter';
import { users } from '@/database/schema/user';
import { proveedores } from '@/database/schema/proveedor';
import { SearchParamsProps } from '@/types/types';

export async function getSolvenciasByProviderId(
  id_proveedor: number | string,
  searchParams: SearchParamsProps
) {
  const selectFields = {
    id: solvencias.id,
    id_proveedor: solvencias.id_proveedor,
    nombre_comercial: proveedores.nombre_comercial,
    emitida: solvencias.emitida,
    vence: solvencias.vence,
    url: solvencias.url,
    verificado: solvencias.verificado,
    recibido: solvencias.recibido,
    id_usuario: solvencias.id_usuario,
    usuario: users.name,
  };

  const filterBySearch = buildSearchFilter(searchParams, [users.name]);
  const filterBySolvencia = buildFilterBySolvencia(searchParams);
  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(solvencias)
      .leftJoin(users, eq(solvencias.id_usuario, users.id))
      .leftJoin(proveedores, eq(solvencias.id_proveedor, proveedores.id))
      .where(
        and(filterBySearch, eq(solvencias.id_proveedor, Number(id_proveedor)))
      )
      .groupBy(solvencias.id, users.name, proveedores.id)
      .having(filterBySolvencia)
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las solvencias, por favor intenta de nuevo.'
    );
  }
}

export async function getSolvenciaById(id: number | string | undefined) {
  if (!id) return;

  try {
    const data = await db
      .select()
      .from(solvencias)
      .where(eq(solvencias.id, Number(id)));
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
    year: sql<number>`extract(year from ${solvencias.emitida})`.as('year'),
  };

  try {
    const data = await db
      .selectDistinct(selectedFields)
      .from(solvencias)
      .orderBy(desc(selectedFields.year));

    return data.map((e) => ({
      value: String(e.year),
      label: String(e.year),
    }));
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los años únicos desde las solvencias, por favor intenta de nuevo'
    );
  }
}
