import Image from 'next/image';

export default function Hero() {
  return (
    <div className="flex flex-col gap-10 p-15 w-full md:w-100 justify-center items-center bg-brand-blue">
      <Image
        src="/images/logo-blanco.png"
        width={90}
        height={50}
        className="w-33"
        alt="Logo"
      />
      <Image
        src="/images/login.png"
        width={500}
        height={269}
        className="w-full max-w-70 text-white text-xs"
        alt="Persona revisando inventario y pagando en línea"
      />
      <div className="flex flex-col gap-1 items-center justify-center">
        <p className="text-xs text-white text-center">Sistema de gestión de</p>
        <h1 className="text-white text-title font-bold">Compras</h1>
      </div>
    </div>
  );
}
