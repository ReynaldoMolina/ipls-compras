'use server';

import { db } from '@/database/db';
import { proveedor } from '@/database/schema/proveedor';
import { eq } from 'drizzle-orm';
import { ProveedorFormType } from '@/types/types';
import { revalidatePath } from 'next/cache';
import {
  stateCreateError,
  stateCreateSuccess,
  stateUpdateError,
  stateUpdateSuccess,
} from './statusMessages';

interface CreateProviderProps {
  values: ProveedorFormType;
}

export async function createProvider(
  prevState: unknown,
  data: CreateProviderProps
) {
  try {
    await db.insert(proveedor).values(data.values);

    revalidatePath('/proveedores');
    return stateCreateSuccess;
  } catch (error) {
    console.error(error);
    return stateCreateError;
  }
}

interface UpdateProviderProps {
  id: number | undefined;
  values: ProveedorFormType;
}

export async function updateProvider(
  prevState: unknown,
  data: UpdateProviderProps
) {
  if (!data.id) return;

  try {
    await db
      .update(proveedor)
      .set(data.values)
      .where(eq(proveedor.id, Number(data.id)));

    revalidatePath('/proveedores');
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
