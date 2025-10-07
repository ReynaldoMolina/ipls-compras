import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { unidades_medida } from './unidades-medida';

export const productos = pgTable('productos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre_producto: text().notNull(),
  id_unidad_medida: integer()
    .notNull()
    .references(() => unidades_medida.id),
});
