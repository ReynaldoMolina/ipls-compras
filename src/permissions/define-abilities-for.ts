import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { User } from 'next-auth';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type Subjects =
  | 'all'
  | 'Inicio'
  | 'Presupuesto'
  | 'Solicitud'
  | 'SolicitudDetalle'
  | 'SolicitudBodega'
  | 'SolicitudImprimir'
  | 'SolicitudEstado'
  | 'SolicitudDesdePresupuesto'
  | 'Orden'
  | 'OrdenDetalle'
  | 'Proveedor'
  | 'Solvencia'
  | 'Resumen'
  | 'Usuario';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(user: User) {
  const { role } = user;
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createMongoAbility
  );

  if (!role) {
    cannot('manage', 'all');
  }

  if (role === 'superadmin' || role === 'administrador') {
    can('manage', 'all');
  }

  if (role === 'subdireccion') {
    can('read', 'Inicio');
    can('manage', 'Presupuesto');
    can('manage', 'Solicitud');
    cannot('read', 'SolicitudImprimir');
    can('create', 'SolicitudDesdePresupuesto');
  }

  if (role === 'capacitaciones') {
    can('read', 'Inicio');
    can('manage', 'Solicitud');
    can('manage', 'SolicitudDetalle');
    can('read', 'Orden');
    can('read', 'OrdenDetalle');
  }

  if (role === 'bodega') {
    can('read', 'Inicio');
    can('manage', 'Solicitud');
    can('manage', 'SolicitudDetalle');
  }

  if (role === 'compras') {
    can('read', 'Inicio');
    can('read', 'Solicitud');
    can('read', 'SolicitudDetalle');
    can('manage', 'Orden');
    can('manage', 'OrdenDetalle');
    can('manage', 'Proveedor');
    can('manage', 'Solvencia');
  }

  if (role === 'personal') {
    can('read', 'Inicio');
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
