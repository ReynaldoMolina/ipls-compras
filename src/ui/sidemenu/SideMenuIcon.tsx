import ResumenIcon from '@/ui/sidemenu/icons/bar-chart.svg';
import ListIcon from '@/ui/sidemenu/icons/list.svg';
import CartIcon from '@/ui/sidemenu/icons/shopping-cart.svg';
import GroupsIcon from '@/ui/sidemenu/icons/groups.svg';
import UserListIcon from '@/ui/sidemenu/icons/user-list.svg';
import SettingsIcon from '@/ui/sidemenu/icons/settings.svg';

const iconStyle = 'text-white dark:text-white';

const icons = {
  resumen: <ResumenIcon className={iconStyle} />,
  solicitudes: <ListIcon className={iconStyle} />,
  ordenes: <CartIcon className={iconStyle} />,
  proveedores: <GroupsIcon className={iconStyle} />,
  usuarios: <UserListIcon className={iconStyle} />,
  ajustes: <SettingsIcon className={iconStyle} />,
};

export type IconName = keyof typeof icons;

export default function SideMenuIcon({ type }: { type: IconName }) {
  return <>{icons[type]}</>;
}
