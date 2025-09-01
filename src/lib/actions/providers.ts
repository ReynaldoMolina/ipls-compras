'use server';

import { db } from '@/db/db';
import { PrevState, Provider } from '@/types/types';
import { goBackTo } from './actionsUtils';
import { proveedores } from '@/db/schema/proveedores';
import { eq } from 'drizzle-orm';

export async function createProvider(
  prevState: PrevState | undefined,
  data: Provider
) {
  try {
    await db.insert(proveedores).values(data);
  } catch (error) {
    console.error(error);
    return { ...prevState, message: 'Error creating provider' };
  }
  await goBackTo('/proveedores');
}

export async function updateProvider(
  id: number | undefined,
  prevState: PrevState,
  data: Provider
) {
  if (!id) return;
  try {
    await db.update(proveedores).set(data).where(eq(proveedores.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/proveedores');
}
