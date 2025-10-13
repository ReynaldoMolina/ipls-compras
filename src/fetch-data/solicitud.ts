import { db } from '@/database/db';
import { SearchParamsProps, SolicitudFormType } from '@/types/types';
import { eq, and, desc, sql } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import { buildFilterSolicitudesByYear } from './build-filter';
import { solicitud } from '@/database/schema/solicitud';
import { entidad_academica } from '@/database/schema/entidad-academica';
import { users } from '@/database/schema/user';

export async function getSolicitudesTableData(searchParams: SearchParamsProps) {
  const selectFields = {
    id: solicitud.id,
    entidad_academica: entidad_academica.nombre,
    fecha: solicitud.fecha,
    fecha_a_utilizar: solicitud.fecha_a_utilizar,
    tipo: entidad_academica.tipo,
    usuario: users.name,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    entidad_academica.nombre,
    users.name,
  ]);
  const filterByYear = buildFilterSolicitudesByYear(searchParams);
  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(solicitud)
      .leftJoin(
        entidad_academica,
        eq(solicitud.id_entidad_academica, entidad_academica.id)
      )
      .leftJoin(users, eq(solicitud.id_usuario, users.id))
      .where(and(filterBySearch, filterByYear))
      .groupBy(
        solicitud.id,
        entidad_academica.tipo,
        entidad_academica.nombre,
        users.name
      )
      .orderBy(orderBy);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las solicitudes, por favor intenta de nuevo.'
    );
  }
}

export async function getSolicitudById(
  id: number | string
): Promise<SolicitudFormType> {
  try {
    const [data] = await db
      .select({
        id: solicitud.id,
        fecha: solicitud.fecha,
        fecha_a_utilizar: solicitud.fecha_a_utilizar,
        id_entidad_academica: solicitud.id_entidad_academica,
        entidad_academica: entidad_academica.nombre,
        id_usuario: solicitud.id_usuario,
        usuario: users.name,
      })
      .from(solicitud)
      .leftJoin(users, eq(solicitud.id_usuario, users.id))
      .leftJoin(
        entidad_academica,
        eq(solicitud.id_entidad_academica, entidad_academica.id)
      )
      .where(eq(solicitud.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el solicitud, por favor intenta de nuevo'
    );
  }
}

export async function getSolicitudInfoById(id: number | string) {
  try {
    const [data] = await db
      .select({
        entidad_academica: entidad_academica.nombre,
      })
      .from(solicitud)
      .leftJoin(
        entidad_academica,
        eq(solicitud.id_entidad_academica, entidad_academica.id)
      )
      .where(eq(solicitud.id, Number(id)));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el solicitud, por favor intenta de nuevo'
    );
  }
}

export async function getUniqueYearsFromSolicitudes() {
  try {
    const data = await db
      .selectDistinct({
        year: sql<number>`EXTRACT(YEAR FROM ${solicitud.fecha})`,
      })
      .from(solicitud)
      .orderBy(desc(sql`EXTRACT(YEAR FROM ${solicitud.fecha})`));

    return data.map((e) => ({
      value: String(e.year),
      label: String(e.year),
    }));
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los años únicos desde las solicitud, por favor intenta de nuevo'
    );
  }
}

export async function getEntidadAcademicaBySolicitudId(
  id: number | string
): Promise<number> {
  try {
    const [data] = await db
      .select({
        id_entidad_academica: solicitud.id_entidad_academica,
      })
      .from(solicitud)
      .where(eq(solicitud.id, Number(id)));
    return data.id_entidad_academica;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener la entidad academica del solicitud, por favor intenta de nuevo'
    );
  }
}
