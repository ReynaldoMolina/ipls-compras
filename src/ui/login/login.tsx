import Hero from './Hero';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <section className="flex flex-col w-full md:w-auto md:flex-row md:rounded-4xl overflow-hidden inset shadow-xl bg-white dark:bg-neutral-900">
        <Hero />
        <LoginForm />
      </section>
    </main>
  );
}
