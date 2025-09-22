import { db } from '@/database/db';
import { proveedores } from '@/database/schema/proveedores';
import { solvencias } from '@/database/schema/solvencias';
import { departamentos } from '@/database/schema/departamentos';
import { ProveedorFormType, SearchParamsProps } from '@/types/types';
import { eq, max, and, asc, sql } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import {
  buildFilterProveedoresByDepartamento,
  buildFilterBySolvencia,
} from './build-filters';

export async function getProveedoresTableData(searchParams: SearchParamsProps) {
  const selectFields = {
    id: proveedores.id,
    solvencia: max(solvencias.vence),
    nombre_comercial: proveedores.nombre_comercial,
    ruc: proveedores.ruc,
    telefono: proveedores.telefono,
    departamento: departamentos.departamento,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    proveedores.nombre_comercial,
    proveedores.ruc,
  ]);

  const filterByDepartamento =
    buildFilterProveedoresByDepartamento(searchParams);

  const filterBySolvencia = buildFilterBySolvencia(searchParams);

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

export async function getProveedorById(id: number): Promise<ProveedorFormType> {
  const selectFields = {
    id: proveedores.id,
    solvencia: max(solvencias.vence),
    nombre_comercial: proveedores.nombre_comercial,
    razon_social: proveedores.razon_social,
    ruc: proveedores.ruc,
    contacto_principal: proveedores.contacto_principal,
    telefono: proveedores.telefono,
    correo: proveedores.correo,
    id_departamento: proveedores.id_departamento,
    direccion: proveedores.direccion,
    id_sector: proveedores.id_sector,
    id_subsector: proveedores.id_subsector,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(proveedores)
      .leftJoin(solvencias, eq(proveedores.id, solvencias.id_proveedor))
      .where(eq(proveedores.id, id))
      .groupBy(proveedores.id);
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el proveedor, por favor intenta de nuevo'
    );
  }
}

export async function getUniqueDepartamentosFromProveedores() {
  try {
    const data = await db
      .selectDistinct({
        value: sql<string>`CAST(${departamentos.id} AS TEXT)`,
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
