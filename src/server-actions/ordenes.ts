'use server';

import { db } from '@/database/db';
import { OrdenFormType } from '@/types/types';
import { goBackTo } from './go-back-to-list';
import { eq } from 'drizzle-orm';
import { ordenes } from '@/database/schema/ordenes';

export async function createOrden(
  // prevState: PrevState | undefined,
  data: OrdenFormType
) {
  try {
    await db.insert(ordenes).values(data);
  } catch (error) {
    console.error(error);
    throw new Error('Error creando la orden');
  }
  await goBackTo('/ordenes');
}

export async function updateOrden(
  id: number | undefined,
  // prevState: PrevState,
  data: OrdenFormType
) {
  if (!id) return;
  try {
    await db.update(ordenes).set(data).where(eq(ordenes.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/ordenes');
}
