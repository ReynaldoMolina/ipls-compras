'use client';

import Logo from '@/icons/logo.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ChangeTheme from './header/change-theme';
import { User, Contrast, LogOut } from 'lucide-react';

const user = {
  name: 'Reynaldo Molina',
  email: 'reynaldo.molina.pst@ipls-lasalle.org',
  avatar: 'https://github.com/shadcn.png',
};

export default function Header({ title }: { title: string }) {
  return (
    <header className="flex h-11 min-h-11 w-full items-center gap-3 px-3 py-1 border-b border-b-brand-border">
      <SidebarTrigger />
      <h1 className="text-title font-semibold">{title}</h1>

      <div className="flex items-center ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>RM</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-70">
            <div className="flex gap-2 px-1 py-2">
              <Avatar className="h-10 w-10 rounded-full grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">RM</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Contrast className="mr-2 h-4 w-4 opacity-60" />
                  Tema
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <ChangeTheme />
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
