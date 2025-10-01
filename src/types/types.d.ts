export type PageId =
  | 'Resumen'
  | 'Solicitud'
  | 'Orden'
  | 'Proveedor'
  | 'Usuario'
  | 'empty';

export type Roles = 'superadmin' | 'administrador' | 'docente' | 'sinverificar';

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
  orden_estado?: string;
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
  id_usuario: string | null;
}

export interface SolvenciaTable extends Solvencia {
  nombre_comercial: string | null;
  usuario: string | null;
}

export interface Usuario {
  id?: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: string | null;
  activo: boolean | null;
}

export type UserType = {
  name: string;
  email: string;
  image: string;
};

export interface Solicitud {
  id?: number;
  fecha: string | null;
  year: number | null;
}

export interface SolicitudesTable extends Solicitud {
  tipo: string | null;
  entidad_academica: string | null;
  abreviacion: string | null;
  presupuestado: number | null;
  asignado: number | null;
  restante: number | null;
}

export interface SolicitudFormType extends Solicitud {
  id_entidad_academica: number | null;
  id_usuario: string | null;
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
  ordenesStates?: SelectOptions[];
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
    id_orden_detalle?: string;
  };
  searchParams?: SearchParamsProps;
}

export interface ActionsBarDetalleProps<TData> {
  table: Table<TData>;
  tableName: 'orden' | 'solicitud' | 'ordenmodal';
  allowNew?: boolean;
}

export interface DetalleSelectOptions {
  unidadesMedida?: ComboBoxData;
  estados?: ComboBoxData;
  ubicaciones?: ComboBoxData;
  categorias?: ComboBoxData;
  proveedores?: ComboBoxData;
}

export interface Orden {
  id?: number;
  id_solicitud: number;
  fecha_creacion: string | null;
  fecha_a_utilizar?: string | null;
}

export interface OrdenesTable extends Orden {
  entidad_academica: string | null;
  year: number | null;
  estado: string | null;
  tipo: string | null;
  presupuestado: number;
  asignado: number;
  restante: number;
}

export interface OrdenesModal extends Orden {
  entidad_academica: string | null;
  year: number | null;
  estado: string | null;
}

export interface OrdenFormType extends Orden {
  id_estado: number | null;
  id_proveedor: number | null;
  numero_cotizacion: string | null;
  termino_de_pago: string | null;
  moneda: string | null;
  observaciones: string | null;
}

export interface OrdenDetalleTable {
  id: number;
  id_solicitud: number | null;
  id_orden: number | null;
  producto_servicio: string | null;
  cantidad: number;
  unidad_medida: string | null;
  precio_real: number | null;
  categoria: string | null;
  observaciones: string | null;
}

export interface OrdenDetalleFormType {
  id: number;
  id_orden: number | null;
  id_solicitud_detalle: number | null;
  producto_servicio: string | null;
  cantidad_solicitud: number | null;
  cantidad: number;
  precio_real: number | null;
  observaciones: string | null;
}

export interface OrdenPdfProps {
  id_orden: number;
  proveedor: string | null;
  numero_cotizacion: string | null;
  termino_de_pago: string | null;
  moneda: string | null;
  fecha_creacion: string;
  detalle: OrdePdfDetalleProps[];
}

export interface OrdenPdfDetalleProps {
  id_solicitud_detalle: number;
  cantidad: number;
  unidad_medida: string | null;
  producto_servicio: string | null;
  precio_real: number;
}
