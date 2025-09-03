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
