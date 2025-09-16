export type PageId =
  | 'resumen'
  | 'solicitudes'
  | 'ordenes'
  | 'proveedores'
  | 'usuarios'
  | 'ajustes'
  | 'empty';

export type SortOrder = 'asc' | 'desc';

export type SearchParamsProps = {
  search?: string;
  orderBy?: string;
  direction?: SortOrder;
  departamento?: string;
  solvencia?: string;
  rol?: string;
  activo?: 'active' | 'inactive';
};

export type DateStatus = 'active' | 'due' | 'expired' | 'empty';

export type EditPageProps = {
  params: {
    id: string;
    idsol?: string;
  };
};

interface Proveedor {
  id?: number;
  nombre_comercial: string;
  razon_social?: string | null;
  ruc?: string | null;
  telefono?: string | null;
  correo?: string | null;
}

export interface Proveedores extends Proveedor {
  solvencia: string | null;
  departamento?: string | null;
}
export interface ProveedorFormType extends Proveedor {
  contacto_principal?: string | null;
  id_departamento: number;
  direccion?: string | null;
  id_sector?: number | null;
  id_subsector?: number | null;
  solvencia?: string | null;
}

export interface FormProps {
  action: 'create' | 'edit';
  data?: ProveedorForm;
  id?: number;
}

export interface Solvencia {
  id?: number;
  id_proveedor: number;
  emitida: string | null;
  vence: string | null;
  verificado: string | null;
  recibido: string | null;
  url: string | null;
  id_usuario: number | null;
}

export interface SolvenciaTable extends Solvencia {
  proveedor: string | null;
  usuario: string | null;
}

export interface Usuario {
  id?: number;
  nombre: string | null;
  apellido: string | null;
  correo: string | null;
  rol: string | null;
  activo: boolean | null;
}

export type UserType = {
  name: string;
  email: string;
  avatar: string;
};

export interface Solicitud {
  id?: number;
  fecha: string | null;
}

export interface Solicitudes extends Solicitud {
  tipo: string | null;
  entidad_academica: string | null;
  presupuestado: number | null;
  asignado: number | null;
  restante: number | null;
}

export interface SolicitudFormType extends Solicitud {
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

export type SelectOptions = {
  value: string;
  label: string;
};

export type FilterOptions = {
  departamentosOptions?: SelectOptions[];
  years?: SelectOptions[];
  userStates?: SelectOptions[];
  userRoles?: SelectOptions[];
};

export type ComboBoxData = SelectOptions[];

export type EditedRows = Record<string, boolean>;

export type ChartData = {
  entidad_academica: string | null;
  presupuesto: number;
  asignado: number;
};

export type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
