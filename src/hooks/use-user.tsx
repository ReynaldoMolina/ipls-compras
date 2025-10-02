'use client';

import { createContext, useContext } from 'react';
import { User } from 'next-auth';
import { AppAbility, defineAbilitiesFor } from '@/permissions/abilities';

type UserContextType = {
  ability: AppAbility;
  user: User;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const ability = defineAbilitiesFor(user.role ?? 'sinverificar');

  return (
    <UserContext.Provider value={{ ability, user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
