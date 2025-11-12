export const roles = [
  'superadmin',
  'direccion',
  'subdireccion',
  'administracion',
  'capacitaciones',
  'compras',
  'bodega',
  'personal',
  'sinverificar',
];

export const rolesOptions = [
  { value: 'superadmin', label: 'Super admin' },
  { value: 'direccion', label: 'Dirección' },
  { value: 'subdireccion', label: 'Subdirección' },
  { value: 'administracion', label: 'Administración' },
  { value: 'capacitaciones', label: 'Capacitaciones' },
  { value: 'compras', label: 'Compras' },
  { value: 'bodega', label: 'Bodega' },
  { value: 'personal', label: 'Personal' },
  { value: 'sinverificar', label: 'Sin verificar' },
];

export type Roles = (typeof roles)[number];
