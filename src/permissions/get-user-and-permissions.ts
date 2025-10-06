import { auth } from '@/auth';
import { defaultUser } from './default-user';
import { defineAbilitiesFor } from './abilities';

export async function getUserAndPermissions() {
  const session = await auth();
  const user = session?.user ?? defaultUser;
  const ability = defineAbilitiesFor(user.role);
  return { user, ability };
}
