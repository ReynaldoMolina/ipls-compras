import GroupsIcon from '@/icons/groups.svg';
import AccountCircleIcon from '@/icons/account_circle.svg';
import CategoryIcon from '@/icons/category.svg';

const titles = {
  info: 'Información básica',
  contact: 'Contacto',
  category: 'Categoría',
};

const icons = {
  info: <GroupsIcon />,
  contact: <AccountCircleIcon />,
  category: <CategoryIcon />,
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
      {/* title */}
      <div className="flex items-center gap-3 font-semibold text-sm">
        {icons[name]}
        <legend>{titles[name]}</legend>
      </div>
      {/* <p>Solvencia</p> */}
      <div className="flex flex-col gap-5">{children}</div>
    </fieldset>
  );
}
