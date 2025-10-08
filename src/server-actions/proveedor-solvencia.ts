'use server';

import { db } from '@/database/db';
import { Solvencia } from '@/types/types';
import { goBackTo } from './go-back-to-list';
import { proveedor_solvencia } from '@/database/schema/proveedor-solvencia';
import { eq } from 'drizzle-orm';

interface CreateSolvenciaProps {
  id_proveedor: number;
  values: Solvencia;
}

export async function createSolvencia(
  prevState: unknown,
  data: CreateSolvenciaProps
) {
  try {
    await db.insert(proveedor_solvencia).values(data.values);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating solvencia' };
  }
  await goBackTo(`/proveedores/${data.id_proveedor}/solvencias`);
}

interface UpdateSolvenciaProps {
  id: number | undefined;
  values: Solvencia;
  id_proveedor: number | undefined;
}

export async function updateSolvencia(
  prevState: unknown,
  data: UpdateSolvenciaProps
) {
  if (!data.id || !data.id_proveedor) return;

  try {
    await db
      .update(proveedor_solvencia)
      .set(data.values)
      .where(eq(proveedor_solvencia.id, data.id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo(`/proveedores/${data.id_proveedor}/solvencias`);
}
