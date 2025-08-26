import { db } from '@/db/db';
import { proveedores } from '@/db/schema/proveedores';
import { solvencias } from '@/db/schema/solvencias';
import { SearchParamsProps } from '@/types/types';
import { eq, max, and } from 'drizzle-orm';
import { buildSearchFilter } from './buildSearchFilter';
import { buildOrderFragment } from './buildOrderFragment';
import { buildFiltersProviders } from './buildFilterFragment';

export async function getProviders(params: SearchParamsProps) {
  const selectFields = {
    id: proveedores.id,
    solvencia: max(solvencias.vence),
    nombre_comercial: proveedores.nombre_comercial,
    razon_social: proveedores.razon_social,
    ruc: proveedores.ruc,
    telefono: proveedores.telefono,
    departamento: proveedores.departamento,
    correo: proveedores.correo,
  };

  const searchFilter = buildSearchFilter(params, [
    proveedores.nombre_comercial,
    proveedores.razon_social,
    proveedores.ruc,
  ]);

  const { departamentoFilter, solvenciaFilter } = buildFiltersProviders(params);
  const orderFragment = buildOrderFragment(params, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(proveedores)
      .leftJoin(solvencias, eq(proveedores.id, solvencias.id_proveedor))
      .where(and(searchFilter, departamentoFilter))
      .groupBy(proveedores.id)
      .having(solvenciaFilter)
      .orderBy(orderFragment);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los proveedores, por favor intenta de nuevo.'
    );
  }
}

export async function getProviderById(id: number) {
  try {
    const data = await db
      .select()
      .from(proveedores)
      .where(eq(proveedores.id, id));
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el proveedor, por favor intenta de nuevo'
    );
  }
}
