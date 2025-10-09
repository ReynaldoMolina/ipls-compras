'use server';

import { db } from '@/database/db';
import { PresupuestoFormType } from '@/types/types';
import { goBackTo } from './go-back-to-list';
import { eq } from 'drizzle-orm';
import { presupuesto } from '@/database/schema/presupuesto';

interface CreatePresupuesto {
  values: PresupuestoFormType;
}

export async function createPresupuesto(
  prevState: unknown,
  data: CreatePresupuesto
) {
  let returningId: { id: number };

  try {
    [returningId] = await db
      .insert(presupuesto)
      .values(data.values)
      .returning({ id: presupuesto.id });
  } catch (error) {
    console.error(error);
    return { message: 'Error creating solicitud' };
  }
  await goBackTo(`/presupuestos/${returningId.id}/editar`);
}

interface UpdatePresupuesto {
  id: number | string | undefined;
  values: PresupuestoFormType;
}

export async function updatePresupuesto(
  prevState: unknown,
  data: UpdatePresupuesto
) {
  if (!data.id) return;

  try {
    await db
      .update(presupuesto)
      .set(data.values)
      .where(eq(presupuesto.id, Number(data.id)));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/presupuestos');
}
