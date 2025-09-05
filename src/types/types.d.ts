export type PageId =
  | 'resumen'
  | 'solicitudes'
  | 'ordenes'
  | 'proveedores'
  | 'usuarios'
  | 'ajustes'
  | 'empty';

export type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export type SortOrder = 'asc' | 'desc';

export type SearchParamsProps = {
  search?: string;
  orderBy?: string;
  direction?: SortOrder;
  departamento?: string;
  solvencia?: string;
  rol?: string;
};

export type DateStatus = 'active' | 'due' | 'expired' | 'empty';

export type EditPageProps = {
  params: {
    id: string;
    idsol?: string;
  };
};

export interface FormProps {
  action: 'create' | 'edit';
  data?: Provider;
  id?: number;
}

export interface Provider {
  id?: number;
  nombre_comercial: string;
  razon_social?: string | null;
  ruc?: string | null;
  contacto_principal?: string | null;
  telefono?: string | null;
  correo?: string | null;
  id_departamento: number;
  direccion?: string | null;
  id_sector: number | null;
  id_subsector: number | null;
}

export interface Solvencia {
  id?: number;
  id_proveedor: number;
  emitida?: string | null;
  vence?: string | null;
  verificado: string | null;
  recibido?: string | null;
  url?: string | null;
  id_usuario: number | null;
}

export interface Usuario {
  id?: number;
  nombre: string | null;
  apellido: string | null;
  correo: string | null;
  rol: string | null;
  activo: boolean | null;
}

export interface Solicitud {
  id?: number;
  fecha: string | null;
  id_entidad_academica: number | null;
  id_usuario: number | null;
  revisado_bodega: boolean | null;
}

export interface SolicitudDetalle {
  id?: number;
  id_solicitud: number;
  producto_servicio: string;
  cantidad: number;
  id_unidad_medida: number;
  precio: number;
  observaciones?: string | null;
  prioridad?: string | null;
  id_estado?: number | null;
  comprado?: number | null;
  recibido?: number | null;
  precio_compra?: number | null;
  entrega_bodega?: number | null;
  precio_bodega?: number | null;
  id_ubicacion?: number | null;
  id_categoria?: number | null;
}

export type PrevState = {
  message: string | undefined;
};

export type FilterData = {
  filterData?: {
    departamentos?: { value: number; label: string }[];
    years?: { value: number; label: string }[];
  };
};

export type ComboBoxData = { value: number; label: string }[];
