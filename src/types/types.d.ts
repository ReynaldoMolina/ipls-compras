export type PageId =
  | 'resumen'
  | 'solicitudes'
  | 'ordenes'
  | 'proveedores'
  | 'usuarios'
  | 'ajustes'
  | 'empty';

export type PageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export type SortOrder = 'asc' | 'desc';

export type SearchParamsProps = {
  search?: string;
  orderBy?: string;
  direction?: SortOrder;
};

export type DateStatus = 'active' | 'due' | 'expired';

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
