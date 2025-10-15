import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { entidad_academica } from './entidad-academica';
import { users } from './user';
import { presupuesto } from './presupuesto';
import { solicitud_estado } from './solicitud-estado';

export const solicitud = pgTable('solicitud', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fecha: date().notNull(),
  fecha_a_utilizar: date().notNull(),
  id_estado: integer()
    .notNull()
    .references(() => solicitud_estado.id),
  id_entidad_academica: integer()
    .notNull()
    .references(() => entidad_academica.id),
  id_usuario: text()
    .notNull()
    .references(() => users.id),
  id_presupuesto: integer().references(() => presupuesto.id, {
    onDelete: 'set null',
  }),
});
