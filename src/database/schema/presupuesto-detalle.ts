import { integer, pgTable, real, text } from 'drizzle-orm/pg-core';
import { categoria_producto } from './categoria_producto';
import { presupuesto } from './presupuesto';
import { unidad_medida } from './unidad-medida';

export const presupuesto_detalle = pgTable('presupuesto_detalle', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_presupuesto: integer()
    .notNull()
    .references(() => presupuesto.id),
  producto_servicio: text().notNull(),
  cantidad: real().notNull(),
  id_unidad_medida: integer()
    .notNull()
    .references(() => unidad_medida.id),
  precio_sugerido: real().notNull(),
  observaciones: text(),
  id_categoria: integer().references(() => categoria_producto.id),
});
