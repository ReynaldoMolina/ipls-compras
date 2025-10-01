import {
  Info,
  CircleUser,
  Factory,
  CalendarCheck,
  Shield,
  File,
  Flag,
  Warehouse,
} from 'lucide-react';

const iconStyles = 'size-5';

const fieldsetConfig = {
  info: {
    title: 'Información',
    icon: <Info className={iconStyles} />,
  },
  contact: {
    title: 'Contacto',
    icon: <CircleUser className={iconStyles} />,
  },
  sector: {
    title: 'Sector',
    icon: <Factory className={iconStyles} />,
  },
  verification: {
    title: 'Verificación',
    icon: <CalendarCheck className={iconStyles} />,
  },
  permissions: {
    title: 'Permisos y estado',
    icon: <Shield className={iconStyles} />,
  },
  solvencia: {
    title: 'Solvencia',
    icon: <File className={iconStyles} />,
  },
  status: {
    title: 'Estado y Prioridad',
    icon: <Flag className={iconStyles} />,
  },
  bodega: {
    title: 'Información de bodega',
    icon: <Warehouse className={iconStyles} />,
  },
  status_orden: {
    title: 'Estado',
    icon: <Flag className={iconStyles} />,
  },
};

interface FormFieldSetProps {
  children: React.ReactNode;
  name: keyof typeof fieldsetConfig;
}

export function FormFieldSet({ children, name }: FormFieldSetProps) {
  return (
    <fieldset className="flex flex-col gap-5">
      {/* title */}
      <span className="flex items-center gap-2 font-semibold text-sm border-b pb-2">
        {fieldsetConfig[name].icon}
        <legend>{fieldsetConfig[name].title}</legend>
      </span>
      {/* content */}
      <div className="flex flex-col gap-5">{children}</div>
    </fieldset>
  );
}
