'use server';

import { db } from '@/db/db';
import { PrevState, Usuario } from '@/types/types';
import { goBackTo } from './actionsUtils';
import { usuarios } from '@/db/schema/usuarios';
import { eq } from 'drizzle-orm';

export async function createUser(
  prevState: PrevState | undefined,
  data: Usuario
) {
  try {
    await db.insert(usuarios).values(data);
  } catch (error) {
    console.error(error);
    return { ...prevState, message: 'Error creating user' };
  }
  await goBackTo('/usuarios');
}

export async function updateUser(
  id: number | undefined,
  prevState: PrevState,
  data: Usuario
) {
  if (!id) return;
  try {
    await db.update(usuarios).set(data).where(eq(usuarios.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/usuarios');
}
