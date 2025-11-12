'use client';

import { createContext, useContext } from 'react';
import { User } from 'next-auth';
import {
  AppAbility,
  defineAbilitiesFor,
} from '@/permissions/define-abilities-for';

type UserContextType = {
  user: User;
  userPermissions: AppAbility;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const userPermissions = defineAbilitiesFor(user);
  console.log(userPermissions);

  return (
    <UserContext.Provider value={{ user, userPermissions }}>
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
