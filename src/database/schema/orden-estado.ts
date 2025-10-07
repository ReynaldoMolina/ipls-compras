import { text, integer, pgTable } from 'drizzle-orm/pg-core';

export const orden_estado = pgTable('orden_estado', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  estado: text().notNull(),
});
