type FormButton = 'submit' | 'cancel' | 'resend';

export default function FormButton({
  type,
  fullWidth = false,
}: {
  type: FormButton;
  fullWidth?: boolean;
}) {
  const colors = {
    submit: 'bg-button-new hover:bg-button-new-hover active:bg-button-new/60',
    cancel:
      'bg-background hover:bg-button-hover active:bg-button-hover/60 border border-brand-border',
    resend:
      'bg-brand-yellow-light hover:bg-brand-yellow active:bg-brand-yellow/60',
  };

  const labels = {
    submit: 'Guardar',
    cancel: 'Cancelar',
    resend: 'Reenviar',
  };

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`font-semibold text-xs rounded-md text-brand-text ${colors[type]} ${fullWidth ? 'w-full' : 'w-40'} h-9 cursor-pointer transition`}
    >
      {labels[type]}
    </button>
  );
}
