'use server';

import { db } from '@/database/db';
import { goBackTo } from './go-back-to-list';
import { proveedor } from '@/database/schema/proveedor';
import { eq } from 'drizzle-orm';
import { ProveedorFormType } from '@/types/types';

interface CreateProviderProps {
  values: ProveedorFormType;
}

export async function createProvider(
  prevState: unknown,
  data: CreateProviderProps
) {
  try {
    await db.insert(proveedor).values(data.values);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating provider' };
  }
  await goBackTo('/proveedores');
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
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/proveedores');
}
