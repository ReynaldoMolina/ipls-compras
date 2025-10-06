import { Header } from '@/components/header/header';

export const metadata = {
  title: 'Inicio',
};

export default async function Page() {
  return (
    <>
      <Header title="Inicio" showBackIcon={false} />
      <section className="flex flex-1 flex-col p-3 gap-3 overflow-y-auto">
        <h1>Bienvenido</h1>
      </section>
    </>
  );
}
