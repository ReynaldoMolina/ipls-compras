'use server';

import { db } from '@/database/db';
import { users } from '@/database/schema/user';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { stateUpdateError, stateUpdateSuccess } from './statusMessages';

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

    revalidatePath('/usuarios');
    return stateUpdateSuccess;
  } catch (error) {
    console.error(error);
    return stateUpdateError;
  }
}
