export type PageId =
  | 'resumen'
  | 'solicitudes'
  | 'ordenes'
  | 'proveedores'
  | 'usuarios'
  | 'ajustes'
  | 'empty';

export interface Provider {
  id: number;
  // solvencia: string;
  nombre_comercial: string;
  razon_social: string;
  ruc: string;
  contacto: string;
  telefono: string;
  correo: string;
  departamento: string;
  direccion: string;
  sector: string;
  subsector: string;
}
