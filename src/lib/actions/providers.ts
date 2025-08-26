'use server';

import { db } from '@/db/db';
import { PrevState } from '@/types/types';
import { getProviderFormData } from '../formdata/providers';
import { goBackTo } from './actionsUtils';
import { proveedores } from '@/db/schema/proveedores';
import { eq } from 'drizzle-orm';

export async function createProvider(
  prevState: PrevState | undefined,
  formData: FormData
) {
  try {
    const data = getProviderFormData(formData);
    await db.insert(proveedores).values(data);
  } catch (error) {
    console.error(error);
    return { ...prevState, message: 'Error creating provider' };
  }
  await goBackTo('/proveedores');
}

export async function updateProvider(
  id: number,
  prevState: PrevState,
  formData: FormData
) {
  try {
    const data = getProviderFormData(formData);
    await db.update(proveedores).set(data).where(eq(proveedores.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/proveedores');
}
