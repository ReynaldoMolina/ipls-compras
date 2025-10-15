'use server';

import { db } from '@/database/db';
import { orden_detalle } from '@/database/schema/orden-detalle';
import { OrdenDetalleFormType } from '@/types/types';
import { eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import {
  stateCreateError,
  stateDeleteError,
  stateDeleteSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './statusMessages';

interface UpdateOrdenDetalle {
  id: number | string | undefined;
  values: OrdenDetalleFormType;
  id_orden: number | string | undefined;
}

export async function updateOrdenDetalle(
  prevState: unknown,
  data: UpdateOrdenDetalle
) {
  if (!data.id) return;

  try {
    await db
      .update(orden_detalle)
      .set(data.values)
      .where(eq(orden_detalle.id, Number(data.id)));

    revalidatePath(`/ordenes/${data.id_orden}`);
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

export async function deleteOrdenDetalleByIds(ids: number[]) {
  if (ids?.length === 0) return stateDeleteError;

  try {
    await db.delete(orden_detalle).where(inArray(orden_detalle.id, ids));

    return stateDeleteSuccess;
  } catch (error) {
    console.error(error);
    return stateDeleteError;
  }
}

export async function createOrdenDetalleBySelectedRows(
  selectedRows: OrdenDetalleFormType[],
  id_orden: number
) {
  if (!selectedRows) return stateCreateError;

  try {
    const data = selectedRows.map((row) => ({
      id_orden,
      id_solicitud_detalle: row.id_solicitud_detalle,
      cantidad: row.cantidad,
      precio: row.precio,
      observacion: row.observacion,
    }));

    await db.insert(orden_detalle).values(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando el detalle de la solicitud');
  }
}

interface AddToExistingOrdenDetalleBySelectedRows {
  selectedRows: OrdenDetalleFormType[];
  id_orden: number;
}

export async function addToExistingOrdenDetalleBySelectedRows(
  prevState: unknown,
  data: AddToExistingOrdenDetalleBySelectedRows
) {
  if (!data.id_orden) return stateUpdateError;

  try {
    const processedData = data.selectedRows.map((row) => ({
      id_orden: data.id_orden,
      id_solicitud_detalle: row.id_solicitud_detalle,
      cantidad: row.cantidad,
      precio: row.precio,
      observacion: row.observacion,
    }));

    await db.insert(orden_detalle).values(processedData);

    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
