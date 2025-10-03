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
// import Logo from '@/icons/logo.svg';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { getActiveSidebarOption } from '@/lib/get-sidebar-active-option';
import { UserMenu } from './user-menu';
import { sidebarItems } from './sidebar-items';
import { Can } from '@casl/react';
import { useUser } from '@/hooks/use-user';
import { Frown } from 'lucide-react';

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const activeUrl = getActiveSidebarOption(pathname, sidebarItems);
  const { ability } = useUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          className="flex gap-2 items-center rounded-md hover:bg-sidebar-accent p-2"
        >
          {/* <Logo className="size-7" /> */}
          <Frown className="size-7" />
          <span className="font-semibold text-sm">IPLS Compras</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <Can key={item.id} I="read" a={item.id} ability={ability}>
                  <SidebarMenuItem>
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
                </Can>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu isMobile={isMobile} />
      </SidebarFooter>
    </Sidebar>
  );
}
