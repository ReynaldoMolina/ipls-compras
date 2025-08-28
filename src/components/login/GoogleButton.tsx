import GoogleIcon from '@/icons/google_color.svg';

export default function GoogleButton() {
  return (
    <button
      type="button"
      className="flex gap-3 items-center justify-center text-brand-text font-semibold text-sm rounded-md bg-white hover:bg-neutral-200 active:bg-neutral-300 w-full h-10 cursor-pointer border border-brand-border transition"
    >
      <GoogleIcon className="size-5" />
      Ingresa con Google
    </button>
  );
}
