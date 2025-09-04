import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const unidades_medida = pgTable('unidades_medida', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  unidad: text(),
});
