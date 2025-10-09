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
    return { success: false, message: 'Missing data' };
  }

  try {
    await db.insert(presupuesto_detalle).values(data.values);

    return { success: true, message: 'Detalle agregado correctamente' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error creating solicitud detalle' };
  }
}

export async function updateSolicitudDetalle(
  id: number | undefined,
  data: PresupuestoDetalleFormType,
  id_solicitud: number
) {
  if (!id) return;

  try {
    await db
      .update(presupuesto_detalle)
      .set(data)
      .where(eq(presupuesto_detalle.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo(`/solicitudes/${id_solicitud}/detalle`);
}

export type SolicitudDetalleColumn =
  keyof typeof presupuesto_detalle.$inferInsert;

export async function updateSolicitudDetalleColumnByIds(
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

export async function deleteSolicitudDetalleByIds(
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
