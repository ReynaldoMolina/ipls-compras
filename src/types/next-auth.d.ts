import NextAuth from 'next-auth';
import { Roles } from '@/permissions/roles';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      role?: Roles;
      activo?: boolean;
    };
  }

  interface User {
    id: string;
    emailVerified?: Date | null;
    role?: Roles;
    activo?: boolean;
  }
}
