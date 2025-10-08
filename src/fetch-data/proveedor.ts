import { db } from '@/database/db';
import { proveedor } from '@/database/schema/proveedor';
import { proveedor_solvencia } from '@/database/schema/proveedor-solvencia';
import { departamento } from '@/database/schema/departamento';
import { ProveedorFormType, SearchParamsProps } from '@/types/types';
import { eq, max, and, asc, sql } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import {
  buildFilterProveedoresByDepartamento,
  buildFilterBySolvencia,
} from './build-filter';

export async function getProveedoresTableData(searchParams: SearchParamsProps) {
  const selectFields = {
    id: proveedor.id,
    solvencia: max(proveedor_solvencia.vence),
    nombre_comercial: proveedor.nombre_comercial,
    ruc: proveedor.ruc,
    telefono: proveedor.telefono,
    departamento: departamento.nombre,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    proveedor.nombre_comercial,
    proveedor.ruc,
  ]);

  const filterByDepartamento =
    buildFilterProveedoresByDepartamento(searchParams);

  const filterBySolvencia = buildFilterBySolvencia(searchParams);

  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(proveedor)
      .leftJoin(
        proveedor_solvencia,
        eq(proveedor.id, proveedor_solvencia.id_proveedor)
      )
      .leftJoin(departamento, eq(proveedor.id_departamento, departamento.id))
      .where(and(filterBySearch, filterByDepartamento))
      .groupBy(proveedor.id, departamento.nombre)
      .having(filterBySolvencia)
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los datos de la tabla proveedor, por favor intenta de nuevo.'
    );
  }
}

export async function getProveedorById(
  id: number | string
): Promise<ProveedorFormType> {
  const selectFields = {
    id: proveedor.id,
    solvencia: max(proveedor_solvencia.vence),
    nombre_comercial: proveedor.nombre_comercial,
    razon_social: proveedor.razon_social,
    ruc: proveedor.ruc,
    contacto_principal: proveedor.contacto_principal,
    telefono: proveedor.telefono,
    correo: proveedor.correo,
    id_departamento: proveedor.id_departamento,
    direccion: proveedor.direccion,
    id_sector: proveedor.id_sector,
    id_subsector: proveedor.id_subsector,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(proveedor)
      .leftJoin(
        proveedor_solvencia,
        eq(proveedor.id, proveedor_solvencia.id_proveedor)
      )
      .where(eq(proveedor.id, Number(id)))
      .groupBy(proveedor.id);
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
        value: sql<string>`CAST(${departamento.id} AS TEXT)`,
        label: departamento.nombre,
      })
      .from(proveedor)
      .innerJoin(departamento, eq(proveedor.id_departamento, departamento.id))
      .orderBy(asc(departamento.nombre));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los departamento únicos desde los proveedor, por favor intenta de nuevo'
    );
  }
}
