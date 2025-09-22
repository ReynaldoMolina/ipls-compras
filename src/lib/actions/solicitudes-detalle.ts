'use server';

import { db } from '@/db/db';
import { goBackTo } from './go-back-to-list';
import { solicitudes_detalle } from '@/db/schema/solicitudes-detalle';
import { eq, inArray } from 'drizzle-orm';
import { SolicitudDetalleFormType } from '@/types/types';
import { revalidatePath } from 'next/cache';

export async function createSolicitudDetalle(
  data: SolicitudDetalleFormType,
  idSolicitud: number
) {
  try {
    await db.insert(solicitudes_detalle).values(data);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating solicitud detalle' };
  }
  await goBackTo(`/solicitudes/${idSolicitud}/detalle`);
}

export async function updateSolicitudDetalle(
  id: number | undefined,
  data: SolicitudDetalleFormType,
  id_solicitud: number
) {
  if (!id) return;
  try {
    await db
      .update(solicitudes_detalle)
      .set(data)
      .where(eq(solicitudes_detalle.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo(`/solicitudes/${id_solicitud}/detalle`);
}

export type SolicitudDetalleColumn =
  keyof typeof solicitudes_detalle.$inferInsert;

export async function updateSolicitudDetalleColumnByIds(
  ids: number[],
  column: SolicitudDetalleColumn,
  value: number | string,
  id_solicitud: number
) {
  if (ids?.length === 0) return;

  try {
    await db
      .update(solicitudes_detalle)
      .set({ [column]: value })
      .where(inArray(solicitudes_detalle.id, ids));
  } catch (error) {
    console.error(error);
    return error;
  }

  revalidatePath(`/solicitudes/${id_solicitud}/detalle`);
}

export async function deleteSolicitudDetalleByIds(
  ids: number[],
  id_solicitud?: number
) {
  if (ids?.length === 0 || !id_solicitud) return;

  try {
    await db
      .delete(solicitudes_detalle)
      .where(inArray(solicitudes_detalle.id, ids));
  } catch (error) {
    console.error(error);
    return error;
  }
  revalidatePath(`/solicitudes/${id_solicitud}/detalle`);
}
