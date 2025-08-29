import { FilterData } from '@/types/types';
import { FilterState } from './FilterState';

export function ProvidersFilters({ filterData }: FilterData) {
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
        states={filterData.departamentos}
        paramKey="departamento"
        pageKey="proveedores"
      />
    </>
  );
}

export function ResumenFilters({ filterData }: FilterData) {
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
