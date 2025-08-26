import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

interface ButtonsProps {
  isNew: boolean;
  isPending: boolean;
}

export default function FormButtons({ isNew, isPending }: ButtonsProps) {
  return (
    <div className="flex justify-center md:justify-end gap-2 py-2 bg-background">
      <SecondaryButton />
      <PrimaryButton action="submit" isPending={isPending} isNew={isNew} />
    </div>
  );
}
