import { db } from '@/db/db';
import { solvencias } from '@/db/schema/solvencias';
import { SearchParamsProps } from '@/types/types';
import { eq, and } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import { buildFilterBySolvencia } from './build-filters';
import { usuarios } from '@/db/schema/usuarios';
import { proveedores } from '@/db/schema/proveedores';

export async function getSolvenciasByProviderId(
  id_proveedor: number,
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
    usuario: usuarios.nombre,
  };

  const filterBySearch = buildSearchFilter(searchParams, [usuarios.nombre]);
  const filterBySolvencia = buildFilterBySolvencia(searchParams);
  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(solvencias)
      .leftJoin(usuarios, eq(solvencias.id_usuario, usuarios.id))
      .leftJoin(proveedores, eq(solvencias.id_proveedor, proveedores.id))
      .where(and(filterBySearch, eq(solvencias.id_proveedor, id_proveedor)))
      .groupBy(solvencias.id, usuarios.nombre, proveedores.id)
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

export async function getSolvenciaById(id: number) {
  try {
    const data = await db
      .select()
      .from(solvencias)
      .where(eq(solvencias.id, id));
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la solvencia, por favor intenta de nuevo.'
    );
  }
}
