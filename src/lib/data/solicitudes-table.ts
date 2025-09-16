import { db } from '@/db/db';
import { categoria_productos } from '@/db/schema/categoria_productos';
import { solicitudes_estados } from '@/db/schema/solicitudes-estados';
import { ubicaciones } from '@/db/schema/ubicaciones';
import { unidades_medida } from '@/db/schema/unidades-medida';
import { asc, sql } from 'drizzle-orm';

export async function getUnidadesMedida() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${unidades_medida.id} AS TEXT)`,
        label: unidades_medida.unidad_medida,
      })
      .from(unidades_medida)
      .orderBy(asc(unidades_medida.unidad_medida));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los unidades de medida, por favor intenta de nuevo'
    );
  }
}

export async function getDetalleEstados() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${solicitudes_estados.id} AS TEXT)`,
        label: solicitudes_estados.estado,
      })
      .from(solicitudes_estados)
      .orderBy(asc(solicitudes_estados.estado));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los estados, por favor intenta de nuevo'
    );
  }
}

export async function getDetalleUbicaciones() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${ubicaciones.id} AS TEXT)`,
        label: ubicaciones.ubicacion,
      })
      .from(ubicaciones)
      .orderBy(asc(ubicaciones.ubicacion));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las ubicaciones, por favor intenta de nuevo'
    );
  }
}

export async function getDetalleCategorias() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${categoria_productos.id} AS TEXT)`,
        label: categoria_productos.categoria,
      })
      .from(categoria_productos)
      .orderBy(asc(categoria_productos.categoria));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las categorias, por favor intenta de nuevo'
    );
  }
}
