'use server';

import { db } from '@/database/db';
import { goBackTo } from './go-back-to-list';
import { users } from '@/database/schema/usuarios';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';

export async function updateUser(id: string | undefined, data: User) {
  if (!id) return;
  try {
    await db.update(users).set(data).where(eq(users.id, id));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/usuarios');
}
