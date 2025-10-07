import { PageId } from '@/types/types';
import {
  ChartColumn,
  ChartPie,
  ListCheck,
  ShoppingCart,
  Truck,
  Users,
} from 'lucide-react';

export interface SidebarItem {
  id: PageId;
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const sidebarItems: SidebarItem[] = [
  {
    id: 'Solicitud',
    title: 'Solicitudes de compra',
    url: '/solicitudes',
    icon: ListCheck,
  },
  {
    id: 'Orden',
    title: 'Órdenes de compra',
    url: '/ordenes',
    icon: ShoppingCart,
  },
  {
    id: 'Presupuestos',
    title: 'Presupuestos',
    url: '/presupuestos',
    icon: ChartPie,
  },
  {
    id: 'Proveedor',
    title: 'Proveedores',
    url: '/proveedores',
    icon: Truck,
  },
  {
    id: 'Resumen',
    title: 'Resumen',
    url: '/resumen',
    icon: ChartColumn,
  },
  {
    id: 'Usuario',
    title: 'Usuarios',
    url: '/usuarios',
    icon: Users,
  },
];
