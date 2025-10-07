import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const categoria_producto = pgTable('categoria_producto', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
});
