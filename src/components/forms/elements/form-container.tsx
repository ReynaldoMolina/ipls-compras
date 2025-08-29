export default function FormContainer({ ...props }) {
  return (
    <form
      className="space-y-15 max-w-2xl mx-auto w-full border border-border rounded-lg p-3 md:p-7 md:shadow-lg"
      {...props}
    >
      {props.children}
    </form>
  );
}
