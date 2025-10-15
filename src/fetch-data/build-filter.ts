import { orden } from '@/database/schema/orden';
import { proveedor } from '@/database/schema/proveedor';
import { presupuesto } from '@/database/schema/presupuesto';
import { proveedor_solvencia } from '@/database/schema/proveedor-solvencia';
import { users } from '@/database/schema/user';
import { SearchParamsProps } from '@/types/types';
import { gt, max, sql, lt, eq, isNull, inArray, or, SQL } from 'drizzle-orm';
import { solicitud } from '@/database/schema/solicitud';

export function buildFilterProveedoresByDepartamento(
  searchParams: SearchParamsProps
) {
  const departamentos =
    searchParams.departamento?.split(',').filter(Boolean) ?? [];

  return departamentos.length > 0
    ? inArray(proveedor.departamento, departamentos)
    : undefined;
}

export function buildFilterBySolvencia(searchParams: SearchParamsProps) {
  const solvenciaValues =
    searchParams.solvencia?.split(',').filter(Boolean) ?? [];

  const solvenciaMap: Record<string, SQL | undefined> = {
    activa: gt(max(proveedor_solvencia.vence), sql`CURRENT_DATE`),
    por_vencer: eq(max(proveedor_solvencia.vence), sql`CURRENT_DATE`),
    vencida: lt(max(proveedor_solvencia.vence), sql`CURRENT_DATE`),
    sin_solvencia: isNull(max(proveedor_solvencia.vence)),
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
  return years.length > 0 ? inArray(presupuesto.year, mappedYears) : undefined;
}

export function buildFilterSolicitudesByYear(searchParams: SearchParamsProps) {
  const years = searchParams.year?.split(',').filter(Boolean) ?? [];
  const mappedYears = years.map((year) => Number(year));
  const extractedYears = sql`EXTRACT(YEAR FROM ${solicitud.fecha})`;
  return years.length > 0 ? inArray(extractedYears, mappedYears) : undefined;
}

export function buildOrdenesByIdSolicitud(
  id_solicitud: number | string | undefined
) {
  if (!id_solicitud || id_solicitud === null) return undefined;
  return eq(orden.id_solicitud, Number(id_solicitud));
}

export function buildFilterByOrderState(searchParams: SearchParamsProps) {
  const estados = searchParams.orden_estado?.split(',').filter(Boolean) ?? [];
  const mappedEstados = estados.map((estado) => Number(estado));
  return estados.length > 0
    ? inArray(orden.id_estado, mappedEstados)
    : undefined;
}
