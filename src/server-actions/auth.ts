'use server';

import { signIn, signOut } from '@/auth';

export async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/resumen' });
}

export async function logOut() {
  await signOut();
}
