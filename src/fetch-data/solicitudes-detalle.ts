import { db } from '@/database/db';
import { categoria_productos } from '@/database/schema/categoria_productos';
import { solicitudes_detalle } from '@/database/schema/solicitudes-detalle';
import { solicitudes_estados } from '@/database/schema/solicitudes-estados';
import { ubicaciones } from '@/database/schema/ubicaciones';
import { unidades_medida } from '@/database/schema/unidades-medida';
import { SolicitudDetalleFormType, SolicitudDetalleTable } from '@/types/types';
import { asc, sql, eq } from 'drizzle-orm';

export async function getSolicitudDetalleBySolicitudId(
  id_solicitud: number
): Promise<SolicitudDetalleTable[]> {
  const selectFields = {
    id: solicitudes_detalle.id,
    id_solicitud: solicitudes_detalle.id_solicitud,
    producto_servicio: solicitudes_detalle.producto_servicio,
    cantidad: solicitudes_detalle.cantidad,
    unidad_medida: unidades_medida.unidad_medida,
    precio: solicitudes_detalle.precio,
    observaciones: solicitudes_detalle.observaciones,
    prioridad: solicitudes_detalle.prioridad,
    id_estado: solicitudes_detalle.id_estado,
    estado: solicitudes_estados.estado,
    comprado: solicitudes_detalle.comprado,
    recibido: solicitudes_detalle.recibido,
    precio_compra: solicitudes_detalle.precio_compra,
    entrega_bodega: solicitudes_detalle.entrega_bodega,
    precio_bodega: solicitudes_detalle.precio_bodega,
    ubicacion: ubicaciones.ubicacion,
    categoria: categoria_productos.categoria,
  };
  try {
    const data = await db
      .select(selectFields)
      .from(solicitudes_detalle)
      .leftJoin(
        unidades_medida,
        eq(solicitudes_detalle.id_unidad_medida, unidades_medida.id)
      )
      .leftJoin(
        solicitudes_estados,
        eq(solicitudes_detalle.id_estado, solicitudes_estados.id)
      )
      .leftJoin(
        ubicaciones,
        eq(solicitudes_detalle.id_ubicacion, ubicaciones.id)
      )
      .leftJoin(
        categoria_productos,
        eq(solicitudes_detalle.id_categoria, categoria_productos.id)
      )
      .where(eq(solicitudes_detalle.id_solicitud, id_solicitud))
      .orderBy(solicitudes_detalle.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle de la solicitud, por favor intenta de nuevo'
    );
  }
}

export async function getSolicitudDetalleById(
  id: number
): Promise<SolicitudDetalleFormType> {
  try {
    const data = await db
      .select()
      .from(solicitudes_detalle)
      .where(eq(solicitudes_detalle.id, id))
      .orderBy(solicitudes_detalle.id);
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle de la solicitud, por favor intenta de nuevo'
    );
  }
}

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
