'use server';

import { db } from '@/database/db';
import { Solvencia } from '@/types/types';
import { proveedor_solvencia } from '@/database/schema/proveedor-solvencia';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import {
  stateCreateError,
  stateCreateSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './statusMessages';

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

    revalidatePath(`/proveedores/${data.id_proveedor}/solvencias`);
    return stateCreateSuccess;
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
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

    revalidatePath(`/proveedores/${data.id_proveedor}/solvencias`);
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
