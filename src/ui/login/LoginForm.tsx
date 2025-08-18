import Link from 'next/link';
// import { useActionState } from 'react';
import { LoginEmail, LoginPassword } from '@/app/login/LoginInput';
import PrimaryButton from '@/ui/buttons/PrimaryButton';
import GoogleButton from './GoogleButton';

export default function LoginForm() {
  // const [state, formAction, isPending] = useActionState(action, {
  //   message: '',
  // });

  return (
    <form
      action=""
      className="flex flex-col gap-6 items-center justify-center p-10 md:p-15 w-full md:w-100 md:border border-neutral-200 dark:border-neutral-800 md:rounded-r-4xl"
    >
      {/* title */}
      <div className="flex flex-col gap-3">
        <h1 className="text-title font-bold text-center">¡Bienvenido!</h1>
        <p className="text-brand-gray text-center">
          Por favor ingresa tu información
        </p>
      </div>

      {/* inputs */}
      <LoginEmail
        label="Correo institucional"
        name="email"
        placeHolder="Correo"
      />
      <LoginPassword
        label="Contraseña"
        name="password"
        placeHolder="Contraseña"
      />

      <Link
        href="#"
        className="text-sm text-center text-brand-blue dark:text-brand-blue-dark hover:underline"
      >
        ¿Olvidaste tu contraseña?
      </Link>

      <PrimaryButton label="Iniciar sesión" type="submit" color="orange" />
      <GoogleButton />
    </form>
  );
}
