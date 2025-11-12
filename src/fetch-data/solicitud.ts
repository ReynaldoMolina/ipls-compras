import { db } from '@/database/db';
import { SearchParamsProps, SolicitudFormType } from '@/types/types';
import { eq, and, desc, sql, isNotNull } from 'drizzle-orm';
import { buildSearchFilter } from './build-search-filter';
import { buildOrderByFragment } from './build-orderby';
import {
  buildFilterSolicitudByState,
  buildFilterSolicitudesByYear,
} from './build-filter';
import { solicitud } from '@/database/schema/solicitud';
import { entidad_academica } from '@/database/schema/entidad-academica';
import { users } from '@/database/schema/user';
import { solicitud_estado } from '@/database/schema/solicitud-estado';
import { presupuesto } from '@/database/schema/presupuesto';

export async function getSolicitudesTableData(searchParams: SearchParamsProps) {
  const selectFields = {
    id: solicitud.id,
    entidad_academica: entidad_academica.nombre,
    fecha_a_utilizar: solicitud.fecha_a_utilizar,
    estado: solicitud_estado.nombre,
    area: entidad_academica.area,
    usuario: users.name,
  };

  const filterBySearch = buildSearchFilter(searchParams, [
    entidad_academica.nombre,
    users.name,
  ]);
  const filterByYear = buildFilterSolicitudesByYear(searchParams);
  const filterBySolicitudState = buildFilterSolicitudByState(searchParams);
  const orderBy = buildOrderByFragment(searchParams, selectFields);

  try {
    const data = await db
      .select(selectFields)
      .from(solicitud)
      .leftJoin(
        entidad_academica,
        eq(solicitud.id_entidad_academica, entidad_academica.id)
      )
      .leftJoin(solicitud_estado, eq(solicitud.id_estado, solicitud_estado.id))
      .leftJoin(users, eq(solicitud.id_usuario, users.id))
      .where(and(filterBySearch, filterByYear, filterBySolicitudState))
      .groupBy(
        solicitud.id,
        entidad_academica.area,
        entidad_academica.nombre,
        solicitud_estado.nombre,
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
        id_estado: solicitud.id_estado,
        id_entidad_academica: solicitud.id_entidad_academica,
        entidad_academica: entidad_academica.nombre,
        id_usuario: solicitud.id_usuario,
        usuario: users.name,
        id_presupuesto: solicitud.id_presupuesto,
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
      'No se pudo obtener la información de la solicitud, por favor intenta de nuevo'
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

export async function getSolicitudesAddToExistingModal(
  id_entidad_academica: number | undefined
) {
  const selectFields = {
    id: solicitud.id,
    entidad_academica: entidad_academica.nombre,
    fecha_a_utilizar: solicitud.fecha_a_utilizar,
    estado: solicitud_estado.nombre,
  };

  try {
    const data = await db
      .select(selectFields)
      .from(solicitud)
      .leftJoin(
        entidad_academica,
        eq(solicitud.id_entidad_academica, entidad_academica.id)
      )
      .leftJoin(solicitud_estado, eq(solicitud.id_estado, solicitud_estado.id))
      .where(
        and(
          isNotNull(solicitud.id_presupuesto),
          eq(solicitud.id_entidad_academica, Number(id_entidad_academica))
        )
      )
      .groupBy(solicitud.id, entidad_academica.nombre, solicitud_estado.nombre)
      .orderBy(solicitud.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las solicitudes, por favor intenta de nuevo.'
    );
  }
}

export async function getSolicitudEstados() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${solicitud_estado.id} AS TEXT)`,
        label: solicitud_estado.nombre,
      })
      .from(solicitud_estado)
      .orderBy(solicitud_estado.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los estados de las solicitudes, por favor intenta de nuevo.'
    );
  }
}
