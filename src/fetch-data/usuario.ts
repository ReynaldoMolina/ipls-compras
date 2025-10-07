import { db } from '@/database/db';
import { users } from '@/database/schema/user';
import { SearchParamsProps, UsuarioTable } from '@/types/types';
import { eq, and, asc } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import {
  buildFilterUsuariosByRol,
  buildFilterUsuariosByActive,
} from './build-filter';
import { User } from 'next-auth';

export async function getUsersTableData(
  searchParams: SearchParamsProps
): Promise<UsuarioTable[]> {
  const selectFields = {
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
    activo: users.activo,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    users.name,
    users.email,
  ]);

  const filterUsuariosByRol = buildFilterUsuariosByRol(searchParams);
  const filterUsuariosByActive = buildFilterUsuariosByActive(searchParams);
  const orderFragment = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(users)
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

export async function getUserById(id: string): Promise<User> {
  try {
    const [data] = await db.select().from(users).where(eq(users.id, id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el usuarios, por favor intenta de nuevo'
    );
  }
}

export async function getUniqueRolesFromUsuarios() {
  try {
    const data = await db
      .selectDistinct({
        value: users.role,
        label: users.role,
      })
      .from(users)
      .orderBy(asc(users.role));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los roles únicos desde los usuarios, por favor intenta de nuevo'
    );
  }
}
