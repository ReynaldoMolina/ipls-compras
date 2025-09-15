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

export function buildFilterBySolvencia(searchParams: SearchParamsProps) {
  const solvenciaValues =
    searchParams.solvencia?.split(',').filter(Boolean) ?? [];

  const solvenciaMap: Record<string, SQL | undefined> = {
    activa: gt(max(solvencias.vence), sql`CURRENT_DATE`),
    por_vencer: eq(max(solvencias.vence), sql`CURRENT_DATE`),
    vencida: lt(max(solvencias.vence), sql`CURRENT_DATE`),
    sin_solvencia: isNull(max(solvencias.vence)),
  };

  const solvenciaConditions = solvenciaValues
    .map((s) => solvenciaMap[s])
    .filter((cond): cond is SQL => cond !== undefined);

  return solvenciaConditions.length > 0
    ? or(...solvenciaConditions)
    : undefined;
}

export function buildFilterUsuariosByRol(searchParams: SearchParamsProps) {
  const roles = searchParams.rol?.split(',').filter(Boolean) ?? [];
  return roles.length > 0 ? inArray(usuarios.rol, roles) : undefined;
}

export function buildFilterUsuariosByActive(searchParams: SearchParamsProps) {
  const states = searchParams.activo?.split(',').filter(Boolean) ?? [];

  console.log(states);

  const statesMap: Record<string, boolean> = {
    true: true,
    false: false,
  };

  const mappedStates = states
    .map((state) => statesMap[state])
    .filter((value): value is boolean => value !== undefined);

  console.log(mappedStates);

  return mappedStates.length > 0
    ? inArray(usuarios.activo, mappedStates)
    : undefined;
}
