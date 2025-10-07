import { PageId } from '@/types/types';
import {
  ChartColumn,
  ListCheck,
  Package,
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
    id: 'Resumen',
    title: 'Resumen',
    url: '/resumen',
    icon: ChartColumn,
  },
  {
    id: 'Productos',
    title: 'Productos',
    url: '/productos',
    icon: Package,
  },
  {
    id: 'Solicitud',
    title: 'Solicitudes de compra',
    url: '/solicitudes',
    icon: ShoppingCart,
  },
  {
    id: 'Orden',
    title: 'Órdenes de compra',
    url: '/ordenes',
    icon: ListCheck,
  },
  {
    id: 'Proveedor',
    title: 'Proveedores',
    url: '/proveedores',
    icon: Truck,
  },
  {
    id: 'Usuario',
    title: 'Usuarios',
    url: '/usuarios',
    icon: Users,
  },
];
