'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ChangeTheme from './change-theme';
import { User, Contrast, LogOut } from 'lucide-react';

type User = {
  name: string;
  email: string;
  avatar: string;
};

const user: User = {
  name: 'Reynaldo Molina',
  email: 'reynaldo.molina.pst@ipls-lasalle.org',
  avatar: 'https://github.com/shadcn.png',
};

export default function Header({ title }: { title: string }) {
  return (
    <header className="flex h-11 min-h-11 w-full items-center gap-3 px-3 py-1 border-b border-b-border">
      <SidebarTrigger />
      <h1 className="text-title font-semibold">{title}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <Avatar className="size-7">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="max-w-70">
          <UserInfo user={user} />
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              Perfil
            </DropdownMenuItem>
            <ChangeThemeSubMenu />
            <DropdownMenuItem>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex gap-2 px-1 py-2">
      <Avatar className="size-10 rounded-full">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="rounded-lg">RM</AvatarFallback>
      </Avatar>
      <div className="grid text-left text-xs">
        <span className="font-medium text-sm">{user.name}</span>
        <span className="text-muted-foreground">{user.email}</span>
      </div>
    </div>
  );
}

function ChangeThemeSubMenu() {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Contrast className="mr-2 h-4 w-4 opacity-60" />
        Tema
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <ChangeTheme />
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
