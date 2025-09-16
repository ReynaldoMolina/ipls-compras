import {
  Info,
  CircleUser,
  Factory,
  CalendarCheck,
  Shield,
  File,
} from 'lucide-react';

const titles = {
  info: 'Información',
  contact: 'Contacto',
  sector: 'Sector',
  verification: 'Verificación',
  permissions: 'Permisos y estado',
  solvencia: 'Solvencia',
};

const iconStyles = 'size-5';

const icons = {
  info: <Info className={iconStyles} />,
  contact: <CircleUser className={iconStyles} />,
  sector: <Factory className={iconStyles} />,
  verification: <CalendarCheck className={iconStyles} />,
  permissions: <Shield className={iconStyles} />,
  solvencia: <File className={iconStyles} />,
};

type FormSectionName = keyof typeof titles;

export function FormFieldSet({
  children,
  name,
}: {
  children: React.ReactNode;
  name: FormSectionName;
}) {
  return (
    <fieldset className="flex flex-col gap-5">
      {/* title */}
      <span className="flex items-center gap-2 font-semibold text-sm border-b pb-2">
        {icons[name]}
        <legend>{titles[name]}</legend>
      </span>
      {/* content */}
      <div className="flex flex-col gap-5">{children}</div>
    </fieldset>
  );
}
