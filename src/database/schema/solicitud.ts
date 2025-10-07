import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { entidad_academica } from './entidad-academica';
import { users } from './user';

export const solicitud = pgTable('solicitud', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fecha: date().notNull(),
  fecha_a_utilizar: date(),
  id_entidad_academica: integer()
    .notNull()
    .references(() => entidad_academica.id),
  id_usuario: text()
    .notNull()
    .references(() => users.id),
});
