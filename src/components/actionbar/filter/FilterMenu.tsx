import { FilterOptions } from '@/types/types';
import { FilterState } from './FilterState';
import { solvenciaStatus } from './solvenciaStatus';

const years = [
  {
    value: 2023,
    label: '2023',
  },
];

export function ProvidersFilters(filterOptions: FilterOptions) {
  return (
    <>
      <FilterState
        label="Solvencia"
        states={solvenciaStatus}
        paramKey="solvencia"
        pageKey="proveedores"
      />
      <FilterState
        label="Departamentos"
        states={filterOptions?.departamentosOptions}
        paramKey="departamento"
        pageKey="proveedores"
      />
    </>
  );
}

export function ResumenFilters(filterOptions: FilterOptions) {
  return (
    <>
      <FilterState
        label="Año"
        states={years}
        paramKey="year"
        pageKey="resumen"
      />
    </>
  );
}

export function SolvenciasFilters(filterOptions: FilterOptions) {
  return (
    <>
      <FilterState
        label="Año"
        states={years}
        paramKey="year"
        pageKey="solvencias"
      />
    </>
  );
}
