import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const categoria_productos = pgTable('categoria_productos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  categoria: text().notNull(),
});
