'use server';

import { db } from '@/database/db';
import { PresupuestoFormType } from '@/types/types';
import { goBackTo } from './go-back-to-list';
import { eq } from 'drizzle-orm';
import { presupuesto } from '@/database/schema/presupuesto';

export async function createSolicitud(data: PresupuestoFormType) {
  try {
    await db.insert(presupuesto).values(data);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating solicitud' };
  }
  await goBackTo('/presupuestos');
}

export async function updateSolicitud(
  id: number | undefined,
  data: PresupuestoFormType
) {
  if (!id) return;
  try {
    await db.update(presupuesto).set(data).where(eq(presupuesto.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/presupuestos');
}
