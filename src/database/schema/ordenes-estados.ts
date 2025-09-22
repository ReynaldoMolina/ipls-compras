import { text, integer, pgTable } from 'drizzle-orm/pg-core';

export const ordenes_estados = pgTable('ordenes_estados', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  estado: text().notNull(),
});
