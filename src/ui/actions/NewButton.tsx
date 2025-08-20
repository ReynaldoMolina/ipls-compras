import Link from 'next/link';
import AddIcon from '@/icons/add.svg';
import { MenuOption } from '../sidemenu/menuOptions';

export default function NewButton({ pageInfo }: { pageInfo: MenuOption }) {
  const label = pageInfo.id === 'ordenes' ? 'Añadir bien o servicio' : 'Nuevo';
  return (
    <Link
      href={`/${pageInfo.id}/crear`}
      className="flex gap-1 items-center justify-center rounded text-sm h-8 px-1.5 cursor-pointer bg-button-new hover:bg-button-new-hover text-brand-text transition"
    >
      <AddIcon className="size-4.5" />
      {label}
    </Link>
  );
}
