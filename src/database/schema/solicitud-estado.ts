import { text, integer, pgTable } from 'drizzle-orm/pg-core';

export const solicitud_estado = pgTable('solicitud_estado', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  estado: text().notNull(),
});
