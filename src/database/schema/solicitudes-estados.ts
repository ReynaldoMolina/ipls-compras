import { text, integer, pgTable } from 'drizzle-orm/pg-core';

export const solicitudes_estados = pgTable('solicitudes_estados', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  estado: text().notNull(),
});
