interface FormButton {
  label: string;
  type: 'button' | 'submit';
  color: 'orange' | 'green';
}

export default function PrimaryButton({ label, type, color }: FormButton) {
  const colors = {
    orange: 'bg-brand-yellow-light hover:bg-brand-yellow active:bg-amber-500',
    green: 'bg-new-green hover:bg-new-green-hover active:bg-green-800',
  };

  return (
    <button
      type={type}
      className={`font-semibold text-sm rounded-md text-brand-text ${colors[color]} w-full h-10 cursor-pointer`}
    >
      {label}
    </button>
  );
}
