export const metadata = {
  title: 'Inicio',
};

export default async function Page() {
  return (
    <main className="flex gap-5 justify-center items-center min-h-screen">
      <a className="bg-button-hover px-7 py-3 rounded-full" href="/login">
        Login
      </a>
      <a className="bg-button-hover px-7 py-3 rounded-full" href="/resumen">
        Test
      </a>
    </main>
  );
}
