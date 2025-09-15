import { db } from '@/db/db';
import { usuarios } from '@/db/schema/usuarios';
import { SearchParamsProps, Usuario } from '@/types/types';
import { eq, and } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import { buildFiltersUsuarios } from './build-filters';

export async function getUsers(params: SearchParamsProps) {
  const selectFields = {
    id: usuarios.id,
    nombre: usuarios.nombre,
    apellido: usuarios.apellido,
    correo: usuarios.correo,
    rol: usuarios.rol,
    activo: usuarios.activo,
  };

  const searchFilter = buildSearchFilter(params, [
    usuarios.nombre,
    usuarios.apellido,
  ]);

  const { rolesFilter } = buildFiltersUsuarios(params);
  const orderFragment = buildOrderByFragment(params, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(usuarios)
      .where(and(searchFilter, rolesFilter))
      .orderBy(orderFragment);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los usuarios, por favor intenta de nuevo.'
    );
  }
}

export async function getUserById(id: number): Promise<Usuario> {
  try {
    const data = await db.select().from(usuarios).where(eq(usuarios.id, id));
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el usuario, por favor intenta de nuevo'
    );
  }
}

// export async function getProvidersDepartamentos() {
//   try {
//     const data = await db
//       .selectDistinct({
//         value: departamentos.id,
//         label: departamentos.departamento,
//       })
//       .from(proveedores)
//       .innerJoin(
//         departamentos,
//         eq(proveedores.id_departamento, departamentos.id)
//       )
//       .orderBy(asc(departamentos.departamento));
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       'No se pudieron obtener los departamentos, por favor intenta de nuevo'
//     );
//   }
// }
