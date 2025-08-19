import { IconName } from './SideMenuIcon';

export interface MenuOption {
  id: number;
  name: string;
  type: IconName;
  url: string;
}

export const menuOptions: MenuOption[] = [
  {
    id: 0,
    name: 'Resumen',
    type: 'resumen',
    url: '/',
  },
  {
    id: 1,
    name: 'Solicitudes de compra',
    type: 'solicitudes',
    url: '/solicitudes',
  },
  {
    id: 2,
    name: 'Órdenes de compra',
    type: 'ordenes',
    url: '/ordenes',
  },
  {
    id: 3,
    name: 'Proveedores',
    type: 'proveedores',
    url: '/proveedores',
  },
  {
    id: 4,
    name: 'Usuarios',
    type: 'usuarios',
    url: '/usuarios',
  },
  {
    id: 5,
    name: 'Ajustes',
    type: 'ajustes',
    url: '/ajustes',
  },
];
