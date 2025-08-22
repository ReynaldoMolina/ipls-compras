import { usePathname } from 'next/navigation';
import { FilterState } from './FilterState';
import { useRef } from 'react';
import { useClickOutside } from '@/lib/hooks/useClickOutside';

export default function FilterMenu({ buttonRef, setIsFilterMenuOpen }) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsFilterMenuOpen(false), buttonRef);

  let filterMenu;
  switch (pathname) {
    case '/proveedores':
      filterMenu = <ProvidersFilters />;
      break;

    default:
      break;
  }

  return (
    <menu
      ref={menuRef}
      className="flex absolute top-9 right-0 flex-col rounded shadow border border-brand-border bg-menu-container overflow-y-scroll max-w-100 max-h-70 z-10"
    >
      <span className="flex sticky top-0 px-3 py-2 text-xs font-semibold border-b border-b-brand-border bg-menu-container">
        FILTROS
      </span>
      <div className="flex flex-col p-3 gap-7">{filterMenu}</div>
    </menu>
  );
}

function ProvidersFilters() {
  const solvencias = ['Activa', 'Por vencer', 'Vencida'];
  const departamentos = ['Leon', 'Chinandega'];

  return (
    <>
      <FilterState label="Solvencia" states={solvencias} />
      <FilterState label="Departamentos" states={departamentos} />
    </>
  );
}
