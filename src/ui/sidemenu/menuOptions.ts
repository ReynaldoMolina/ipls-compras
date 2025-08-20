import { PageId } from '@/types/types';

export interface MenuOption {
  id: PageId;
  name: string;
  url: string;
}

export const menuOptions: MenuOption[] = [
  {
    id: 'resumen',
    name: 'Resumen',
    url: '/',
  },
  {
    id: 'solicitudes',
    name: 'Solicitudes de compra',
    url: '/solicitudes',
  },
  {
    id: 'ordenes',
    name: 'Órdenes de compra',
    url: '/ordenes',
  },
  {
    id: 'proveedores',
    name: 'Proveedores',
    url: '/proveedores',
  },
  {
    id: 'usuarios',
    name: 'Usuarios',
    url: '/usuarios',
  },
  {
    id: 'ajustes',
    name: 'Ajustes',
    url: '/ajustes',
  },
];
