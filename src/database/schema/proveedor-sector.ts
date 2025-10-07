import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const proveedor_sector = pgTable('proveedor_sector', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
});
