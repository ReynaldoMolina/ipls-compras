import { db } from '@/database/db';
import { usuarios } from '@/database/schema/usuarios';
import { SearchParamsProps, Usuario } from '@/types/types';
import { eq, and, asc } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import {
  buildFilterUsuariosByRol,
  buildFilterUsuariosByActive,
} from './build-filters';

export async function getUsersTableData(searchParams: SearchParamsProps) {
  const selectFields = {
    id: usuarios.id,
    name: usuarios.name,
    email: usuarios.email,
    role: usuarios.role,
    activo: usuarios.activo,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    usuarios.name,
    usuarios.email,
  ]);

  const filterUsuariosByRol = buildFilterUsuariosByRol(searchParams);
  const filterUsuariosByActive = buildFilterUsuariosByActive(searchParams);
  const orderFragment = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(usuarios)
      .where(and(filterBySearch, filterUsuariosByRol, filterUsuariosByActive))
      .orderBy(orderFragment);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los usuarios, por favor intenta de nuevo.'
    );
  }
}

export async function getUserById(id: string): Promise<Usuario> {
  try {
    const [data] = await db.select().from(usuarios).where(eq(usuarios.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el usuarios, por favor intenta de nuevo'
    );
  }
}

export async function getUniqueRolsFromUsuarios() {
  try {
    const data = await db
      .selectDistinct({
        value: usuarios.role,
        label: usuarios.role,
      })
      .from(usuarios)
      .orderBy(asc(usuarios.role));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los roles únicos desde los usuarios, por favor intenta de nuevo'
    );
  }
}
