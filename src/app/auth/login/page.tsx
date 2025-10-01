import { LoginForm } from '@/components/login/login';

export const metadata = {
  title: 'Iniciar sesión',
};

export default function Page() {
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs md:max-w-2xl">
        <LoginForm />
      </div>
    </main>
  );
}
