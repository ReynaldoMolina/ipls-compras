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
  sector?: string;
  solvencia?: string;
  rol?: string;
  activo?: 'active' | 'inactive';
  year?: string;
  selected?: string;
};

export type DateStatus = 'active' | 'due' | 'expired' | 'empty';

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

export type FormAction = 'create' | 'edit';

export interface FormProps {
  action: FormAction;
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
  nombre_comercial: string | null;
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
  year: number | null;
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
  precio: number;
  observaciones?: string | null;
  prioridad?: string | null;
  comprado?: number | null;
  recibido?: number | null;
  precio_compra?: number | null;
  entrega_bodega?: number | null;
  precio_bodega?: number | null;
  id_estado?: number | null;
}

export interface SolicitudDetalleFormType extends SolicitudDetalle {
  id_unidad_medida: number;
  id_ubicacion?: number | null;
  id_categoria?: number | null;
}

export interface SolicitudDetalleTable extends SolicitudDetalle {
  unidad_medida: string | null;
  estado?: string | null;
  ubicacion?: string | null;
  categoria?: string | null;
}

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

export interface ChartData {
  entidad_academica: string | null;
  presupuesto: number;
  asignado?: number;
}

export interface PageProps {
  params: {
    id: string;
    id_solvencia?: string;
    id_detalle?: string;
    id_orden?: string;
  };
  searchParams?: SearchParamsProps;
}

export interface ActionsBarDetalleProps<TData> {
  table: Table<TData>;
  setGrouped: Dispatch<SetStateAction<boolean>>;
  grouped: boolean;
}

export interface DetalleSelectOptions {
  unidadesMedida?: ComboBoxData;
  estados?: ComboBoxData;
  ubicaciones?: ComboBoxData;
  categorias?: ComboBoxData;
}

export interface Orden {
  id?: number;
  id_solicitud: number;
  fecha_creacion: string | null;
  fecha_a_utilizar: string | null;
}

export interface OrdenesTable extends Orden {
  entidad_academica: string | null;
  year: number | null;
  tipo: string | null;
  presupuestado: number;
  asignado: number;
  restante: number;
}

export interface OrdenFormType extends Orden {
  id_estado: number | null;
  observaciones: string | null;
}

export interface OrdenDetalleTable {
  h: string;
}
