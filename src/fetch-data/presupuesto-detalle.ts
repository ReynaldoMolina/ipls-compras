import { db } from '@/database/db';
import { categoria_producto } from '@/database/schema/categoria_producto';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';
import { unidad_medida } from '@/database/schema/unidad-medida';
import {
  PresupuestoDetalleFormType,
  PresupuestoDetalleTable,
} from '@/types/types';
import { asc, sql, eq } from 'drizzle-orm';

export async function getPresupuestoDetalleByPresupuestoId(
  id_presupuesto: number | string
): Promise<PresupuestoDetalleTable[]> {
  const selectFields = {
    id: presupuesto_detalle.id,
    id_presupuesto: presupuesto_detalle.id_presupuesto,
    producto_servicio: presupuesto_detalle.producto_servicio,
    cantidad: presupuesto_detalle.cantidad,
    unidad_medida: unidad_medida.nombre,
    precio_sugerido: presupuesto_detalle.precio_sugerido,
    categoria: categoria_producto.nombre,
  };
  try {
    const data = await db
      .select(selectFields)
      .from(presupuesto_detalle)
      .leftJoin(
        unidad_medida,
        eq(presupuesto_detalle.id_unidad_medida, unidad_medida.id)
      )
      .leftJoin(
        categoria_producto,
        eq(presupuesto_detalle.id_categoria, categoria_producto.id)
      )
      .where(eq(presupuesto_detalle.id_presupuesto, Number(id_presupuesto)))
      .orderBy(presupuesto_detalle.id);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudo obtener el detalle del presupuesto, por favor intenta de nuevo'
    );
  }
}

export async function getPresupuestoDetalleById(
  id: number | string | undefined
): Promise<PresupuestoDetalleFormType> {
  try {
    const data = await db
      .select()
      .from(presupuesto_detalle)
      .where(eq(presupuesto_detalle.id, Number(id)))
      .orderBy(presupuesto_detalle.id);
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
        value: sql<string>`CAST(${unidad_medida.id} AS TEXT)`,
        label: unidad_medida.nombre,
      })
      .from(unidad_medida)
      .orderBy(asc(unidad_medida.nombre));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener los unidades de medida, por favor intenta de nuevo'
    );
  }
}

export async function getDetalleCategorias() {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${categoria_producto.id} AS TEXT)`,
        label: categoria_producto.nombre,
      })
      .from(categoria_producto)
      .orderBy(asc(categoria_producto.nombre));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'No se pudieron obtener las categorias, por favor intenta de nuevo'
    );
  }
}
