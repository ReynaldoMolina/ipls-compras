'use server';

import { db } from '@/db/db';
import { goBackTo } from './go-back-to-list';
import { solicitudes_detalle } from '@/db/schema/solicitudes-detalle';
import { eq } from 'drizzle-orm';
import { SolicitudDetalleFormType, PrevState } from '@/types/types';

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
  prevState: PrevState,
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
