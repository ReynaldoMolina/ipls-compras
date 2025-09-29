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

import { PageId, UserType } from '@/types/types';
import {
  ChartColumn,
  ListCheck,
  ShoppingCart,
  Users,
  Truck,
  User,
  LogOut,
  Contrast,
  ChevronsUpDown,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import ChangeTheme from './change-theme';
import { getActiveSidebarOption } from '@/lib/get-sidebar-active-option';
import { logOut } from '@/server-actions/auth';
import { Button } from './ui/button';

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

const user: UserType = {
  name: 'Reynaldo Molina',
  email: 'reynaldo.molina.pst@ipls-lasalle.org',
  avatar: 'https://avatars.githubusercontent.com/u/132531419?v=4&size=64',
};

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
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
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}

function UserMenu() {
  const { isMobile } = useSidebar();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        <UserInfo user={user} />
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Cuenta
          </DropdownMenuItem>
          <ChangeThemeSubMenu />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserInfo({ user }: { user: UserType }) {
  return (
    <DropdownMenuLabel className="p-0 font-normal">
      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg">RM</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>
      </div>
    </DropdownMenuLabel>
  );
}

function ChangeThemeSubMenu() {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Contrast className="h-4 w-4 opacity-60" />
        Tema
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <ChangeTheme />
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        await logOut();
      }}
    >
      <DropdownMenuItem asChild>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="w-full justify-start focus-visible:ring-0"
        >
          <LogOut />
          Cerrar sesión
        </Button>
      </DropdownMenuItem>
    </form>
  );
}
