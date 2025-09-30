'use server';

import { db } from '@/database/db';
import { goBackTo } from './go-back-to-list';
import { users } from '@/database/schema/usuarios';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';

export async function createUser(prevState: PrevState | undefined, data: User) {
  try {
    await db.insert(users).values(data);
  } catch (error) {
    console.error(error);
    return { ...prevState, message: 'Error creating user' };
  }
  await goBackTo('/usuarios');
}

export async function updateUser(
  id: string | undefined,
  prevState: PrevState,
  data: User
) {
  if (!id) return;
  try {
    await db.update(users).set(data).where(eq(users.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/usuarios');
}
