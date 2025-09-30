import { boolean, date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { entidades_academicas } from './entidades-academicas';
import { users } from './usuarios';

export const solicitudes = pgTable('solicitudes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fecha: date().notNull(),
  year: integer().notNull(),
  id_entidad_academica: integer()
    .notNull()
    .references(() => entidades_academicas.id),
  id_usuario: text()
    .notNull()
    .references(() => users.id),
  revisado_bodega: boolean(),
});
