import { db } from '@/db/db';
import { usuarios } from '@/db/schema/usuarios';
import { SearchParamsProps } from '@/types/types';
import { eq, and, asc } from 'drizzle-orm';
import { buildSearchFilter } from './buildSearchFilter';
import { buildOrderFragment } from './buildOrderFragment';
import { buildFiltersUsuarios } from './buildFilterFragment';

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
  const orderFragment = buildOrderFragment(params, selectFields);

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

// export async function getProviderById(id: number): Promise<Provider> {
//   try {
//     const data = await db
//       .select()
//       .from(proveedores)
//       .where(eq(proveedores.id, id));
//     return data[0];
//   } catch (error) {
//     console.error(error);
//     throw new Error(
//       'No se pudo obtener el proveedor, por favor intenta de nuevo'
//     );
//   }
// }

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
