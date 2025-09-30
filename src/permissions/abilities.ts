import { Roles } from '@/types/types';
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects =
  | 'Orden'
  | 'OrdenDetalle'
  | 'Proveedor'
  | 'Resumen'
  | 'Solvencia'
  | 'Solicitud'
  | 'SolicitudDetalle'
  | 'Usuario'
  | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(role: Roles) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility
  );

  if (role === 'superadmin') {
    can('manage', 'all');
  }

  if (role === 'administrador') {
    can('manage', 'Orden');
    can('manage', 'OrdenDetalle');
    can('manage', 'Proveedor');
    can('read', 'Resumen');
    can('manage', 'Solvencia');
    can('manage', 'Solicitud');
    can('manage', 'SolicitudDetalle');
    cannot('delete', 'Usuario');
  }

  if (role === 'docente') {
    can('read', 'Resumen');
  }

  if (role === 'sinverificar') {
    cannot('read', 'Resumen');
  }

  return build();
}
