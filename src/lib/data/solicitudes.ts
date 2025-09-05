import { db } from '@/db/db';
import { SearchParamsProps } from '@/types/types';
import { eq, max, and, asc } from 'drizzle-orm';
import { buildSearchFilter } from './buildSearchFilter';
import { buildOrderFragment } from './buildOrderFragment';
import { buildFiltersProviders } from './buildFilterFragment';
import { solicitudes } from '@/db/schema/solicitudes';
import { entidades_academicas } from '@/db/schema/entidades-academicas';

export async function getSolicitudes(params: SearchParamsProps) {
  const selectFields = {
    id: solicitudes.id,
    fecha: solicitudes.fecha,
    tipo: entidades_academicas.tipo,
    entidad_academica: entidades_academicas.nombre,
  };

  const searchFilter = buildSearchFilter(params, [entidades_academicas.nombre]);

  const { departamentoFilter, solvenciaFilter } = buildFiltersProviders(params);
  const orderFragment = buildOrderFragment(params, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(solicitudes)
      .leftJoin(
        entidades_academicas,
        eq(solicitudes.id_entidad_academica, entidades_academicas.id)
      )
      .where(and(searchFilter))
      .groupBy(
        solicitudes.id,
        entidades_academicas.tipo,
        entidades_academicas.nombre
      )
      .having(solvenciaFilter)
      .orderBy(orderFragment);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las solicitudes, por favor intenta de nuevo.'
    );
  }
}

// export async function getSolicitudById(id: number): Promise<Provider> {
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
