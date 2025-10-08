import { db } from '@/database/db';
import { departamento } from '@/database/schema/departamento';
import { entidad_academica } from '@/database/schema/entidad-academica';
import { proveedor } from '@/database/schema/proveedor';
import { proveedor_sector } from '@/database/schema/proveedor-sector';
import { proveedor_subsector } from '@/database/schema/proveedor-subsector';
import { asc, eq, sql } from 'drizzle-orm';

export async function getDepartamentos() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${departamento.id} AS TEXT)`,
        label: departamento.nombre,
      })
      .from(departamento)
      .orderBy(asc(departamento.nombre));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los departamento, por favor intenta de nuevo'
    );
  }
}

export async function getSectores() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${proveedor_sector.id} AS TEXT)`,
        label: proveedor_sector.nombre,
      })
      .from(proveedor_sector)
      .orderBy(asc(proveedor_sector.nombre));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los proveedor_sector, por favor intenta de nuevo'
    );
  }
}

export async function getSubsectoresBySector(
  sectorId: number | string | undefined
) {
  if (!sectorId) {
    return [{ value: '', label: 'Selecciona un sector' }];
  }
  return db
    .select({
      value: sql<string>`CAST(${proveedor_subsector.id} AS TEXT)`,
      label: proveedor_subsector.nombre,
    })
    .from(proveedor_subsector)
    .where(eq(proveedor_subsector.id_sector, Number(sectorId)));
}

export async function getEntidadesAcademicas() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${entidad_academica.id} AS TEXT)`,
        label: entidad_academica.nombre,
      })
      .from(entidad_academica)
      .orderBy(asc(entidad_academica.nombre));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las entidades, por favor intenta de nuevo'
    );
  }
}

export async function getProveedores() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${proveedor.id} AS TEXT)`,
        label: proveedor.nombre_comercial,
      })
      .from(proveedor)
      .orderBy(asc(proveedor.nombre_comercial));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los proveedor, por favor intenta de nuevo'
    );
  }
}
