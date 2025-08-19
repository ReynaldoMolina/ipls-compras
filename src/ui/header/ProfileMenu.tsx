import Link from 'next/link';
import { useRef } from 'react';
import PersonIcon from '@/icons/person.svg';
import ContrastIcon from '@/icons/contrast.svg';
import LogoutIcon from '@/icons/logout.svg';
import { useMenuClose } from './useMenuClose';

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function ProfileMenu({ setIsMenuOpen, buttonRef }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  useMenuClose(menuRef, buttonRef, setIsMenuOpen);

  const menuItemClass =
    'flex items-center gap-4 px-5 py-2.5 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700';

  return (
    // menu container
    <div ref={menuRef} className="flex absolute pr-3 top-10 right-0">
      {/* menu */}
      <div className="flex flex-col rounded-md shadow-md border border-brand-border dark:border-brand-border-dark overflow-hidden">
        {/* user info container */}
        <div className="flex p-1.5 dark:bg-[#2b2c2f]">
          {/* user info */}
          <div className="flex items-center p-3 gap-3 bg-[#f8f8f8] dark:bg-[#18191a] rounded-sm">
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
        <div className="flex flex-col justify-center pb-1 dark:bg-[#2b2c2f]">
          <Link href="#" className={menuItemClass}>
            <PersonIcon />
            Perfil
          </Link>
          <button type="button" className={menuItemClass}>
            <ContrastIcon className="h-4" />
            Tema
          </button>
          <div className={menuItemClass}>
            <LogoutIcon />
            Cerrar sesión
          </div>
        </div>
      </div>
    </div>
  );
}
