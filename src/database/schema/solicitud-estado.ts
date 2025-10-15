import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const solicitud_estado = pgTable('solicitud_estado', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
});
