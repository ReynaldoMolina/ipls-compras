'use server';

import { db } from '@/db/db';
import { PrevState, Solvencia } from '@/types/types';
import { goBackTo } from './go-back-to-list';
import { solvencias } from '@/db/schema/solvencias';
import { eq } from 'drizzle-orm';

export async function createSolvencia(
  prevState: PrevState | undefined,
  data: Solvencia,
  id_proveedor: number
) {
  try {
    await db.insert(solvencias).values(data);
  } catch (error) {
    console.error(error);
    return { ...prevState, message: 'Error creating solvencia' };
  }
  await goBackTo(`/proveedores/${id_proveedor}/solvencias`);
}

export async function updateSolvencia(
  id: number | undefined,
  prevState: PrevState,
  data: Solvencia,
  id_proveedor: number
) {
  if (!id) return;
  try {
    await db.update(solvencias).set(data).where(eq(solvencias.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo(`/proveedores/${id_proveedor}/solvencias`);
}
