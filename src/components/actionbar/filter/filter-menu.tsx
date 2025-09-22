import { FilterOptions } from '@/types/types';
import { FilterCheckBox } from './filter-checkbox';
import { solvenciaStatus } from '../../select-options-data';
import { FilterRadio } from './filter-radio';

export function ProvidersFilters(filterOptions: FilterOptions) {
  return (
    <>
      <FilterCheckBox
        label="Solvencia"
        options={solvenciaStatus}
        paramKey="solvencia"
      />
      <FilterCheckBox
        label="Departamentos"
        options={filterOptions?.departamentosOptions}
        paramKey="departamento"
      />
    </>
  );
}

export function ResumenFilters(filterOptions: FilterOptions) {
  return (
    <>
      <FilterRadio label="Año" options={filterOptions.years} paramKey="year" />
    </>
  );
}

export function SolvenciasFilters(filterOptions: FilterOptions) {
  return (
    <>
      <FilterCheckBox
        label="Año"
        options={filterOptions.years}
        paramKey="year"
      />
    </>
  );
}

export function UsuariosFilters(filterOptions: FilterOptions) {
  return (
    <>
      <FilterRadio
        label="Estado"
        options={filterOptions.userStates}
        paramKey="activo"
      />
      <FilterCheckBox
        label="Rol"
        options={filterOptions.userRoles}
        paramKey="rol"
      />
    </>
  );
}

export function SolicitudesFilters(filterOptions: FilterOptions) {
  return (
    <>
      <FilterCheckBox
        label="Año"
        options={filterOptions.years}
        paramKey="year"
      />
    </>
  );
}
