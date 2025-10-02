import { FilterOptions } from '@/types/types';
import { FilterCheckBox } from './filter-checkbox';
import { FilterRadio } from './filter-radio';
import { solvenciaStatus } from '@/lib/select-options-data';

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

export function OrdenesFilters(filterOptions: FilterOptions) {
  return (
    <>
      <FilterCheckBox
        label="Año"
        options={filterOptions.years}
        paramKey="year"
      />
      <FilterCheckBox
        label="Estado"
        options={filterOptions.ordenesStates}
        paramKey="orden_estado"
      />
    </>
  );
}
