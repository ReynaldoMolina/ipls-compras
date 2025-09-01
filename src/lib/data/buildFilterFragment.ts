import { proveedores } from '@/db/schema/proveedores';
import { solvencias } from '@/db/schema/solvencias';
import { SearchParamsProps } from '@/types/types';
import { gt, max, sql, lt, eq, isNull, inArray, or, SQL } from 'drizzle-orm';

export function buildFiltersProviders(params: SearchParamsProps) {
  //departamentos
  const departamentos =
    params.departamento?.split(',').filter(Boolean).map(Number) ?? [];
  const departamentoFilter =
    departamentos.length > 0
      ? inArray(proveedores.id_departamento, departamentos)
      : undefined;

  // solvencia
  const solvenciaValues = params.solvencia?.split(',').filter(Boolean) ?? [];

  const solvenciaMap: Record<string, SQL | undefined> = {
    1: gt(max(solvencias.vence), sql`CURRENT_DATE`),
    2: lt(max(solvencias.vence), sql`CURRENT_DATE`),
    3: eq(max(solvencias.vence), sql`CURRENT_DATE`),
    4: isNull(max(solvencias.vence)),
  };

  const solvenciaConditions = solvenciaValues
    .map((s) => solvenciaMap[s])
    .filter((cond): cond is SQL => cond !== undefined);

  const solvenciaFilter =
    solvenciaConditions.length > 0 ? or(...solvenciaConditions) : undefined;

  return { departamentoFilter, solvenciaFilter };
}
