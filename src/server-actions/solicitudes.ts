'use server';

import { db } from '@/database/db';
import { SolicitudFormType } from '@/types/types';
import { goBackTo } from './go-back-to-list';
import { eq } from 'drizzle-orm';
import { solicitudes } from '@/database/schema/solicitudes';

export async function createSolicitud(
  prevState: SolicitudFormType | undefined,
  data: SolicitudFormType
) {
  try {
    await db.insert(solicitudes).values(data);
  } catch (error) {
    console.error(error);
    return { ...prevState, message: 'Error creating solicitud' };
  }
  await goBackTo('/solicitudes');
}

export async function updateSolicitud(
  id: number | undefined,
  prevState: SolicitudFormType | undefined,
  data: SolicitudFormType
) {
  if (!id) return;
  try {
    await db.update(solicitudes).set(data).where(eq(solicitudes.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/solicitudes');
}
