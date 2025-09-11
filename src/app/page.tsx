export const metadata = {
  title: 'Inicio',
};

export default async function Page() {
  return (
    <main className="flex gap-5 justify-center items-center min-h-screen">
      <a className="bg-secondary px-7 py-3 rounded-full" href="/login">
        Login
      </a>
      <a className="bg-secondary px-7 py-3 rounded-full" href="/solicitudes">
        Test solicitudes
      </a>
    </main>
  );
}
