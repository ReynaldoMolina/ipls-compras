import Hero from '@/ui/login/Hero';
import LoginForm from '@/ui/login/LoginForm';

export const metadata = {
  title: 'Iniciar sesión',
};

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <section className="flex flex-col w-full md:w-auto md:flex-row md:rounded-4xl overflow-hidden inset shadow-xl">
        <Hero />
        <LoginForm />
      </section>
    </main>
  );
}
