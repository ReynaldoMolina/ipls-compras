'use client';

import { createContext, useState, ReactNode, useContext } from 'react';

type MenusContextType = {
  sideMenuOpen: boolean;
  profileMenuOpen: boolean;
  toggleProfileMenu: () => void;
  toggleSideMenu: () => void;
};

const MenusContext = createContext<MenusContextType | undefined>(undefined);

export function useMenusContext() {
  const context = useContext(MenusContext);
  return context;
}

export function MenusProvider({ children }: { children: ReactNode }) {
  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleSideMenu = () => setSideMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setProfileMenuOpen((prev) => !prev);

  return (
    <MenusContext.Provider
      value={{
        profileMenuOpen,
        sideMenuOpen,
        toggleSideMenu,
        toggleProfileMenu,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}
