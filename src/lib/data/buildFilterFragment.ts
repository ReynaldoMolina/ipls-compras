import { proveedores } from '@/db/schema/proveedores';
import { solvencias } from '@/db/schema/solvencias';
import { SearchParamsProps } from '@/types/types';
import { gt, max, sql, lt, eq, isNull, inArray, or, SQL } from 'drizzle-orm';

export function buildFiltersProviders(params: SearchParamsProps) {
  //departamentos
  const departamentos = params.departamento?.split(',').filter(Boolean) ?? [];
  const departamentoFilter =
    departamentos.length > 0
      ? inArray(proveedores.departamento, departamentos)
      : undefined;

  // solvencia
  const solvenciaValues = params.solvencia?.split(',').filter(Boolean) ?? [];

  const solvenciaMap: Record<string, SQL | undefined> = {
    Activa: gt(max(solvencias.vence), sql`CURRENT_DATE`),
    Vencida: lt(max(solvencias.vence), sql`CURRENT_DATE`),
    'Por vencer': eq(max(solvencias.vence), sql`CURRENT_DATE`),
    'Sin solvencia': isNull(max(solvencias.vence)),
  };

  const solvenciaConditions = solvenciaValues
    .map((s) => solvenciaMap[s])
    .filter((cond): cond is SQL => cond !== undefined);

  const solvenciaFilter =
    solvenciaConditions.length > 0 ? or(...solvenciaConditions) : undefined;

  return { departamentoFilter, solvenciaFilter };
}
