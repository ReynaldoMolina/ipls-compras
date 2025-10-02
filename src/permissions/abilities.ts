import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { Roles } from './roles';

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

  if (role === 'superadmin' || role === 'administrador') {
    can('manage', 'all');
  }

  if (
    role === 'capacitaciones' ||
    role === 'bodega' ||
    role === 'subdireccion' ||
    role === 'personal'
  ) {
    can('manage', 'Solicitud');
    can('manage', 'SolicitudDetalle');
    can('read', 'Orden');
    can('read', 'OrdenDetalle');
  }

  if (role === 'compras') {
    can('read', 'Solicitud');
    can('read', 'SolicitudDetalle');
    can('manage', 'Orden');
    can('manage', 'OrdenDetalle');
    can('manage', 'Proveedor');
    can('manage', 'Solvencia');
  }

  if (role === 'sinverificar') {
    cannot('manage', 'all');
  }

  return build();
}
