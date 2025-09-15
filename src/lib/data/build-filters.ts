import { proveedores } from '@/db/schema/proveedores';
import { solvencias } from '@/db/schema/solvencias';
import { usuarios } from '@/db/schema/usuarios';
import { SearchParamsProps } from '@/types/types';
import { gt, max, sql, lt, eq, isNull, inArray, or, SQL } from 'drizzle-orm';

export function buildFilterProveedoresByDepartamento(
  searchParams: SearchParamsProps
) {
  const departamentos =
    searchParams.departamento?.split(',').filter(Boolean).map(Number) ?? [];

  return departamentos.length > 0
    ? inArray(proveedores.id_departamento, departamentos)
    : undefined;
}

export function buildFilterProveedoresBySolvencia(
  searchParams: SearchParamsProps
) {
  const solvenciaValues =
    searchParams.solvencia?.split(',').filter(Boolean) ?? [];

  const solvenciaMap: Record<string, SQL | undefined> = {
    1: gt(max(solvencias.vence), sql`CURRENT_DATE`),
    2: eq(max(solvencias.vence), sql`CURRENT_DATE`),
    3: lt(max(solvencias.vence), sql`CURRENT_DATE`),
    4: isNull(max(solvencias.vence)),
  };

  const solvenciaConditions = solvenciaValues
    .map((s) => solvenciaMap[s])
    .filter((cond): cond is SQL => cond !== undefined);

  const solvenciaFilter =
    solvenciaConditions.length > 0 ? or(...solvenciaConditions) : undefined;

  return solvenciaFilter;
}

export function filterSolvencias(searchParams: SearchParamsProps) {
  // solvencia
  const solvenciaValues =
    searchParams.solvencia?.split(',').filter(Boolean) ?? [];

  const solvenciaMap: Record<string, SQL | undefined> = {
    1: gt(max(solvencias.vence), sql`CURRENT_DATE`),
    2: eq(max(solvencias.vence), sql`CURRENT_DATE`),
    3: lt(max(solvencias.vence), sql`CURRENT_DATE`),
    4: isNull(max(solvencias.vence)),
  };

  const solvenciaConditions = solvenciaValues
    .map((s) => solvenciaMap[s])
    .filter((cond): cond is SQL => cond !== undefined);

  const solvenciaFilter =
    solvenciaConditions.length > 0 ? or(...solvenciaConditions) : undefined;

  return { solvenciaFilter };
}

export function buildFiltersUsuarios(searchParams: SearchParamsProps) {
  // rol
  const roles = searchParams.rol?.split(',').filter(Boolean) ?? [];
  const rolesFilter =
    roles.length > 0 ? inArray(usuarios.rol, roles) : undefined;

  return { rolesFilter };
}
