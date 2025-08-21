import FormButton from './FormButton';

export default function FormButtons() {
  return (
    <div className="flex justify-end gap-2 px-3 py-2 bg-neutral-100">
      <FormButton type="cancel" />
      <FormButton type="submit" />
    </div>
  );
}
