'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { loginSchema } from '@/components/forms/validation/validation-schemas';
import { Form } from '../ui/form';
import { loginWithGoogle } from '@/server-actions/auth';
import { Hero } from './hero';
import { useTransition } from 'react';
import { LoadingIcon } from '../loading/LoadingIcon';

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      correo: '',
      password: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  return (
    <Form {...form}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="flex flex-col gap-6 p-6 md:p-8 mb-0 justify-center items-center">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-lg font-bold">Bienvenido</h1>
              <span className="text-muted-foreground text-balance text-sm">
                Ingresa a tu cuenta de IPLS Compras
              </span>
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={() =>
                startTransition(() => {
                  loginWithGoogle();
                })
              }
              disabled={isPending}
            >
              {isPending ? (
                <LoadingIcon />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-sm">Iniciar sesión con Google</span>
                </>
              )}
            </Button>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Hero />
          </div>
        </CardContent>
      </Card>
    </Form>
  );
}
