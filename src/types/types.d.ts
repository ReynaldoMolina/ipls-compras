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
  orden_estado?: string;
  solicitud_estado?: string;
  id_entidad?: string;
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
  departamento: string;
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
  entidad_academica?: string | null;
}

export interface PresupuestoDetalle {
  id?: number;
  id_presupuesto: number;
  producto_servicio: string;
  cantidad: number;
  precio_sugerido: number;
  prioridad: string | null;
  observacion: string | null;
  unidad_medida: string;
}

export interface PresupuestoDetalleTable extends PresupuestoDetalle {
  en_solicitud: number;
  restante: number;
  categoria?: string | null;
}

export interface PresupuestoDetalleFormType extends PresupuestoDetalle {
  categoria?: string | null;
}

export interface PresupuestoDetalleModal {
  id: number;
  producto_servicio: string;
  restante: number;
  prioridad: string | null;
  unidad_medida: string;
}

export interface PresupuestoModal extends Presupuesto {
  entidad_academica: string | null;
}

export interface Solicitud {
  id?: number;
  fecha_a_utilizar: string;
}

export interface SolicitudTable extends Solicitud {
  entidad_academica: string | null;
  tipo: string | null;
  usuario: string | null;
  estado: string | null;
}

export interface SolicitudFormType extends Solicitud {
  fecha: string;
  id_entidad_academica: number;
  entidad_academica?: string | null;
  id_usuario: string;
  usuario?: string | null;
  id_presupuesto: number | null;
  id_estado: number;
}

// *******************************************************
export interface SolicitudDetalle {
  id: number;
  id_solicitud: number;
  producto_servicio: string | null;
  cantidad: number;
  cantidad_bodega: number | null;
  observacion: string | null;
}

export interface SolicitudDetalleTable extends SolicitudDetalle {
  en_orden: number;
  restante: number;
  unidad_medida: string | null;
}

export interface SolicitudDetalleFormType extends SolicitudDetalle {
  id?: number;
  unidad_medida: string;
  id_presupuesto_detalle?: number | null;
}

export interface SolicitudesTableModal {
  id: number;
  entidad_academica: string | null;
  fecha_a_utilizar: string | null;
  estado: string | null;
}

export interface SolicitudPdfProps {
  id_solicitud: number;
  fecha: string;
  detalle: SolicitudPdfDetalleProps[];
}

export interface SolicitudPdfDetalleProps {
  id: number;
  producto_servicio: string | null;
  unidad_medida: string | null;
  cantidad: number;
}

// *****************************************************

export type SelectOptions = {
  value: string;
  label: string;
};

export type FilterOptions = {
  departamentos?: SelectOptions[];
  years?: SelectOptions[];
  userStates?: SelectOptions[];
  userRoles?: SelectOptions[];
  ordenEstados?: SelectOptions[];
  solicitudEstados?: SelectOptions[];
};

export type EditedRows = Record<string, boolean>;

export interface ChartData {
  entidad_academica: string | null;
  presupuesto: number;
  asignado?: number;
}

export interface FormSelectOptions {
  unidadesMedida?: SelectOptions[];
  estadosSolicitud?: SelectOptions[];
  estadosOrden?: SelectOptions[];
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
}

export interface OrdenTable extends Orden {
  entidad_academica: string | null;
  estado: string | null;
  tipo: string | null;
  subtotal: number;
}

export interface OrdenModal extends Orden {
  id: number;
  entidad_academica: string | null;
  estado: string | null;
}

export interface OrdenFormType extends Orden {
  id_proveedor: number;
  id_estado: number;
  numero_cotizacion: string | null;
  termino_de_pago: string | null;
  moneda: string | null;
  descuento: number | null;
  observacion: string | null;
  calcular_iva: boolean;
  entidad_academica?: string | null;
}

export interface OrdenDetalleType {
  id?: number;
  id_orden: number;
  cantidad: number;
  precio: number | null;
  observacion: string | null;
  id_solicitud_detalle: number;
}

export interface OrdenDetalleTable extends OrdenDetalleType {
  id: number;
  id_orden: number;
  cantidad: number;
  precio: number | null;
  observacion: string | null;
  id_solicitud_detalle: number;
}

export interface OrdenDetalleFormType extends OrdenDetalleType {
  unidad_medida?: number;
  producto_servicio?: string | null;
  cantidad_solicitud?: number | null;
}

export interface OrdenPdfProps {
  id_orden: number;
  proveedor: string | null;
  numero_cotizacion: string | null;
  termino_de_pago: string | null;
  moneda: string | null;
  fecha_creacion: string;
  calcular_iva: boolean;
  descuento: number | null;
  detalle: OrdePdfDetalleProps[];
}

export interface OrdenPdfDetalleProps {
  id_solicitud_detalle: number;
  cantidad: number;
  unidad_medida: string | null;
  producto_servicio: string | null;
  precio: number;
}

export interface ServerActionState {
  success?: boolean;
  title?: string;
  description?: string;
  returningId?: number;
}
