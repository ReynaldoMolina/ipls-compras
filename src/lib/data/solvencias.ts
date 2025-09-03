import { db } from '@/db/db';
import { solvencias } from '@/db/schema/solvencias';
import { SearchParamsProps } from '@/types/types';
import { eq, and } from 'drizzle-orm';
import { buildSearchFilter } from './buildSearchFilter';
import { buildOrderFragment } from './buildOrderFragment';
import { buildFiltersSolvencias } from './buildFilterFragment';
import { usuarios } from '@/db/schema/usuarios';

export async function getSolvenciasByProviderId(
  id: number,
  searchParams: SearchParamsProps
) {
  const selectFields = {
    id: solvencias.id,
    id_proveedor: solvencias.id_proveedor,
    emitida: solvencias.emitida,
    vence: solvencias.vence,
    url: solvencias.url,
    verificado: solvencias.verificado,
    recibido: solvencias.recibido,
    usuario: usuarios.nombre,
  };

  const searchFilter = buildSearchFilter(searchParams, [usuarios.nombre]);
  const { solvenciaFilter } = buildFiltersSolvencias(searchParams);
  const orderFragment = buildOrderFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(solvencias)
      .leftJoin(usuarios, eq(solvencias.id_usuario, usuarios.id))
      .where(and(searchFilter, eq(solvencias.id_proveedor, id)))
      .groupBy(solvencias.id, usuarios.nombre)
      .having(solvenciaFilter)
      .orderBy(orderFragment);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las solvencias, por favor intenta de nuevo.'
    );
  }
}

export async function getSolvenciasById(id: number) {
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
