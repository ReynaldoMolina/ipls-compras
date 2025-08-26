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
  razon_social: string;
  ruc: string;
  contacto_principal: string;
  telefono: string;
  correo: string;
  departamento: string;
  direccion: string;
  sector: string;
  subsector: string;
}

export interface ProviderTable {
  id: number;
  solvencia: string;
  nombre_comercial: string;
  razon_social: string;
  ruc: string;
  telefono: string;
  departamento: string;
  correo: string;
}

export type PrevState = {
  message: string;
};
