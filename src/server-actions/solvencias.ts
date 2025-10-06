'use server';

import { db } from '@/database/db';
import { Solvencia } from '@/types/types';
import { goBackTo } from './go-back-to-list';
import { solvencias } from '@/database/schema/solvencias';
import { eq } from 'drizzle-orm';

interface CreateSolvenciaProps {
  id_proveedor: number;
  values: Solvencia;
}

export async function createSolvencia(
  // prevState: unknown,
  data: CreateSolvenciaProps
) {
  try {
    await db.insert(solvencias).values(data.values);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating solvencia' };
  }
  await goBackTo(`/proveedores/${data.id_proveedor}/solvencias`);
}

interface UpdateSolvenciaProps {
  id: number | undefined;
  values: Solvencia;
  id_proveedor: number;
}

export async function updateSolvencia(
  // prevState: unknown,
  data: UpdateSolvenciaProps
) {
  if (!data.id) return;
  try {
    await db
      .update(solvencias)
      .set(data.values)
      .where(eq(solvencias.id, data.id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo(`/proveedores/${data.id_proveedor}/solvencias`);
}
