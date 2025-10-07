import { ordenes } from '@/database/schema/orden';
import { proveedores } from '@/database/schema/proveedor';
import { presupuestos } from '@/database/schema/presupuesto';
import { solvencias } from '@/database/schema/proveedor-solvencia';
import { users } from '@/database/schema/user';
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
  return roles.length > 0 ? inArray(users.role, roles) : undefined;
}

export function buildFilterUsuariosByActive(searchParams: SearchParamsProps) {
  const states = searchParams.activo?.split(',').filter(Boolean) ?? [];

  const statesMap: Record<string, boolean> = {
    true: true,
    false: false,
  };

  const mappedStates = states
    .map((state) => statesMap[state])
    .filter((value): value is boolean => value !== undefined);

  return mappedStates.length > 0
    ? inArray(users.activo, mappedStates)
    : undefined;
}

export function buildFilterPresupuestosByYear(searchParams: SearchParamsProps) {
  const years = searchParams.year?.split(',').filter(Boolean) ?? [];
  const mappedYears = years.map((year) => Number(year));
  return years.length > 0 ? inArray(presupuestos.year, mappedYears) : undefined;
}

export function buildOrdenesByIdSolicitud(
  id_solicitud: number | string | undefined
) {
  if (!id_solicitud || id_solicitud === null) return undefined;
  return eq(ordenes.id_solicitud, Number(id_solicitud));
}

export function buildFilterByOrderState(searchParams: SearchParamsProps) {
  const estados = searchParams.orden_estado?.split(',').filter(Boolean) ?? [];
  const mappedEstados = estados.map((estado) => Number(estado));
  return estados.length > 0
    ? inArray(ordenes.id_estado, mappedEstados)
    : undefined;
}
