import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const orden_estado = pgTable('orden_estado', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
});
