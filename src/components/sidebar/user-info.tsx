import { logOut } from '@/server-actions/auth';
import { Contrast, LogOut, UserCircle } from 'lucide-react';
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
import { useState, useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Spinner } from '../ui/spinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { defaultUser } from '@/permissions/default-user';

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
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenuItem asChild>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-start focus-visible:ring-0 gap-0 font-normal"
          >
            <LogOut className="mr-2 text-muted-foreground" />
            Cerrar sesión
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cerrar sesión</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas cerrar tu sesión actual?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              disabled={isPending}
              onClick={() =>
                startTransition(() => {
                  logOut();
                })
              }
            >
              {isPending && <Spinner />}
              Cerrar sesión
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuItem>
  );
}

export function UserProfile({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full justify-start focus-visible:ring-0 gap-0 font-normal mb-1 pl-0"
        >
          <UserCircle className="mr-2 text-muted-foreground" />
          Mi perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader className="border-b pb-6">
          <DialogTitle>Mi perfil</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 w-full items-center">
          <Avatar className="size-20">
            <AvatarImage src={user?.image ?? ''} alt="Imagen de perfil" />
            <AvatarFallback>LS</AvatarFallback>
          </Avatar>
          <span className="text-sm text-center">{user.name}</span>
          <span className="text-muted-foreground text-xs text-center">
            {user.email}
          </span>
          <span className="text-muted-foreground text-xs text-center">
            {user.role?.toUpperCase()}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
