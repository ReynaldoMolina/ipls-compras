'use client';

import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SidebarMenuButton } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChangeThemeSubMenu, SignOut, UserInfo } from './user-info';
import { useUser } from '@/hooks/use-user';

interface UserMenuProps {
  isMobile: boolean;
}

export function UserMenu({ isMobile }: UserMenuProps) {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user.image ?? '/default-avatar.png'}
              alt={user.name ?? 'Usuario'}
            />
            <AvatarFallback className="rounded-lg">LS</AvatarFallback>
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
          {/* <DropdownMenuItem>
            <Settings />
            Ajustes
          </DropdownMenuItem> */}
          <ChangeThemeSubMenu />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
