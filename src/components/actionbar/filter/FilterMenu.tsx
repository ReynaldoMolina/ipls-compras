import { FilterData } from '@/types/types';
import { FilterState } from './FilterState';
import { solvenciaStatus } from './solvenciaStatus';

export function ProvidersFilters({ filterData }: FilterData) {
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
        states={filterData?.departamentos}
        paramKey="departamento"
        pageKey="proveedores"
      />
    </>
  );
}

export function ResumenFilters({ filterData }: FilterData) {
  const years = [
    {
      value: 2023,
      label: '2023',
    },
  ];
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

export function SolvenciasFilters({ filterData }: FilterData) {
  const years = [
    {
      value: 2023,
      label: '2023',
    },
  ];
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
