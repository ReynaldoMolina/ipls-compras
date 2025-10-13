'use server';

import { db } from '@/database/db';
import { SolicitudDetalleFormType, SolicitudFormType } from '@/types/types';
import { eq } from 'drizzle-orm';
import { solicitud } from '@/database/schema/solicitud';
import { revalidatePath } from 'next/cache';
import {
  stateCreateError,
  stateCreateSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './statusMessages';
import { createSolicitudDetalleBySelectedRows } from './solicitud-detalle';

interface CreateSolicitud {
  values: SolicitudFormType;
}

export async function createSolicitud(
  prevState: unknown,
  data: CreateSolicitud
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(solicitud)
      .values(data.values)
      .returning({ id: solicitud.id });

    return {
      ...stateCreateSuccess,
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateSolicitud {
  id: number | string | undefined;
  values: SolicitudFormType;
}

export async function updateSolicitud(
  prevState: unknown,
  data: UpdateSolicitud
) {
  if (!data.id) return;

  try {
    await db
      .update(solicitud)
      .set(data.values)
      .where(eq(solicitud.id, Number(data.id)));

    revalidatePath('/solicitudes');
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}

export interface SolicitudReturning {
  id: number;
}

interface CreateSolicitudFromSelectedRows {
  values: SolicitudFormType;
  selectedRows: SolicitudDetalleFormType[];
}

export async function createSolicitudFromSelectedRows(
  prevState: unknown,
  data: CreateSolicitudFromSelectedRows
) {
  let returningSolicitud: SolicitudReturning;
  try {
    [returningSolicitud] = await db
      .insert(solicitud)
      .values(data.values)
      .returning({
        id: solicitud.id,
        id_presupuesto: solicitud.id_presupuesto,
      });

    await createSolicitudDetalleBySelectedRows(
      data.selectedRows,
      returningSolicitud.id
    );

    revalidatePath('/solicitudes');
    return { ...stateUpdateSuccess, returningId: returningSolicitud.id };
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
