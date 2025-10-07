import { logOut } from '@/server-actions/auth';
import { Contrast, LogOut } from 'lucide-react';
import { ChangeTheme } from '../change-theme';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { User } from 'next-auth';
import { useTransition } from 'react';
import { LoadingIcon } from '../loading/LoadingIcon';

export function UserInfo({ user }: { user: User }) {
  return (
    <DropdownMenuLabel className="p-0 font-normal">
      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user?.image ?? ''} alt={user?.name ?? 'Usuario'} />
          <AvatarFallback className="rounded-lg">LS</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user?.name}</span>
          <span className="truncate text-xs text-muted-foreground">
            {user?.email}
          </span>
        </div>
      </div>
    </DropdownMenuLabel>
  );
}

export function ChangeThemeSubMenu() {
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

export function SignOut() {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem asChild>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-full justify-start focus-visible:ring-0"
        onClick={() =>
          startTransition(() => {
            logOut();
          })
        }
        disabled={isPending}
      >
        <LogOut className="mr-2" />
        {isPending ? <LoadingIcon /> : 'Cerrar sesión'}
      </Button>
    </DropdownMenuItem>
  );
}
