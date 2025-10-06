export const roles = [
  'superadmin',
  'administrador',
  'capacitaciones',
  'bodega',
  'compras',
  'subdireccion',
  'personal',
  'sinverificar',
];

export const rolesOptions = [
  { value: 'superadmin', label: 'Super admin' },
  { value: 'administrador', label: 'Administrador' },
  { value: 'capacitaciones', label: 'Capacitaciones' },
  { value: 'bodega', label: 'Bodega' },
  { value: 'compras', label: 'Compras' },
  { value: 'subdireccion', label: 'Subdirección' },
  { value: 'personal', label: 'Personal' },
  { value: 'sinverificar', label: 'Sin verificar' },
];

export type Roles = (typeof roles)[number];
