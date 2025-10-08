export type PageId =
  | 'Resumen'
  | 'Solicitud'
  | 'Orden'
  | 'Proveedor'
  | 'Usuario'
  | 'Presupuestos'
  | 'empty';

export type SortOrder = 'asc' | 'desc';

export interface SearchParamsProps {
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
}

export interface PageProps {
  params: Promise<{
    id: string;
    id_solvencia?: string;
    id_detalle?: string;
    id_orden?: string;
    id_orden_detalle?: string;
    id_producto?: string;
  }>;
  searchParams: Promise<SearchParamsProps>;
}

export type DateStatus = 'active' | 'due' | 'expired' | 'empty';

interface Proveedor {
  id?: number;
  nombre_comercial: string;
  razon_social?: string | null;
  ruc?: string | null;
  telefono?: string | null;
  correo?: string | null;
}

export interface ProveedorTable extends Proveedor {
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

export interface Solvencia {
  id?: number;
  id_proveedor: number;
  emitida: string | null;
  vence: string | null;
  verificado: string;
  recibido: string | null;
  url: string | null;
  id_usuario: string;
}

export interface SolvenciaTable extends Solvencia {
  verificado: string | null;
  nombre_comercial: string | null;
  usuario: string | null;
}

export interface UsuarioTable {
  id?: string;
  name: string | null;
  email: string | null;
  role: Roles | null;
  activo: boolean | null;
}

export interface Usuario {
  id?: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: Roles | null;
  activo: boolean | null;
}

export interface Presupuesto {
  id?: number;
  year: number;
}

export interface PresupuestoTable extends Presupuesto {
  tipo: string | null;
  entidad_academica: string | null;
  presupuestado: number | null;
}

export interface PresupuestoFormType extends Presupuesto {
  id_entidad_academica: number;
}

export interface PresupuestoDetalle {
  id?: number;
  id_presupuesto: number;
  producto_servicio: string;
  cantidad: number;
  precio_sugerido: number;
  observaciones?: string | null;
  prioridad?: string | null;
}

export interface PresupuestoDetalleTable extends PresupuestoDetalle {
  unidad_medida: string | null;
  estado?: string | null;
  categoria?: string | null;
}

export interface PresupuestoDetalleFormType extends PresupuestoDetalle {
  id_unidad_medida: number;
  id_categoria?: number | null;
}

export type SelectOptions = {
  value: string;
  label: string;
};

export type FilterOptions = {
  departamentos?: SelectOptions[];
  years?: SelectOptions[];
  userStates?: SelectOptions[];
  userRoles?: SelectOptions[];
  ordenState?: SelectOptions[];
};

export type EditedRows = Record<string, boolean>;

export interface ChartData {
  entidad_academica: string | null;
  presupuesto: number;
  asignado?: number;
}

// export interface ActionsBarDetalleProps<TData> {
//   table: Table<TData>;
//   tableName: 'orden' | 'solicitud' | 'ordenmodal';
//   allowNew?: boolean;
// }

export interface FormSelectOptions {
  unidadesMedida?: SelectOptions[];
  estados?: SelectOptions[];
  ubicaciones?: SelectOptions[];
  categorias?: SelectOptions[];
  proveedores?: SelectOptions[];
  departamentos?: SelectOptions[];
  sectores?: SelectOptions[];
  subsectores?: SelectOptions[];
  years?: SelectOptions[];
  entidadesAcademicas?: SelectOptions[];
}

export interface Orden {
  id?: number;
  id_solicitud: number;
  fecha_creacion: string;
  fecha_a_utilizar?: string | null;
}

export interface OrdenTable extends Orden {
  entidad_academica: string | null;
  year: number | null;
  estado: string | null;
  tipo: string | null;
  presupuestado: number;
  asignado: number;
  restante: number;
}

export interface OrdenModal extends Orden {
  id: number;
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

export interface OrdenDetalleType {
  id?: number;
  id_orden: number;
  id_solicitud_detalle: number;
  cantidad: number;
  precio_real: number | null;
  observaciones: string | null;
}

export interface OrdenDetalleFormType extends OrdenDetalleType {
  producto_servicio: string | null;
  cantidad_solicitud: number | null;
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
