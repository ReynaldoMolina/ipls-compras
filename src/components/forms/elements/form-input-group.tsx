export default function FormInputGroup({ ...props }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 w-full">
      {props.children}
    </div>
  );
}
