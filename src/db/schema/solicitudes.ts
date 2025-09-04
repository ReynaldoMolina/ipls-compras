import { boolean, date, integer, pgTable } from 'drizzle-orm/pg-core';
import { cursos_carreras_areas } from './cursos-carreras-areas';
import { usuarios } from './usuarios';

export const solicitudes = pgTable('solicitudes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fecha: date(),
  id_curso_carrera_area: integer()
    .notNull()
    .references(() => cursos_carreras_areas.id),
  id_usuario: integer()
    .notNull()
    .references(() => usuarios.id),
  revisado_bodega: boolean(),
});
