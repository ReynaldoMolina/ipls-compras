'use server';

import { db } from '@/database/db';
import { goBackTo } from './go-back-to-list';
import { users } from '@/database/schema/usuarios';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';

interface UpdateUserProps {
  id_usuario: string | undefined;
  values: User;
}

export async function updateUser(prevState: unknown, data: UpdateUserProps) {
  if (!data.id_usuario) return;

  try {
    await db
      .update(users)
      .set(data.values)
      .where(eq(users.id, data.id_usuario));
  } catch (error) {
    console.error(error);
    return error;
  }
  await goBackTo('/usuarios');
}
