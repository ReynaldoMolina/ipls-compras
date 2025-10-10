'use server';

import { db } from '@/database/db';
import { goBackTo } from './go-back-to-list';
import { presupuesto_detalle } from '@/database/schema/presupuesto-detalle';
import { eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { PresupuestoDetalleFormType } from '@/types/types';

interface CreatePresupuestoDetalle {
  values: PresupuestoDetalleFormType;
}

export async function createPresupuestoDetalle(
  prevState: unknown,
  data: CreatePresupuestoDetalle
) {
  if (!data.values) {
    return { success: false, message: 'Faltan datos por ingresar.' };
  }

  try {
    await db.insert(presupuesto_detalle).values(data.values);

    return { success: true, message: 'Producto agregado correctamente.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error creando el producto.' };
  }
}

interface UpdatePresupuestoDetalle {
  id: number | string | undefined;
  values: PresupuestoDetalleFormType;
}

export async function updatePresupuestoDetalle(
  prevState: unknown,
  data: UpdatePresupuestoDetalle
) {
  if (!data.id) return;

  try {
    await db
      .update(presupuesto_detalle)
      .set(data.values)
      .where(eq(presupuesto_detalle.id, Number(data.id)));

    return { success: true, message: 'Producto actualizado correctamente.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error actualizando el producto.' };
  }
  // await goBackTo(`/solicitudes/${id_solicitud}/detalle`);
}

export type SolicitudDetalleColumn =
  keyof typeof presupuesto_detalle.$inferInsert;

export async function updatePresupuestoDetalleColumnByIds(
  ids: number[],
  column: SolicitudDetalleColumn,
  value: number | string
) {
  if (ids?.length === 0) return;

  try {
    await db
      .update(presupuesto_detalle)
      .set({ [column]: value })
      .where(inArray(presupuesto_detalle.id, ids));
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deletePresupuestoDetalleByIds(
  ids: number[],
  id_solicitud?: number
) {
  if (ids?.length === 0 || !id_solicitud) return;

  try {
    await db
      .delete(presupuesto_detalle)
      .where(inArray(presupuesto_detalle.id, ids));
  } catch (error) {
    console.error(error);
    return error;
  }
  revalidatePath(`/solicitudes/${id_solicitud}/detalle`);
}
