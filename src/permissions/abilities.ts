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
  | 'SolicitudBodega'
  | 'Usuario'
  | 'Producto'
  | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(role: Roles | undefined) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility
  );

  if (!role) {
    cannot('manage', 'all');
  }

  if (role === 'superadmin' || role === 'administrador') {
    can('manage', 'all');
  }

  if (role === 'bodega') {
    can('manage', 'Producto');
    can('manage', 'Solicitud');
    can('manage', 'SolicitudDetalle');
    can('manage', 'SolicitudBodega');
    can('read', 'Orden');
    can('read', 'OrdenDetalle');
  }

  if (role === 'compras') {
    can('manage', 'Producto');
    can('read', 'Solicitud');
    can('read', 'SolicitudDetalle');
    can('manage', 'Orden');
    can('manage', 'OrdenDetalle');
    can('manage', 'Proveedor');
    can('manage', 'Solvencia');
  }

  if (role === 'capacitaciones') {
    can('manage', 'Producto');
    can('manage', 'Solicitud');
    can('manage', 'SolicitudDetalle');
    can('read', 'Orden');
    can('read', 'OrdenDetalle');
  }

  if (role === 'subdireccion') {
    can('manage', 'Producto');
    can('manage', 'Solicitud');
    can('manage', 'SolicitudDetalle');
    can('read', 'Orden');
    can('read', 'OrdenDetalle');
  }

  if (role === 'personal') {
    can('manage', 'Producto');
    can('manage', 'Solicitud');
    can('manage', 'SolicitudDetalle');
    can('read', 'Orden');
    can('read', 'OrdenDetalle');
  }

  if (role === 'sinverificar') {
    cannot('manage', 'all');
  }

  return build();
}
