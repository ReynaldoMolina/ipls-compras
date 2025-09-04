import Image from 'next/image';

export default function Hero() {
  return (
    <div className="flex flex-col gap-10 p-10 w-full justify-center items-center bg-brand-blue h-full">
      <Image
        src="/images/logo-blanco.png"
        width={90}
        height={50}
        className="w-25 text-white text-xs text-center"
        alt="Logo"
      />
      <Image
        src="/images/login.png"
        width={500}
        height={269}
        className="w-full max-w-60 text-white text-xs text-center"
        alt="Persona revisando inventario y pagando en línea"
      />
      <div className="flex flex-col gap-1 items-center justify-center">
        <span className="text-xs text-white text-center">
          Sistema de gestión de
        </span>
        <span className="text-white text-login-title font-bold">Compras</span>
      </div>
    </div>
  );
}
