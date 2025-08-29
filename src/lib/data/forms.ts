import { db } from '@/db/db';
import { departamentos } from '@/db/schema/departamentos';
import { sectores } from '@/db/schema/sectores';
import { subsectores } from '@/db/schema/subsectores';
import { asc, eq, sql } from 'drizzle-orm';

export async function getDepartamentos() {
  try {
    const data = await db
      .select({
        value: departamentos.id,
        label: departamentos.departamento,
      })
      .from(departamentos)
      .orderBy(asc(departamentos.departamento));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los departamentos, por favor intenta de nuevo'
    );
  }
}

export async function getSectores() {
  try {
    const data = await db
      .select({
        value: sql<string>`sectores.id::text`,
        label: sectores.sector,
      })
      .from(sectores)
      .orderBy(asc(sectores.sector));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los sectores, por favor intenta de nuevo'
    );
  }
}

export async function getSubsectoresBySector(sectorId: number | undefined) {
  if (!sectorId) {
    return [{ value: '', label: 'Selecciona un sector' }];
  }
  return db
    .select({
      value: sql<string>`subsectores.id::text`,
      label: subsectores.subsector,
    })
    .from(subsectores)
    .where(eq(subsectores.id_sector, sectorId));
}
