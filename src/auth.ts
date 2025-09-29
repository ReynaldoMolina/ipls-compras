import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './database/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: DrizzleAdapter(db),
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? 'user', ...profile };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    // session({ session, user }) {
    //   session.user.role = user.role;
    //   return session;
    // },
  },
  pages: {
    signIn: '/login',
  },
});
