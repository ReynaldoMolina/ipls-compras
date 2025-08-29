import { pgTable, text } from 'drizzle-orm/pg-core';

export const departamentos = pgTable('departamentos', {
  id: text().primaryKey(),
  departamento: text().notNull(),
});
