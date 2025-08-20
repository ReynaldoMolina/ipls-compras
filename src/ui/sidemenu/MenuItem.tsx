import Link from 'next/link';
import SideMenuIcon from './SideMenuIcon';
import { usePathname } from 'next/navigation';
import { MenuOption } from './menuOptions';

export function MenuItem({ option }: { option: MenuOption }) {
  const pathname = usePathname();
  const isActive =
    option.url === '/' ? pathname === '/' : pathname.includes(option.url);

  return (
    <Link
      href={option.url}
      className={`flex min-w-17 w-full items-center cursor-pointer rounded-md hover:bg-white/20 gap-3 px-3 py-2 text-xs text-center font-semibold text-white ${
        isActive && 'bg-white/20'
      }`}
    >
      <SideMenuIcon pageId={option.id} />
      {option.name}
    </Link>
  );
}
