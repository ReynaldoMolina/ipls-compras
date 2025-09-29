'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
import { usePathname } from 'next/navigation';
import { getActiveSidebarOption } from '@/lib/get-sidebar-active-option';
import { UserMenu } from './user-menu';
import { User } from 'next-auth';

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

export function AppSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const activeUrl = getActiveSidebarOption(pathname, sidebarItems);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          className="flex gap-2 items-center rounded-md hover:bg-sidebar-accent p-2"
        >
          <Logo className="size-7" />
          <span className="font-semibold text-sm">IPLS Compras</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url === activeUrl}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu isMobile={isMobile} user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
