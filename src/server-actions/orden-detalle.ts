'use server';

import { db } from '@/database/db';
import { orden_detalle } from '@/database/schema/orden-detalle';
import { OrdenDetalleType } from '@/types/types';
import { eq, inArray } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { goBackTo } from './go-back-to-list';
import { revalidatePath } from 'next/cache';

export async function createOrdenDetalleBySelectedIds(
  selectedRowsIds: number[],
  orden: {
    id: number;
    id_solicitud: number;
  }
) {
  if (!orden) return;

  try {
    const data = selectedRowsIds.map((id_solicitud_detalle) => ({
      id_orden: orden.id,
      id_solicitud_detalle,
      cantidad: 0,
      precio_real: 0,
      observaciones: '',
    }));

    await db.insert(orden_detalle).values(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando el detalle de la orden');
  }
}

export async function addToExistingOrdenDetalleBySelectedIds(
  selectedRowsIds: number[],
  orden: OrdenesModal
) {
  if (!orden) return;

  try {
    const data = selectedRowsIds.map((id_solicitud_detalle) => ({
      id_orden: orden.id,
      id_solicitud_detalle,
      cantidad: 0,
      precio_real: 0,
      observaciones: '',
    }));

    await db.insert(orden_detalle).values(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando el detalle de la orden');
  }

  redirect(`/solicitudes/${orden.id_solicitud}/ordenes/${orden.id}/detalle`);
}

export async function updateOrdenDetalleById(
  id: number | undefined,
  data: OrdenDetalleType
) {
  if (!id) return;
  try {
    await db.update(orden_detalle).set(data).where(eq(orden_detalle.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo(`/solicitudes/${1}/ordenes/${data.id_orden}/detalle`);
}

export async function deleteOrdenDetalleByIds(
  ids: number[],
  id_orden?: number,
  id_solicitud?: number
) {
  if (ids?.length === 0 || !id_orden) return;

  try {
    await db.delete(orden_detalle).where(inArray(orden_detalle.id, ids));
  } catch (error) {
    console.error(error);
    return error;
  }
  revalidatePath(`/solicitudes/${id_solicitud}/ordenes/${id_orden}/detalle`);
}
