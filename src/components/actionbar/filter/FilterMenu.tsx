import { FilterData } from '@/types/types';
import { FilterState } from './FilterState';

export function ProvidersFilters({ filterData }: FilterData) {
  const solvenciaStatus = [
    {
      value: 1,
      label: 'Activa',
    },
    {
      value: 2,
      label: 'Por vencer',
    },
    {
      value: 3,
      label: 'Vencida',
    },
    {
      value: 4,
      label: 'Sin solvencia',
    },
  ];
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
        states={filterData.departamentos}
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
