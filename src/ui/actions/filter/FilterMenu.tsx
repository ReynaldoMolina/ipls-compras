import { MenuOption } from '@/ui/sidemenu/menuOptions';
import { FilterState } from './FilterState';

export default function FilterMenu({ pageInfo }: { pageInfo: MenuOption }) {
  let pageFilter;
  switch (pageInfo.id) {
    case 'proveedores':
      pageFilter = <ProvidersFilters />;
      break;

    default:
      break;
  }

  return (
    <menu className="flex absolute top-9 right-0 flex-col rounded shadow border border-brand-border bg-menu-container overflow-y-scroll max-w-100 max-h-70 z-10">
      <span className="flex sticky top-0 px-3 py-2 text-xs font-semibold border-b border-b-brand-border bg-menu-container">
        FILTROS
      </span>
      <div className="flex flex-col p-3 gap-7">{pageFilter}</div>
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
