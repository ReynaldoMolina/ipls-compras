import { auth } from '@/auth';
import { defineAbilitiesFor } from './abilities';
import { Roles } from './roles';

export async function getAbility() {
  const session = await auth();
  const role = (session?.user?.role as Roles) ?? 'sinverificar';
  return defineAbilitiesFor(role);
}
