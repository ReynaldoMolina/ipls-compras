import { auth } from '@/auth';
import { defineAbilitiesFor } from './abilities';

export async function getAbility() {
  const session = await auth();
  const role = session?.user?.role ?? 'noverificado';
  return defineAbilitiesFor(role);
}
