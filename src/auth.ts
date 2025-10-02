import NextAuth, { User } from 'next-auth';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/database/db';
import { accounts, users } from './database/schema/usuarios';
import { Roles } from './permissions/roles';

// Export runtime Node only
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db, { usersTable: users, accountsTable: accounts }),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session.user) {
        session.user.id = (user?.id as string) ?? (token?.sub as string);
        session.user.role =
          (user?.role as Roles) ?? (token?.role as Roles) ?? 'sinverificar';
        session.user.activo =
          (user?.activo as boolean) ?? (token?.activo as boolean) ?? false;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = (user as User).id;
        token.role = (user as User).role ?? 'user';
        token.activo = (user as User).activo ?? false;
      }
      return token;
    },
  },
});
