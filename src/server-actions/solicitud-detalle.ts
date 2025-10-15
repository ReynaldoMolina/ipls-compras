'use server';

import { db } from '@/database/db';
import { solicitud_detalle } from '@/database/schema/solicitud-detalle';
import { eq, inArray } from 'drizzle-orm';
import { SolicitudDetalleFormType } from '@/types/types';
import { revalidatePath } from 'next/cache';
import {
  stateCreateError,
  stateCreateSuccess,
  stateDeleteError,
  stateDeleteSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './statusMessages';

interface CreateSolicitudDetalle {
  values: SolicitudDetalleFormType;
  id_solicitud: number | string | undefined;
}

export async function createSolicitudDetalle(
  prevState: unknown,
  data: CreateSolicitudDetalle
) {
  if (!data.values) {
    return {
      success: false,
      title: 'Error',
      message: 'Faltan datos por ingresar.',
    };
  }

  try {
    await db.insert(solicitud_detalle).values(data.values);

    revalidatePath(`/solicitudes/${data.id_solicitud}`);
    return stateCreateSuccess;
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateSolicitudDetalle {
  id: number | string | undefined;
  values: SolicitudDetalleFormType;
  id_solicitud: number | string | undefined;
}

export async function updateSolicitudDetalle(
  prevState: unknown,
  data: UpdateSolicitudDetalle
) {
  if (!data.id) return;

  try {
    await db
      .update(solicitud_detalle)
      .set(data.values)
      .where(eq(solicitud_detalle.id, Number(data.id)));

    revalidatePath(`/solicitudes/${data.id_solicitud}`);
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

export async function deleteSolicitudDetalleByIds(ids: number[]) {
  if (ids?.length === 0) return stateDeleteError;

  try {
    await db
      .delete(solicitud_detalle)
      .where(inArray(solicitud_detalle.id, ids));

    return stateDeleteSuccess;
  } catch (error) {
    console.error(error);
    return stateDeleteError;
  }
}

export async function createSolicitudDetalleBySelectedRows(
  selectedRows: SolicitudDetalleFormType[],
  id_solicitud: number
) {
  if (!selectedRows) return stateCreateError;

  try {
    const data = selectedRows.map((row) => ({
      id_solicitud,
      producto_servicio: row.producto_servicio,
      cantidad: row.cantidad,
      unidad_medida: row.unidad_medida,
      observacion: row.observacion,
      id_presupuesto_detalle: row.id_presupuesto_detalle,
    }));

    await db.insert(solicitud_detalle).values(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando el detalle de la solicitud');
  }
}

interface AddToExistingSolicitudDetalleBySelectedRows {
  selectedRows: SolicitudDetalleFormType[];
  id_solicitud: number;
}

export async function addToExistingSolicitudDetalleBySelectedRows(
  prevState: unknown,
  data: AddToExistingSolicitudDetalleBySelectedRows
) {
  if (!data.id_solicitud) return stateUpdateError;

  try {
    const processedData = data.selectedRows.map((row) => ({
      id_solicitud: data.id_solicitud,
      producto_servicio: row.producto_servicio,
      cantidad: row.cantidad,
      unidad_medida: row.unidad_medida,
      observacion: row.observacion,
      id_presupuesto_detalle: row.id,
    }));

    await db.insert(solicitud_detalle).values(processedData);

    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
