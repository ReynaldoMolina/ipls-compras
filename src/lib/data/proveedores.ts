import { db } from '@/db/db';
import { proveedores } from '@/db/schema/proveedores';
import { solvencias } from '@/db/schema/solvencias';
import { departamentos } from '@/db/schema/departamentos';
import { ProveedorForm, SearchParamsProps } from '@/types/types';
import { eq, max, and, asc } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import {
  buildFilterProveedoresByDepartamento,
  buildFilterProveedoresBySolvencia,
} from './build-filters';

export async function getProveedoresTableData(searchParams: SearchParamsProps) {
  const selectFields = {
    id: proveedores.id,
    solvencia: max(solvencias.vence),
    nombre_comercial: proveedores.nombre_comercial,
    razon_social: proveedores.razon_social,
    ruc: proveedores.ruc,
    telefono: proveedores.telefono,
    departamento: departamentos.departamento,
    correo: proveedores.correo,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    proveedores.nombre_comercial,
    proveedores.razon_social,
    proveedores.ruc,
  ]);

  const filterByDepartamento =
    buildFilterProveedoresByDepartamento(searchParams);

  const filterBySolvencia = buildFilterProveedoresBySolvencia(searchParams);

  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(proveedores)
      .leftJoin(solvencias, eq(proveedores.id, solvencias.id_proveedor))
      .leftJoin(
        departamentos,
        eq(proveedores.id_departamento, departamentos.id)
      )
      .where(and(filterBySearch, filterByDepartamento))
      .groupBy(proveedores.id, departamentos.departamento)
      .having(filterBySolvencia)
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los datos de la tabla proveedores, por favor intenta de nuevo.'
    );
  }
}

export async function getProveedorById(id: number): Promise<ProveedorForm> {
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

export async function getDepartamentosFromProveedores() {
  try {
    const data = await db
      .selectDistinct({
        value: departamentos.id,
        label: departamentos.departamento,
      })
      .from(proveedores)
      .innerJoin(
        departamentos,
        eq(proveedores.id_departamento, departamentos.id)
      )
      .orderBy(asc(departamentos.departamento));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los departamentos únicos desde los proveedores, por favor intenta de nuevo'
    );
  }
}
