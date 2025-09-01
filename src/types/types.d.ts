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
};

export type DateStatus = 'active' | 'due' | 'expired' | 'empty';

export type EditPageProps = {
  params: {
    id: string;
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
  razon_social?: string | undefined;
  ruc?: string | undefined;
  contacto_principal?: string | undefined;
  telefono?: string | undefined;
  correo?: string | undefined;
  id_departamento: number;
  direccion?: string | undefined;
  id_sector: number;
  id_subsector: number;
}

export interface ProviderTable {
  id: number;
  solvencia: string;
  nombre_comercial: string;
  razon_social: string;
  ruc: string;
  telefono: string;
  id_departamento: number;
  correo: string;
}

export type PrevState = {
  message: string | undefined;
};

export type FilterData = {
  filterData: {
    departamentos: { value: number; label: string }[];
  };
};

export type ComboBoxData = { value: number; label: string }[];
