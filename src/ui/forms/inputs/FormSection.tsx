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

export function FormSection({
  children,
  name,
}: {
  children: React.ReactNode;
  name: FormSectionName;
}) {
  return (
    <section className="flex flex-col gap-4">
      {/* title */}
      <div className="flex items-center gap-3 font-semibold text-sm">
        {icons[name]}
        {titles[name]}
      </div>
      {/* <p>Solvencia</p> */}
      {children}
    </section>
  );
}
