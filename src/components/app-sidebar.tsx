import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Logo from '@/icons/logo.svg';
import Link from 'next/link';

import { PageId } from '@/types/types';
import {
  ChartColumn,
  ListCheck,
  ShoppingCart,
  Users,
  Truck,
} from 'lucide-react';

export interface SidebarItem {
  id: PageId;
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const sidebarItems: SidebarItem[] = [
  {
    id: 'resumen',
    title: 'Resumen',
    url: '/resumen',
    icon: ChartColumn,
  },
  {
    id: 'solicitudes',
    title: 'Solicitudes de compra',
    url: '/solicitudes',
    icon: ShoppingCart,
  },
  {
    id: 'ordenes',
    title: 'Órdenes de compra',
    url: '/ordenes',
    icon: ListCheck,
  },
  {
    id: 'proveedores',
    title: 'Proveedores',
    url: '/proveedores',
    icon: Truck,
  },
  {
    id: 'usuarios',
    title: 'Usuarios',
    url: '/usuarios',
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton asChild>
          <Link href="/">
            <Logo />
            <span className="font-semibold">IPLS Compras</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-xs">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
