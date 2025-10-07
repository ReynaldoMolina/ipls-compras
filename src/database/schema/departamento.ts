import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const departamento = pgTable('departamento', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
});
