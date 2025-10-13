'use server';

import { db } from '@/database/db';
import { PresupuestoFormType } from '@/types/types';
import { eq } from 'drizzle-orm';
import { presupuesto } from '@/database/schema/presupuesto';
import { revalidatePath } from 'next/cache';
import {
  stateCreateError,
  stateCreateSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './statusMessages';

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

    return {
      ...stateCreateSuccess,
      returningId: returningId.id,
    };
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
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

    revalidatePath('/presupuestos');
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
