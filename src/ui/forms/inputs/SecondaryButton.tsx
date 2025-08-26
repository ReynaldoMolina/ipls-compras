import { useRouter } from 'next/navigation';

export default function SecondaryButton({
  fullWidth = false,
}: {
  fullWidth?: boolean;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`${fullWidth ? 'w-full' : 'w-full md:w-40'} font-semibold text-xs rounded-md text-brand-text bg-neutral-200 hover:bg-button-hover active:bg-button-hover/60 border border-brand-border h-9 cursor-pointer transition`}
    >
      Cancelar
    </button>
  );
}
