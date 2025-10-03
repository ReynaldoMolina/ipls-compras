'use server';

import { db } from '@/database/db';
import { goBackTo } from './go-back-to-list';
import { proveedores } from '@/database/schema/proveedores';
import { eq } from 'drizzle-orm';
import { ProveedorFormType } from '@/types/types';

export async function createProvider(data: ProveedorFormType) {
  try {
    await db.insert(proveedores).values(data);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating provider' };
  }
  await goBackTo('/proveedores');
}

export async function updateProvider(
  id: number | undefined,
  data: ProveedorFormType
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
