import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const unidad_medida = pgTable('unidad_medida', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
});
