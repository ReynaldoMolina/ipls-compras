import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

interface ButtonsProps {
  isNew: boolean;
  isPending: boolean;
}

export default function FormButtons({ isNew, isPending }: ButtonsProps) {
  return (
    <div className="flex justify-end gap-2 px-3 py-2">
      <SecondaryButton />
      <PrimaryButton action="submit" isPending={isPending} isNew={isNew} />
    </div>
  );
}
