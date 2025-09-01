import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const departamentos = pgTable('departamentos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  departamento: text().notNull(),
});
