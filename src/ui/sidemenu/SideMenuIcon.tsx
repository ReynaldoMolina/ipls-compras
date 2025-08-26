import ResumenIcon from '@/ui/sidemenu/icons/bar_chart.svg';
import ListIcon from '@/ui/sidemenu/icons/list.svg';
import CartIcon from '@/ui/sidemenu/icons/shopping_cart.svg';
import GroupsIcon from '@/ui/sidemenu/icons/groups.svg';
import UserListIcon from '@/ui/sidemenu/icons/user_list.svg';
import SettingsIcon from '@/ui/sidemenu/icons/settings.svg';
import { PageId } from '@/types/types';

const pageIcons = {
  resumen: <ResumenIcon />,
  solicitudes: <ListIcon />,
  ordenes: <CartIcon />,
  proveedores: <GroupsIcon />,
  usuarios: <UserListIcon />,
  ajustes: <SettingsIcon />,
  empty: <></>, // fallback icon
};

export default function SideMenuIcon({ pageId }: { pageId: PageId }) {
  return <>{pageIcons[pageId]}</>;
}
