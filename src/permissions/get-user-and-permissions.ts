import { auth } from '@/auth';
import { defaultUser } from './default-user';
import { defineAbilitiesFor } from './define-abilities-for';

export async function getUserAndPermissions() {
  const session = await auth();
  const user = session?.user ?? defaultUser;
  const userPermissions = defineAbilitiesFor(user);
  return { user, userPermissions };
}
