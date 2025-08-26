import Link from 'next/link';
import { useRef } from 'react';
import ChangeTheme from './ChangeTheme';
import PersonIcon from '@/icons/person.svg';
import LogoutIcon from '@/icons/logout.svg';
import { useClickOutside } from '@/lib/hooks/useClickOutside';

interface Props {
  toggleProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const menuItemClass =
  'flex items-center gap-4 px-5 py-2.5 text-sm hover:bg-button-hover cursor-pointer';

export default function ProfileMenu({ toggleProfileMenu, buttonRef }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, toggleProfileMenu, buttonRef);

  return (
    // menu container
    <div
      ref={menuRef}
      className="flex absolute pr-3 top-11 right-0 z-10 overscroll-contain"
    >
      {/* menu */}
      <div className="flex flex-col rounded-md shadow-md border border-brand-border overflow-hidden bg-menu-container">
        {/* user info container */}
        <div className="flex p-1.5">
          {/* user info */}
          <div className="flex items-center p-3 gap-3 bg-user-info rounded-sm">
            {/* profile picture */}
            <div className="flex justify-center items-center w-12 aspect-square rounded-full bg-neutral-300 text-brand-gray cursor-default">
              A
            </div>
            {/* user data */}
            <div className="flex flex-col gap-0.5">
              <p>Nombre Apellido</p>
              <p className="text-sm text-brand-gray ">
                nombre.apellido.rol@ipls-lasalle.com
              </p>
            </div>
          </div>
        </div>
        {/* menu options */}
        <div className="flex flex-col justify-center pb-1">
          <Link href="#" className={menuItemClass}>
            <PersonIcon />
            Perfil
          </Link>
          <ChangeTheme />
          <div className={menuItemClass}>
            <LogoutIcon />
            Cerrar sesión
          </div>
        </div>
      </div>
    </div>
  );
}
