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
    case '/resumen':
      filterMenu = <ResumenFilters />;
      break;

    default:
      break;
  }

  return (
    <menu
      ref={menuRef}
      className="flex absolute top-9 right-0 flex-col rounded shadow border border-brand-border bg-menu-container overflow-y-scroll min-w-70 max-w-100 max-h-70 z-10"
    >
      <span className="flex sticky top-0 px-3 py-2 text-xs font-semibold border-b border-b-brand-border bg-menu-container">
        FILTROS
      </span>
      <div className="flex flex-col p-3 gap-7">{filterMenu}</div>
    </menu>
  );
}

function ProvidersFilters() {
  return (
    <>
      <FilterState
        label="Solvencia"
        states={['Activa', 'Por vencer', 'Vencida', 'Sin solvencia']}
        paramKey="solvencia"
        pageKey="proveedores"
      />
      <FilterState
        label="Departamentos"
        states={['León', 'Managua']}
        paramKey="departamento"
        pageKey="proveedores"
      />
    </>
  );
}

function ResumenFilters() {
  return (
    <>
      <FilterState
        label="Año"
        states={['2020', '2021', '2022', '2023']}
        paramKey="year"
        pageKey="resumen"
      />
    </>
  );
}
