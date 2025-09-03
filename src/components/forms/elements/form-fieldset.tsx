import { Info, CircleUser, Factory, CalendarCheck } from 'lucide-react';

const titles = {
  info: 'Información básica',
  contact: 'Contacto',
  sector: 'Sector',
  verification: 'Verificación',
};

const iconStyles = 'size-4.5';

const icons = {
  info: <Info className={iconStyles} />,
  contact: <CircleUser className={iconStyles} />,
  sector: <Factory className={iconStyles} />,
  verification: <CalendarCheck className={iconStyles} />,
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
    <fieldset className="flex flex-col gap-4">
      <div className="flex items-center gap-2 font-semibold text-sm">
        {icons[name]}
        <legend>{titles[name]}</legend>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </fieldset>
  );
}
