import Loading from '@/ui/loading/Loading';

interface ButtonProps {
  action: 'submit' | 'resend';
  isPending: boolean;
  fullWidth?: boolean;
  isNew?: boolean;
}

export default function PrimaryButton({
  action,
  isPending,
  fullWidth = false,
  isNew = false,
}: ButtonProps) {
  const colors = {
    submit: 'bg-button-new hover:bg-button-new-hover',
    resend:
      'bg-brand-yellow-light hover:bg-brand-yellow active:bg-brand-yellow/60',
  };

  const labels = {
    submit: isNew ? 'Crear' : 'Guardar',
    resend: 'Reenviar',
  };

  return (
    <button
      type="submit"
      disabled={isPending}
      className={`${colors[action]} ${fullWidth ? 'w-full' : 'w-full md:w-40'} ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'} font-semibold text-xs rounded-md text-brand-text h-9 transition`}
    >
      {isPending ? <Loading /> : labels[action]}
    </button>
  );
}
